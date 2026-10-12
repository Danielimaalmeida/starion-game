/*
 * FIO – Find the relations: game content.
 *
 * Edit this file to swap in real data; index.html does not need to change.
 * ALL CONTENT BELOW IS ILLUSTRATIVE (fictional article codes).
 *
 * Model:  group (functional unit)  >  card (BMK)  >  article (physical part).
 *  - articles : the physical parts. Only they have a photo (img/<image>.png).
 *  - groups   : functional units, shown as headings on each side.
 *  - cards    : BMKs. Each points to a group and to an article.
 *  - answerKey: the hidden solution. Each entry is a correct link
 *               electrical card <-> mechanical card. A card may appear in
 *               several entries (one-to-many). A card that appears in no
 *               entry has no partner: linking it is always wrong.
 *
 * Text that is shown to the player may be a string or { pt: "...", en: "..." }.
 */
window.FIO_DATA = {

  config: {
    lang: "pt",              // "pt" | "en"   (also ?lang=en in the URL)
    imageDir: "img/",        // folder with the sticker PNGs
    imageExt: ".png",
    shuffle: true,           // shuffle card order inside each group on every game
    showTimer: true,
    maxHints: 3,
    idleSeconds: 60,         // no input for this long -> back to the welcome screen
    idleWarnSeconds: 10,     // countdown shown before the automatic restart
    scoring: { correct: 1, wrong: -1, hint: -1 },   // floor is 0
    // Time (seconds) shown for the FIO in "You vs. FIO". null = do not show a
    // number. Only set this to a value you have actually measured.
    fioSeconds: null
  },

  groups: [
    { id: "g-cc01", side: "electrical", label: "CC01 · Cabinet: Control" },
    { id: "g-fd01", side: "electrical", label: "FD01 · Field devices" },
    { id: "g-cl01", side: "mechanical", label: "CL01 · Clamping" },
    { id: "g-cv01", side: "mechanical", label: "CV01 · Conveyor" },
    { id: "g-ir01", side: "mechanical", label: "IR01 · Industrial robot" }
  ],

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
    "FESTO.SPAN-P10R": {
      title: "FESTO.SPAN-P10R", description: "Pressure sensor, 0 to 10 bar, PNP",
      subgroupNumber: "335", subgroup: "Pressure sensors",
      supplier: "Festo", typeDesignation: "SPAN-P10R", image: "sensor_pressao_festo"
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
    "WAGO.2004-1392": {
      title: "WAGO.2004-1392", description: "Through terminal block, 4 mm²",
      subgroupNumber: "261", subgroup: "Terminal blocks",
      supplier: "WAGO", typeDesignation: "2004-1392", image: "regua_terminais_10p"
    },
    "LAPP.1119305": {
      title: "LAPP.1119305", description: "Control cable, 7 x 1.5 mm², shielded",
      subgroupNumber: "150", subgroup: "Control cables",
      supplier: "LAPP", typeDesignation: "1119305", image: "cabo_lapp"
    },
    "ITEM.PROFIL-40": {
      title: "ITEM.PROFIL-40", description: "Aluminium profile 40 x 40, slot 8",
      subgroupNumber: "520", subgroup: "Aluminium profiles",
      supplier: "Item", typeDesignation: "Profile 40x40", image: "perfil_aluminio"
    },
    "INTERROLL.RE-50": {
      title: "INTERROLL.RE-50", description: "Conveyor roller, Ø 50 mm, steel",
      subgroupNumber: "530", subgroup: "Conveyor rollers",
      supplier: "Interroll", typeDesignation: "RE-50", image: "rolos_transportador"
    },
    "FIBRO.2431-12": {
      title: "FIBRO.2431-12", description: "Compression spring, Ø 12 mm",
      subgroupNumber: "560", subgroup: "Springs",
      supplier: "Fibro", typeDesignation: "2431-12", image: "mola_helicoidal"
    }
  },

  cards: [
    // ---- electrical ------------------------------------------------------
    { id: "e-A1",   side: "electrical", group: "g-cc01", bmk: "-A1",  name: "PLC",
      article: "SIE.6ES7511",
      note: { pt: "O PLC só existe do lado elétrico: não tem par mecânico.",
              en: "The PLC only exists on the electrical side: it has no mechanical partner." } },
    { id: "e-XD01", side: "electrical", group: "g-cc01", bmk: "XD01", name: "Terminal strip",
      article: "WAGO.2004-1392",
      note: { pt: "Terminais só existem no elétrico.", en: "Terminals only exist on the electrical side." } },
    { id: "e-UR01", side: "electrical", group: "g-cc01", bmk: "UR01", name: "Robot controller",
      article: "KUKA.KRC4" },
    { id: "e-W1",   side: "electrical", group: "g-cc01", bmk: "-W1",  name: "Cable",
      article: "LAPP.1119305",
      note: { pt: "Cabos só existem no elétrico.", en: "Cables only exist on the electrical side." } },
    { id: "e-B1",   side: "electrical", group: "g-fd01", bmk: "-B1",  name: "Inductive sensor",
      article: "IFM.IGS208" },
    { id: "e-B3",   side: "electrical", group: "g-fd01", bmk: "-B3",  name: "Inductive sensor",
      article: "IFM.II0297",
      note: { pt: "Mesmo supplier (IFM) que o Proximity Switch, mas é outro article: este não tem par.",
              en: "Same supplier (IFM) as the Proximity Switch, but a different article: this one has no partner." } },
    { id: "e-Y1",   side: "electrical", group: "g-fd01", bmk: "-Y1",  name: "Solenoid valve",
      article: "FESTO.VUVG-L10" },
    { id: "e-M1",   side: "electrical", group: "g-fd01", bmk: "-M1",  name: "Motor",
      article: "SEW.R37DRN71M4" },

    // ---- mechanical ------------------------------------------------------
    { id: "m-SW01", side: "mechanical", group: "g-cl01", bmk: "SW01", name: "Proximity Switch",
      article: "IFM.IGS208" },
    { id: "m-VA01", side: "mechanical", group: "g-cl01", bmk: "VA01", name: "Directional Valve",
      article: "FESTO.VUVG-L10" },
    { id: "m-PS01", side: "mechanical", group: "g-cl01", bmk: "PS01", name: "Pressure sensor",
      article: "FESTO.SPAN-P10R",
      note: { pt: "Também é Festo, mas é um sensor de pressão, não a válvula, e não tem par elétrico.",
              en: "Also Festo, but it is a pressure sensor, not the valve, and it has no electrical partner." } },
    { id: "m-MO01", side: "mechanical", group: "g-cv01", bmk: "MO01", name: "Geared Motor",
      article: "SEW.R37DRN71M4" },
    { id: "m-RO01", side: "mechanical", group: "g-cv01", bmk: "RO01", name: "Rollers",
      article: "INTERROLL.RE-50",
      note: { pt: "Rolos só existem no mecânico.", en: "Rollers only exist on the mechanical side." } },
    { id: "m-AP01", side: "mechanical", group: "g-cv01", bmk: "AP01", name: "Aluminium profile",
      article: "ITEM.PROFIL-40",
      note: { pt: "Perfis só existem no mecânico.", en: "Profiles only exist on the mechanical side." } },
    { id: "m-SP01", side: "mechanical", group: "g-cv01", bmk: "SP01", name: "Spring",
      article: "FIBRO.2431-12",
      note: { pt: "Molas só existem no mecânico.", en: "Springs only exist on the mechanical side." } },
    { id: "m-RB01", side: "mechanical", group: "g-ir01", bmk: "RB01", name: "6-Axis Robot",
      article: "KUKA.KR6-R900" }
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
      welcomeTitle: "Encontra as relações",
      welcomeLead: "O FIO liga automaticamente a estrutura elétrica (ePlan) à estrutura mecânica (BOM). Consegues fazer o mesmo?",
      steps: [
        "Arrasta de um elemento elétrico até ao mecânico que usa o mesmo article.",
        "Faz as ligações que quiseres. Apaga uma com × ou recomeça quando quiseres.",
        "Carrega em Verificar e vê a tua pontuação."
      ],
      start: "Começar",
      electrical: "Elétrico (ePlan)",
      mechanical: "Mecânico (BOM)",
      sideWord: { electrical: "elétrico", mechanical: "mecânico" },
      instruction: "Arrasta de um cartão até ao seu par do outro lado (ou clica num e depois no outro).",
      armed: "Agora clica no cartão do outro lado.",
      hint: "Dica", check: "Verificar", fio: "Tu vs. FIO", reset: "Recomeçar",
      links: n => n + (n === 1 ? " ligação" : " ligações"),
      points: "Pontos",
      right: n => "✓ " + n + (n === 1 ? " certa" : " certas"),
      wrong: n => "✗ " + n + (n === 1 ? " errada" : " erradas"),
      missing: n => "? " + n + " em falta",
      afterCheck: "Passa o rato por cada ligação para veres o porquê. A tracejado estão os pares que faltaram.",
      removeLink: "Apagar ligação",
      idleTitle: "Ainda estás aí?",
      idleText: s => "O jogo recomeça em " + s + " s.",
      idleKeep: "Continuar",
      hint1: (bmk, sup) => "Procura o par de " + bmk + ": o article do outro lado é do supplier " + sup + ".",
      hint2: g => "Está no grupo " + g + ".",
      hint3: "É o cartão que está a brilhar.",
      hintNone: "Já usaste todas as dicas.",
      hintDone: "Já não há pares por descobrir.",
      fields: { description: "Standard Description", subgroup: "Subgroup", supplier: "Supplier Name", type: "Type Designation" },
      fioTitle: "Isto o FIO faz sozinho",
      fioText: "O FIO lê os exports do ePlan e dos BOM e encontra estas relações automaticamente.",
      you: "Tu", fioLabel: "FIO",
      noPair: (bmk, side) => bmk + " só existe do lado " + side + ": não tem par.",
      wrongPair: "Não é o mesmo article.",
      sameSupplier: "O supplier é o mesmo, mas o article é outro.",
      missed: "Par em falta."
    },
    en: {
      brandSub: "Factory Information Organizer",
      welcomeTitle: "Find the relations",
      welcomeLead: "The FIO automatically links the electrical structure (ePlan) to the mechanical structure (BOM). Can you do the same?",
      steps: [
        "Drag from an electrical element to the mechanical one that uses the same article.",
        "Make as many links as you like. Remove one with × or restart at any time.",
        "Press Check to see your score."
      ],
      start: "Start",
      electrical: "Electrical (ePlan)",
      mechanical: "Mechanical (BOM)",
      sideWord: { electrical: "electrical", mechanical: "mechanical" },
      instruction: "Drag from a card to its partner on the other side (or click one, then the other).",
      armed: "Now click the card on the other side.",
      hint: "Hint", check: "Check", fio: "You vs. FIO", reset: "Restart",
      links: n => n + (n === 1 ? " link" : " links"),
      points: "Points",
      right: n => "✓ " + n + " correct",
      wrong: n => "✗ " + n + " wrong",
      missing: n => "? " + n + " missing",
      afterCheck: "Hover each link to see why. Dashed lines are the pairs you missed.",
      removeLink: "Remove link",
      idleTitle: "Still there?",
      idleText: s => "The game restarts in " + s + " s.",
      idleKeep: "Keep playing",
      hint1: (bmk, sup) => "Look for the partner of " + bmk + ": the article on the other side is from supplier " + sup + ".",
      hint2: g => "It is in group " + g + ".",
      hint3: "It is the glowing card.",
      hintNone: "You have used all your hints.",
      hintDone: "There are no pairs left to find.",
      fields: { description: "Standard Description", subgroup: "Subgroup", supplier: "Supplier Name", type: "Type Designation" },
      fioTitle: "The FIO does this on its own",
      fioText: "The FIO reads the ePlan and BOM exports and finds these relations automatically.",
      you: "You", fioLabel: "FIO",
      noPair: (bmk, side) => bmk + " only exists on the " + side + " side: it has no partner.",
      wrongPair: "Not the same article.",
      sameSupplier: "Same supplier, but a different article.",
      missed: "Missing pair."
    }
  }
};
