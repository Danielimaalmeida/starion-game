/*
 * FIO – Build the structure: game content.
 *
 * Edit this file to swap in real data; index.html does not need to change.
 * ALL CONTENT BELOW IS ILLUSTRATIVE (fictional article codes).
 *
 * The game has 3 steps:
 *   1. build the ELECTRICAL tree   (station > functional unit > BMK)
 *   2. build the MECHANICAL tree   (same levels)
 *   3. link electrical <-> mechanical BMKs that are the same article
 *
 * Model:
 *  - articles : the physical parts. Only they have a photo (img/<image>.png).
 *  - nodes    : the pieces of both trees. kind is "station" | "fu" | "bmk".
 *               `parent` is the node it must hang under (null for the station),
 *               and is the hidden solution of steps 1 and 2.
 *               BMK nodes point to an article (that is where the photo comes from).
 *  - answerKey: the hidden solution of step 3: pairs of BMKs (electrical e,
 *               mechanical m). A BMK may appear in several pairs (one-to-many).
 *               A BMK that appears in no pair has no partner: linking it is wrong.
 *
 * Text that is shown to the player may be a string or { pt: "...", en: "..." }.
 */
window.FIO_DATA = {

  config: {
    lang: "pt",               // "pt" | "en"   (also ?lang=en in the URL)
    imageDir: "img/",         // folder with the sticker PNGs
    imageExt: ".png",
    drift: true,              // unlinked pieces float slowly around (they stop on hover / drag / once linked)
    driftSpeed: 2,            // slow = 1, default = 2, lively = 4
    shuffle: true,            // shuffle card order inside each group in step 3
    hidePhotos: "none",       // step 3 only: "none" | "electrical" | "mechanical" (shows "?" until hover)
    showTimer: true,
    maxHints: 3,              // per step
    idleSeconds: 60,          // no input for this long -> back to the welcome screen
    idleWarnSeconds: 10,      // countdown shown before the automatic restart
    scoring: { correct: 1, wrong: -1, hint: -1 },   // per step; a step never goes below 0
    // Time (seconds) shown for the FIO in "You vs. FIO". null = do not show a
    // number. Only set this to a value you have actually measured.
    fioSeconds: null
  },

  articles: {
    "IFM.IGS208": {
      title: "IFM.IGS208", description: "Inductive sensor M12, 4 mm, PNP, cable 2 m",
      subgroupNumber: "210", subgroup: "Proximity sensors",
      supplier: "IFM electronic", typeDesignation: "IGS208", image: "sensor_M12_cabo"
    },
    "IFM.II0297": {
      title: "IFM.II0297", description: "Inductive sensor M18, 8 mm, PNP, M12 connector",
      subgroupNumber: "210", subgroup: "Proximity sensors",
      supplier: "IFM electronic", typeDesignation: "II0297", image: "sensor_ifm_laranja"
    },
    "FESTO.VUVG-L10": {
      title: "FESTO.VUVG-L10", description: "5/2-way solenoid valve, 24 V DC",
      subgroupNumber: "330", subgroup: "Directional valves",
      supplier: "Festo", typeDesignation: "VUVG-L10-M52", image: "valvula_festo"
    },
    "SEW.R37DRN71M4": {
      title: "SEW.R37DRN71M4", description: "Helical geared motor, 0.37 kW, 4-pole",
      subgroupNumber: "412", subgroup: "Geared Motors",
      supplier: "SEW-Eurodrive", typeDesignation: "R37DRN71M4", image: "motorredutor_vermelho"
    },
    "KUKA.KRC4": {
      title: "KUKA.KRC4", description: "Robot controller KR C4 compact",
      subgroupNumber: "810", subgroup: "Robot controllers",
      supplier: "KUKA", typeDesignation: "KR C4 compact", image: "controlador_robot_kuka"
    },
    "KUKA.KR6-R900": {
      title: "KUKA.KR6-R900", description: "6-axis industrial robot, 6 kg payload",
      subgroupNumber: "800", subgroup: "Industrial robots",
      supplier: "KUKA", typeDesignation: "KR 6 R900", image: "robot_kuka"
    },
    "SIE.6ES7511": {
      title: "SIE.6ES7511", description: "SIMATIC S7-1500 CPU 1511-1 PN",
      subgroupNumber: "110", subgroup: "PLC CPUs",
      supplier: "SIEMENS", typeDesignation: "6ES7511-1AK02-0AB0", image: "plc_siemens"
    },
    "INTERROLL.RE-50": {
      title: "INTERROLL.RE-50", description: "Conveyor roller, Ø 50 mm, steel",
      subgroupNumber: "530", subgroup: "Conveyor rollers",
      supplier: "Interroll", typeDesignation: "RE-50", image: "rolos_transportador"
    }
  },

  nodes: [
    // ================= electrical tree =================
    { id: "e-ST01", side: "electrical", kind: "station", code: "ST01", name: "Station", parent: null },

    { id: "e-FD01", side: "electrical", kind: "fu", code: "FD01", name: "Field devices", parent: "e-ST01" },
    { id: "e-B1",   side: "electrical", kind: "bmk", code: "-B1", name: "Inductive sensor", parent: "e-FD01", article: "IFM.IGS208" },
    { id: "e-B3",   side: "electrical", kind: "bmk", code: "-B3", name: "Inductive sensor", parent: "e-FD01", article: "IFM.II0297",
      note: { pt: "Mesmo supplier (IFM) que o Proximity Switch, mas é outro article: este não tem par.",
              en: "Same supplier (IFM) as the Proximity Switch, but a different article: this one has no partner." } },
    { id: "e-Y1",   side: "electrical", kind: "bmk", code: "-Y1", name: "Solenoid valve",   parent: "e-FD01", article: "FESTO.VUVG-L10" },
    { id: "e-M1",   side: "electrical", kind: "bmk", code: "-M1", name: "Motor",            parent: "e-FD01", article: "SEW.R37DRN71M4" },

    { id: "e-CC01", side: "electrical", kind: "fu", code: "CC01", name: "Control cabinet", parent: "e-ST01" },
    { id: "e-A1",   side: "electrical", kind: "bmk", code: "-A1",  name: "PLC",              parent: "e-CC01", article: "SIE.6ES7511",
      note: { pt: "O PLC só existe do lado elétrico: não tem par mecânico.",
              en: "The PLC only exists on the electrical side: it has no mechanical partner." } },
    { id: "e-UR01", side: "electrical", kind: "bmk", code: "UR01", name: "Robot controller", parent: "e-CC01", article: "KUKA.KRC4" },

    // ================= mechanical tree =================
    { id: "m-ST01", side: "mechanical", kind: "station", code: "ST01", name: "Station", parent: null },

    { id: "m-CL01", side: "mechanical", kind: "fu", code: "CL01", name: "Clamping", parent: "m-ST01" },
    { id: "m-SW01", side: "mechanical", kind: "bmk", code: "SW01", name: "Proximity Switch",  parent: "m-CL01", article: "IFM.IGS208" },
    { id: "m-VA01", side: "mechanical", kind: "bmk", code: "VA01", name: "Directional Valve", parent: "m-CL01", article: "FESTO.VUVG-L10" },

    { id: "m-CV01", side: "mechanical", kind: "fu", code: "CV01", name: "Conveyor", parent: "m-ST01" },
    { id: "m-MO01", side: "mechanical", kind: "bmk", code: "MO01", name: "Geared Motor", parent: "m-CV01", article: "SEW.R37DRN71M4" },
    { id: "m-RO01", side: "mechanical", kind: "bmk", code: "RO01", name: "Rollers",      parent: "m-CV01", article: "INTERROLL.RE-50",
      note: { pt: "Rolos só existem no mecânico.", en: "Rollers only exist on the mechanical side." } },

    { id: "m-IR01", side: "mechanical", kind: "fu", code: "IR01", name: "Industrial robot", parent: "m-ST01" },
    { id: "m-RB01", side: "mechanical", kind: "bmk", code: "RB01", name: "6-Axis Robot", parent: "m-IR01", article: "KUKA.KR6-R900" }
  ],

  answerKey: [
    { e: "e-B1",   m: "m-SW01",
      why: { pt: "Mesmo article: IFM.IGS208.", en: "Same article: IFM.IGS208." } },
    { e: "e-Y1",   m: "m-VA01",
      why: { pt: "Mesmo article: FESTO.VUVG-L10.", en: "Same article: FESTO.VUVG-L10." } },
    { e: "e-M1",   m: "m-MO01",
      why: { pt: "Mesmo article: SEW.R37DRN71M4.", en: "Same article: SEW.R37DRN71M4." } },
    { e: "e-UR01", m: "m-RB01",
      why: { pt: "Par difícil: articles diferentes, mas ambos KUKA, e o controlador comanda este robot.",
             en: "Tricky one: different articles, but both KUKA, and the controller drives this robot." } }
  ],

  ui: {
    pt: {
      brandSub: "Factory Information Organizer",
      welcomeTitle: "Monta a estrutura da fábrica",
      welcomeLead: "O FIO organiza e liga automaticamente a estrutura elétrica (ePlan) e a mecânica (BOM). Consegues fazer o mesmo?",
      steps: [
        "Monta a estrutura elétrica: puxa o ponto ＋ de uma peça até outra para as ligar.",
        "Faz o mesmo para a estrutura mecânica.",
        "Liga o que é o mesmo article entre as duas estruturas."
      ],
      start: "Começar",
      stepNames: ["Elétrico", "Mecânico", "Relações"],
      electrical: "Elétrico (ePlan)",
      mechanical: "Mecânico (BOM)",
      sideWord: { electrical: "elétrico", mechanical: "mecânico" },
      kindWord: { station: "estação", fu: "functional unit", bmk: "BMK" },
      kindInfo: {
        station: "Estação: a raiz da árvore. Agrupa as functional units.",
        fu: "Functional unit: agrupa os BMKs por função.",
        bmk: "BMK: objeto identificado por um código. Tem um article (a peça física)."
      },
      intro: [
        "Monta a estrutura ELÉTRICA: puxa o ponto ＋ de uma peça até outra para as ligar (estação → functional unit → BMK).",
        "Agora a estrutura MECÂNICA: puxa o ponto ＋ de uma peça até outra (estação → functional unit → BMK).",
        "Liga cada elemento elétrico ao mecânico que usa o mesmo article: arrasta de um cartão até ao outro lado."
      ],
      armed: "Agora clica na peça a ligar.",
      hint: "Dica", check: "Verificar", next: "Continuar", fio: "Tu vs. FIO",
      clear: "Limpar", reset: "Recomeçar", resetSure: "Recomeçar tudo?",
      links: n => n + (n === 1 ? " ligação" : " ligações"),
      points: "pontos",
      total: "Total",
      right: n => "✓ " + n + (n === 1 ? " certa" : " certas"),
      wrong: n => "✗ " + n + (n === 1 ? " errada" : " erradas"),
      missing: n => "? " + n + " em falta",
      afterCheck: "Passa o rato por cada ligação para veres o porquê. A ponteado estão as que faltaram.",
      removeLink: "Apagar ligação",
      idleTitle: "Ainda estás aí?",
      idleText: s => "O jogo recomeça em " + s + " s.",
      idleKeep: "Continuar",
      hintB1: (c, k) => "O nível acima de " + c + " é: " + k + ".",
      hintB2: p => "Procura " + p + ".",
      hintB3: "Liga as duas peças que estão a brilhar.",
      hint1: (bmk, sup) => "Procura o par de " + bmk + ": o article do outro lado é do supplier " + sup + ".",
      hint2: g => "Está no grupo " + g + ".",
      hint3: "É o cartão que está a brilhar.",
      hintNone: "Já usaste todas as dicas.",
      hintDone: "Já não há nada por descobrir.",
      fields: { description: "Standard Description", subgroup: "Subgroup", supplier: "Supplier Name", type: "Type Designation" },
      fioTitle: "Isto o FIO faz sozinho",
      fioText: "O FIO lê os exports do ePlan e dos BOM, organiza as estruturas e encontra estas relações automaticamente.",
      you: "Tu", fioLabel: "FIO",
      sameLevel: "Peças do mesmo nível não se ligam entre si.",
      belongs: (c, p) => c + " pertence a " + p + ".",
      noPair: (bmk, side) => bmk + " só existe do lado " + side + ": não tem par.",
      wrongPair: "Não é o mesmo article.",
      sameSupplier: "O supplier é o mesmo, mas o article é outro.",
      missed: "Faltou esta ligação."
    },
    en: {
      brandSub: "Factory Information Organizer",
      welcomeTitle: "Build the factory structure",
      welcomeLead: "The FIO organises and links the electrical (ePlan) and mechanical (BOM) structures automatically. Can you do the same?",
      steps: [
        "Build the electrical structure: pull the ＋ dot of a piece to another to link them.",
        "Do the same for the mechanical structure.",
        "Link what is the same article across the two structures."
      ],
      start: "Start",
      stepNames: ["Electrical", "Mechanical", "Relations"],
      electrical: "Electrical (ePlan)",
      mechanical: "Mechanical (BOM)",
      sideWord: { electrical: "electrical", mechanical: "mechanical" },
      kindWord: { station: "station", fu: "functional unit", bmk: "BMK" },
      kindInfo: {
        station: "Station: the root of the tree. It groups functional units.",
        fu: "Functional unit: groups BMKs by function.",
        bmk: "BMK: an object identified by a code. It has an article (the physical part)."
      },
      intro: [
        "Build the ELECTRICAL structure: pull the ＋ dot of a piece to another to link them (station → functional unit → BMK).",
        "Now the MECHANICAL structure: pull the ＋ dot of a piece to another (station → functional unit → BMK).",
        "Link each electrical element to the mechanical one that uses the same article: drag from one card to the other side."
      ],
      armed: "Now click the piece to link it to.",
      hint: "Hint", check: "Check", next: "Continue", fio: "You vs. FIO",
      clear: "Clear", reset: "Restart", resetSure: "Restart everything?",
      links: n => n + (n === 1 ? " link" : " links"),
      points: "points",
      total: "Total",
      right: n => "✓ " + n + " correct",
      wrong: n => "✗ " + n + " wrong",
      missing: n => "? " + n + " missing",
      afterCheck: "Hover each link to see why. Dotted lines are the ones you missed.",
      removeLink: "Remove link",
      idleTitle: "Still there?",
      idleText: s => "The game restarts in " + s + " s.",
      idleKeep: "Keep playing",
      hintB1: (c, k) => "The level above " + c + " is: " + k + ".",
      hintB2: p => "Look for " + p + ".",
      hintB3: "Link the two glowing pieces.",
      hint1: (bmk, sup) => "Look for the partner of " + bmk + ": the article on the other side is from supplier " + sup + ".",
      hint2: g => "It is in group " + g + ".",
      hint3: "It is the glowing card.",
      hintNone: "You have used all your hints.",
      hintDone: "There is nothing left to find.",
      fields: { description: "Standard Description", subgroup: "Subgroup", supplier: "Supplier Name", type: "Type Designation" },
      fioTitle: "The FIO does this on its own",
      fioText: "The FIO reads the ePlan and BOM exports, organises the structures and finds these relations automatically.",
      you: "You", fioLabel: "FIO",
      sameLevel: "Pieces on the same level are not linked to each other.",
      belongs: (c, p) => c + " belongs to " + p + ".",
      noPair: (bmk, side) => bmk + " only exists on the " + side + " side: it has no partner.",
      wrongPair: "Not the same article.",
      sameSupplier: "Same supplier, but a different article.",
      missed: "This link was missing."
    }
  }
};
