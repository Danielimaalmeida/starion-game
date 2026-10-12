/*
 * FIO – Build the structure: game content.
 *
 * Edit this file to swap in real data; index.html does not need to change.
 * Both trees follow the "3D Day – Jogo com fotos" board. The BMKs -Q1, -X1,
 * -M1 and the mechanical names/descriptions are ILLUSTRATIVE.
 *
 * The game has 3 steps:
 *   1. build the ELECTRICAL tree
 *   2. build the MECHANICAL tree
 *   3. link electrical <-> mechanical pieces that are the same thing
 *
 * Model:
 *  - articles : physical parts (supplier.number) with the FIO fields.
 *  - nodes    : the pieces of both trees. kind is "station" | "fu" | "bmk" | "article"
 *               (station > functional unit > BMK > article).
 *               `parent` is the node it hangs under (null for a root) and is the
 *               hidden solution of steps 1 and 2. A link always goes from the
 *               upper level to the lower one, so the direction is automatic.
 *               Photo: `image` on the node, or the image of its `article`.
 *               Images live in config.imageDir as <image>.png.
 *               BMKs may also carry `description` and `supplier` (shown on hover).
 *  - answerKey: the hidden solution of step 3: pairs electrical e <-> mechanical m.
 *               A piece may appear in several pairs (one-to-many). A piece with a
 *               photo that appears in no pair has no partner: linking it is wrong.
 *
 * Text that is shown to the player may be a string or { pt: "...", en: "..." }.
 */
window.FIO_DATA = {

  config: {
    lang: "pt",               // "pt" | "en"   (also ?lang=en in the URL)
    imageDir: "img/",         // folder with the sticker PNGs
    imageExt: ".png",
    scale: 0.8,               // size of the floating pieces in steps 1 and 2 (1 = original, 0.8 = 20% smaller)
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
    // ---- from the board ----
    "SIE.3RV2011-1DA20": {
      title: "SIE.3RV2011-1DA20", description: "BestPractice",
      subgroupNumber: "2495", subgroup: "Circuit Breakers to 63A motor protection",
      supplier: "SIEMENS", typeDesignation: "3RV2011-1DA20", image: "crop/SIE.3RV2011-1DA20"
    },
    "WAGO.249-116": {
      title: "WAGO.249-116", description: "Clamp Discription materials",
      subgroupNumber: "261", subgroup: "Clamps Accessories",
      supplier: "WAGO", typeDesignation: "249-116", image: "crop/WAGO.249-116"
    },
    "SEW.R37DRN71M4": {
      title: "SEW.R37DRN71M4", description: "Helical geared motor, 0.37 kW, 4-pole",
      subgroupNumber: "412", subgroup: "Geared Motors",
      supplier: "SEW-Eurodrive", typeDesignation: "R37DRN71M4", image: "crop/SEW.R37DRN71M4"
    }
  },

  nodes: [
    // ================= electrical tree (as on the board) =================
    // ST001 (station) > +IR001 (functional unit) > .FG001, .CR001 (BMKs)
    { id: "e-ST001", side: "electrical", kind: "station", code: "ST001", name: "Station", parent: null },
    { id: "e-IR001", side: "electrical", kind: "fu", code: "+IR001", name: "Industrial Robot", parent: "e-ST001",
      description: "Industrial Robot", supplier: "Kuka", image: "crop/+IR001" },
    { id: "e-FG001", side: "electrical", kind: "bmk", code: ".FG001", name: "Gripper", parent: "e-IR001",
      description: "Gripper", image: "crop/FG001" },
    { id: "e-CR001", side: "electrical", kind: "bmk", code: ".CR001", name: "Process control robot", parent: "e-IR001",
      description: "Process control robot", supplier: "Kuka", image: "crop/CR001",
      note: { pt: "O controlador também é KUKA, mas só existe do lado elétrico: não tem par mecânico.",
              en: "The controller is KUKA too, but it only exists on the electrical side: no mechanical partner." } },

    // FT001 (conveyor technology) > .CB001 (functional unit) > -Q1, -X1, -M1 (BMKs, invented) > articles
    { id: "e-FT001", side: "electrical", kind: "station", code: "FT001", name: "Conveyor technology", parent: null },
    { id: "e-CB001", side: "electrical", kind: "fu", code: ".CB001", name: "Cabinet Junction Box", parent: "e-FT001",
      description: "Cabinet Junction Box", image: "crop/CB001" },
    { id: "e-Q1",    side: "electrical", kind: "bmk", code: "-Q1", name: "Motor protection", parent: "e-CB001" },
    { id: "e-X1",    side: "electrical", kind: "bmk", code: "-X1", name: "Terminals", parent: "e-CB001" },
    { id: "e-M1",    side: "electrical", kind: "bmk", code: "-M1", name: "Conveyor motor", parent: "e-CB001" },
    { id: "e-3RV2",  side: "electrical", kind: "article", code: "SIE.3RV2011-1DA20", name: "Circuit breaker", parent: "e-Q1",
      article: "SIE.3RV2011-1DA20",
      note: { pt: "O disjuntor só existe do lado elétrico.", en: "The circuit breaker only exists on the electrical side." } },
    { id: "e-WAGO",  side: "electrical", kind: "article", code: "WAGO.249-116", name: "Clamps", parent: "e-X1",
      article: "WAGO.249-116",
      note: { pt: "Bornes e acessórios só existem do lado elétrico.", en: "Clamps only exist on the electrical side." } },
    { id: "e-SEW",   side: "electrical", kind: "article", code: "SEW.R37DRN71M4", name: "Geared motor", parent: "e-M1",
      article: "SEW.R37DRN71M4" },

    // ================= mechanical tree =================
    // FT001 > LE001 (conveyor unit) > LE001.1 (gear unit) > LE001.1.1 / .1.2 / .1.3
    { id: "m-FT001",    side: "mechanical", kind: "station", code: "FT001", name: "Conveyor technology", parent: null },
    { id: "m-LE001",    side: "mechanical", kind: "fu", code: "LE001", name: "Conveyor unit", parent: "m-FT001",
      description: "Conveyor unit (assembly)", image: "crop/LE001" },
    { id: "m-LE001.1",  side: "mechanical", kind: "bmk", code: "LE001.1", name: "Gear unit", parent: "m-LE001",
      description: "Gear unit (sub-assembly)", image: "crop/LE001.1" },
    { id: "m-LE001.1.1", side: "mechanical", kind: "article", code: "LE001.1.1", name: "Gear wheel with shaft", parent: "m-LE001.1",
      description: "Gear wheel with shaft and base", image: "crop/LE001.1.1",
      note: { pt: "A roda dentada só existe do lado mecânico.", en: "The gear wheel only exists on the mechanical side." } },
    { id: "m-LE001.1.2", side: "mechanical", kind: "article", code: "LE001.1.2", name: "Gear housing", parent: "m-LE001.1",
      description: "Cast gear housing", image: "crop/LE001.1.2",
      note: { pt: "A carcaça só existe do lado mecânico.", en: "The housing only exists on the mechanical side." } },
    { id: "m-LE001.1.3", side: "mechanical", kind: "article", code: "LE001.1.3", name: "Geared motor with spindle", parent: "m-LE001.1",
      description: "Geared motor with spindle", supplier: "SEW-Eurodrive", image: "crop/LE001.1.3" }
  ],

  answerKey: [
    { e: "e-SEW", m: "m-LE001.1.3",
      why: { pt: "O mesmo motorredutor SEW.R37DRN71M4: no elétrico é o article, no mecânico é a posição LE001.1.3.",
             en: "The same SEW.R37DRN71M4 geared motor: an article on the electrical side, position LE001.1.3 on the mechanical side." } }
  ],

  ui: {
    pt: {
      brandSub: "Factory Information Organizer",
      welcomeTitle: "Monta a estrutura da fábrica",
      welcomeLead: "O FIO organiza e liga automaticamente a estrutura elétrica (ePlan) e a mecânica (BOM). Consegues fazer o mesmo?",
      steps: [
        "Monta a estrutura elétrica: puxa o ponto ＋ de uma peça até outra para as ligar, de cima para baixo.",
        "Faz o mesmo para a estrutura mecânica.",
        "Liga o que é a mesma coisa nas duas estruturas."
      ],
      start: "Começar",
      stepNames: ["Elétrico", "Mecânico", "Relações"],
      electrical: "Elétrico (ePlan)",
      mechanical: "Mecânico (BOM)",
      sideWord: { electrical: "elétrico", mechanical: "mecânico" },
      kindWord: { station: "estação", fu: "functional unit", bmk: "BMK", article: "article" },
      kindInfo: {
        station: "Estação: a raiz da árvore. Agrupa as functional units.",
        fu: "Functional unit: agrupa os BMKs por função.",
        bmk: "BMK: objeto identificado por um código.",
        article: "Article: a peça concreta do fabricante (supplier.número)."
      },
      intro: [
        "Monta a estrutura ELÉTRICA: puxa o ponto ＋ de uma peça até outra para as ligar, do nível de cima para o de baixo.",
        "Agora a estrutura MECÂNICA: puxa o ponto ＋ de uma peça até outra, do nível de cima para o de baixo.",
        "Liga cada peça elétrica à mecânica que é a mesma coisa (o mesmo article ou o mesmo equipamento): arrasta de um cartão até ao outro lado."
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
        "Build the electrical structure: pull the ＋ dot of a piece to another to link them, top to bottom.",
        "Do the same for the mechanical structure.",
        "Link what is the same thing in both structures."
      ],
      start: "Start",
      stepNames: ["Electrical", "Mechanical", "Relations"],
      electrical: "Electrical (ePlan)",
      mechanical: "Mechanical (BOM)",
      sideWord: { electrical: "electrical", mechanical: "mechanical" },
      kindWord: { station: "station", fu: "functional unit", bmk: "BMK", article: "article" },
      kindInfo: {
        station: "Station: the root of the tree. It groups functional units.",
        fu: "Functional unit: groups BMKs by function.",
        bmk: "BMK: an object identified by a code.",
        article: "Article: the concrete part from the manufacturer (supplier.number)."
      },
      intro: [
        "Build the ELECTRICAL structure: pull the ＋ dot of a piece to another to link them, from the upper level to the lower one.",
        "Now the MECHANICAL structure: pull the ＋ dot of a piece to another, from the upper level to the lower one.",
        "Link each electrical piece to the mechanical one that is the same thing (same article or same equipment): drag from one card to the other side."
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
      belongs: (c, p) => c + " belongs to " + p + ".",
      noPair: (bmk, side) => bmk + " only exists on the " + side + " side: it has no partner.",
      wrongPair: "Not the same article.",
      sameSupplier: "Same supplier, but a different article.",
      missed: "This link was missing."
    }
  }
};
