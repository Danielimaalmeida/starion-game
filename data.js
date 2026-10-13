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
function ord(n) { var s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }

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
    // One property shown on every photo piece: the node's `prop` ({ pt, en } or text)
    // if it has one, otherwise its supplier. Matching pieces share it; decoys do too.
    showProperty: true,
    // Master string (the full path of a node, e.g. ++FT001.CB001-M1|SEW.R37DRN71M4) in the
    // detail panel. "always" shows it from the start; it gives away the parent, so
    // "afterCheck" hides it in steps 1 and 2 until Check. Step 3 always shows it.
    // A node may set `masterString` to override the computed one.
    showMasterString: "always",
    // Scoreboard: saved in this browser (localStorage), shown at the end and from the welcome
    // screen. Double-click its title for the organiser tools (export CSV, clear).
    scoreboardTop: 10,
    scoreboardKey: "fio-3dday-scores",
    // Hint on correct links: electric current (steps 1 and 3) or turning gears (step 2).
    // true = as soon as a correct link is made; false = only after Check.
    currentOnLink: true,
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
    { id: "e-ST001", side: "electrical", kind: "fg", code: "++ST001", name: "Station", parent: null },
    { id: "e-IR001", side: "electrical", kind: "fu", code: "+IR001", name: "Industrial Robot", parent: "e-ST001",
      description: "Industrial Robot", supplier: "Kuka", image: "crop/+IR001" },
    { id: "e-FG001", side: "electrical", kind: "bmk", code: ".FG001", name: "Gripper", parent: "e-IR001",
      description: "Gripper", supplier: "Schunk", image: "crop/FG001" },   // supplier illustrative
    { id: "e-CR001", side: "electrical", kind: "bmk", code: ".CR001", name: "Process control robot", parent: "e-IR001",
      description: "Process control robot", supplier: "Kuka", image: "crop/CR001",
      note: { pt: "O controlador também é KUKA, mas só existe do lado elétrico: não tem par mecânico.",
              en: "The controller is KUKA too, but it only exists on the electrical side: no mechanical partner." } },

    // FT001 (conveyor technology) > .CB001 (functional unit) > -Q1, -X1, -M1 (BMKs, invented) > articles
    { id: "e-FT001", side: "electrical", kind: "fg", code: "++FT001", name: "Conveyor technology", parent: null },
    { id: "e-CB001", side: "electrical", kind: "fu", code: ".CB001", name: "Cabinet Junction Box", parent: "e-FT001",
      description: "Cabinet Junction Box", supplier: "Rittal", image: "crop/CB001" },   // supplier illustrative
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
    // The mechanical side has no stations: layout elements (LE…, from the Layout file) are
    // the roots, and BOM positions hang below them with codes that extend the parent's
    // (LE002 > LE002.1 > LE002.1.1). Robot branch: the gripper hangs under the robot and
    // LE002.2 pedestal has no electrical twin. Codes illustrative; photos mirrored in img/variant/.
    { id: "m-LE002",     side: "mechanical", kind: "le", code: "LE002", name: "Robot cell", parent: null },
    { id: "m-LE002.1",   side: "mechanical", kind: "part", code: "LE002.1", name: "Robot, mechanical unit", parent: "m-LE002",
      description: "6-axis robot arm (mechanical unit)", supplier: "Kuka", image: "variant/LE002.1" },
    { id: "m-LE002.1.1", side: "mechanical", kind: "part", code: "LE002.1.1", name: "Gripper on flange", parent: "m-LE002.1",
      description: "Gripper, mounted on the robot flange", supplier: "Schunk", image: "variant/LE002.1.1" },
    { id: "m-LE002.2",   side: "mechanical", kind: "part", code: "LE002.2", name: "Robot pedestal", parent: "m-LE002",
      note: { pt: "O pedestal só existe do lado mecânico.", en: "The pedestal only exists on the mechanical side." } },

    // LE001 (conveyor unit) > LE001.1 (gear unit) > LE001.1.1 / .1.2 / .1.3
    { id: "m-LE001",    side: "mechanical", kind: "le", code: "LE001", name: "Conveyor unit", parent: null,
      description: "Conveyor unit (assembly)", supplier: "Item", image: "crop/LE001" },   // supplier illustrative
    { id: "m-LE001.1",  side: "mechanical", kind: "part", code: "LE001.1", name: "Gear unit", parent: "m-LE001",
      description: "Gear unit (sub-assembly)", supplier: "Neugart", image: "crop/LE001.1" },   // supplier illustrative
    { id: "m-LE001.1.1", side: "mechanical", kind: "part", code: "LE001.1.1", name: "Gear wheel with shaft", parent: "m-LE001.1",
      description: "Gear wheel with shaft and base", supplier: "SEW-Eurodrive", image: "crop/LE001.1.1",   // decoy: same supplier as the motor
      note: { pt: "Também é SEW-Eurodrive, mas é uma roda dentada, não o motor: só existe do lado mecânico.",
              en: "Also SEW-Eurodrive, but it is a gear wheel, not the motor: it only exists on the mechanical side." } },
    { id: "m-LE001.1.2", side: "mechanical", kind: "part", code: "LE001.1.2", name: "Gear housing", parent: "m-LE001.1",
      description: "Cast gear housing", supplier: "Neugart", image: "crop/LE001.1.2",   // supplier illustrative
      note: { pt: "A carcaça só existe do lado mecânico.", en: "The housing only exists on the mechanical side." } },
    { id: "m-LE001.1.3", side: "mechanical", kind: "part", code: "LE001.1.3", name: "Geared motor with spindle", parent: "m-LE001.1",
      description: "Geared motor with spindle", supplier: "SEW-Eurodrive", image: "crop/LE001.1.3" }
  ],

  answerKey: [
    { e: "e-IR001", m: "m-LE002.1",
      why: { pt: "O mesmo robot KUKA: no elétrico é a functional unit +IR001, no mecânico é a posição LE002.1, com outro código e noutro sítio da árvore.",
             en: "The same KUKA robot: functional unit +IR001 on the electrical side, position LE002.1 on the mechanical side, with another code and in another place of the tree." } },
    { e: "e-FG001", m: "m-LE002.1.1",
      why: { pt: "A mesma garra Schunk: no mecânico está montada no robot (LE002.1.1).", en: "The same Schunk gripper: on the mechanical side it is mounted on the robot (LE002.1.1)." } },
    { e: "e-SEW", m: "m-LE001.1.3",
      why: { pt: "O mesmo motorredutor SEW.R37DRN71M4: no elétrico é o article, no mecânico é a posição LE001.1.3.",
             en: "The same SEW.R37DRN71M4 geared motor: an article on the electrical side, position LE001.1.3 on the mechanical side." } }
  ],

  // Example shown on the "how it works" screen. Kept outside the game on purpose,
  // so the explanation does not give away any answer.
  rulesExample: [
    { kind: "fg",      code: "++ST020",    name: "Body shop – welding" },
    { kind: "fu",      code: "+WR01",      name: "Welding robot" },
    { kind: "bmk",     code: "-B5",        name: "Part present sensor" },
    { kind: "article", code: "IFM.IGS208", name: "Inductive sensor M12" }
  ],

  ui: {
    pt: {
      langName: "Português",
      namePlaceholder: "O teu nome (para a classificação)",
      anon: "Visitante",
      board: "Classificação",
      byTime: "Por tempo", byScore: "Por pontos",
      colName: "Nome", colTime: "Tempo", colScore: "Pontos", colWhen: "Hora",
      boardEmpty: "Ainda ninguém jogou. Sê o primeiro!",
      yourPlace: (r, t, by) => "Ficaste em " + r + ".º lugar " + (by === "score" ? "por pontos" : "por tempo") + " (" + t + ").",
      rankShort: r => r + ".º lugar",
      exportCsv: "Exportar CSV", clearAll: "Apagar tudo", clearSure: "Apagar mesmo?", close: "Fechar",
      toFind: n => n + (n === 1 ? " relação para encontrar" : " relações para encontrar"),
      toFindLong: n => "Neste passo há " + n + (n === 1 ? " relação certa." : " relações certas."),
      brandSub: "Factory Information Organizer",
      welcomeTitle: "Monta a estrutura da fábrica",
      welcomeLead: "O FIO organiza e liga automaticamente a estrutura elétrica (ePlan) e a mecânica (BOMs e Layout file). Consegues fazer o mesmo?",
      steps: [
        "Monta a estrutura elétrica: puxa o ponto ＋ de uma peça até outra para as ligar, de cima para baixo.",
        "Faz o mesmo para a estrutura mecânica.",
        "Liga o que é a mesma coisa nas duas estruturas."
      ],
      start: "Começar",
      rulesKicker: "Antes de começar",
      rulesTitle: "Como funciona",
      problemTitle: "O desafio",
      problem: "Numa fábrica de automóveis, cada estação da linha é descrita duas vezes: pela engenharia elétrica, no ePlan, e pela engenharia mecânica, nas listas de materiais (BOMs) e no Layout file, que define os elementos de layout (LE). São as mesmas peças, em ficheiros diferentes e com códigos diferentes. O FIO junta as duas estruturas e encontra sozinho o que corresponde a quê.",
      levelsTitle: "Cada estrutura é uma árvore com níveis",
      levels: {
        fg: ["Functional group", "o primeiro nível, com código ++"],
        fu: ["Functional unit", "agrupa por função"],
        bmk: ["BMK", "o código que identifica cada elemento"],
        article: ["Article", "a peça concreta do fabricante (supplier.número)"]
      },
      levelsNote: "Exemplo ilustrativo: as peças do jogo são outras.",
      masterNote: m => "Master string: cada peça junta o seu código ao do pai (o article com |), ex. " + m + ".",
      playTitle: "Como jogar",
      play: [
        ["＋", "Puxa o ponto ＋ de uma peça até outra para as ligar. A ligação vai sempre do nível de cima para o de baixo."],
        ["✋", "Arrasta as peças para arrumar a árvore. Falta espaço? A roda do rato (ou − / + no canto) afasta e aproxima."],
        ["×", "Enganaste-te? Clica no × do fio para o apagar."],
        ["🏷", "Cada peça mostra uma propriedade, o supplier. No passo 3, peças que são a mesma coisa têm o mesmo supplier, mas há iscos: confirma a foto e a descrição."],
        ["⚡", "Pista: se a ligação estiver certa, passa corrente elétrica no fio (no mecânico, rodam engrenagens).", "current"],
        ["✓", "No fim de cada passo, carrega em Verificar: +1 por ligação certa, −1 por errada."]
      ],
      stepsTitle: "3 passos",
      stepsShort: ["Elétrico (ePlan): monta a árvore.", "Mecânico (BOMs + Layout file): monta a árvore.", "Relações: liga o que é a mesma peça nos dois lados."],
      rulesGo: "Começar o passo 1",
      rulesBack: "Voltar ao jogo",
      help: "Como funciona",
      stepIntro: [
        null,
        { title: "Passo 2 · Mecânico", text: "A mesma linha, agora vista pela engenharia mecânica. Aqui não há functional groups: no topo estão os layout elements (LE…), que vêm do Layout file, e por baixo as peças das BOMs, com códigos que continuam o do pai (LE001 → LE001.1 → LE001.1.1). Ligação certa? As engrenagens começam a rodar." },
        { title: "Passo 3 · Relações", text: "Agora, o que o FIO faz sozinho: encontrar o que é a mesma peça nos dois lados. Liga cada cartão elétrico (laranja) ao mecânico (roxo) que lhe corresponde. A etiqueta do supplier ajuda, mas há iscos com o mesmo supplier, e nem tudo tem par." }
      ],
      introGo: "Vamos lá",
      stepNames: ["Elétrico", "Mecânico", "Relações"],
      electrical: "Elétrico (ePlan)",
      mechanical: "Mecânico (BOM + Layout)",
      sideWord: { electrical: "elétrico", mechanical: "mecânico" },
      kindWord: { fg: "functional group", station: "estação", fu: "functional unit", bmk: "BMK", article: "article", le: "layout element", part: "peça da BOM" },
      kindInfo: {
        fg: "Functional group (++): o primeiro nível da estrutura elétrica. Agrupa as functional units.",
        station: "Estação: a raiz da árvore. Agrupa as functional units.",
        fu: "Functional unit: agrupa os BMKs por função.",
        bmk: "BMK: objeto identificado por um código.",
        article: "Article: a peça concreta do fabricante (supplier.número).",
        le: "Layout element (LE): vem do Layout file e é o topo da estrutura mecânica.",
        part: "Peça da BOM: o que compõe o elemento de cima. O código continua o do pai."
      },
      intro: [
        "Monta a estrutura ELÉTRICA: puxa o ponto ＋ de uma peça até outra para as ligar, do nível de cima para o de baixo.",
        "Agora a estrutura MECÂNICA: começa pelos layout elements (LE…) e puxa o ponto ＋ de uma peça até outra, do nível de cima para o de baixo.",
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
      fields: { master: "Master string", description: "Standard Description", subgroup: "Subgroup", supplier: "Supplier Name", type: "Type Designation" },
      fioTitle: "Isto o FIO faz sozinho",
      fioText: "O FIO lê os exports do ePlan, das BOMs e do Layout file, organiza as estruturas e encontra estas relações automaticamente.",
      you: "Tu", fioLabel: "FIO",
      belongs: (c, p) => c + " pertence a " + p + ".",
      noPair: (bmk, side) => bmk + " só existe do lado " + side + ": não tem par.",
      wrongPair: "Não é o mesmo article.",
      sameSupplier: "O supplier é o mesmo, mas o article é outro.",
      missed: "Faltou esta ligação."
    },
    en: {
      langName: "English",
      namePlaceholder: "Your name (for the leaderboard)",
      anon: "Visitor",
      board: "Leaderboard",
      byTime: "By time", byScore: "By points",
      colName: "Name", colTime: "Time", colScore: "Points", colWhen: "At",
      boardEmpty: "Nobody has played yet. Be the first!",
      yourPlace: (r, t, by) => "You came " + ord(r) + " " + (by === "score" ? "by points" : "by time") + " (" + t + ").",
      rankShort: r => ord(r) + " place",
      exportCsv: "Export CSV", clearAll: "Clear all", clearSure: "Really clear?", close: "Close",
      toFind: n => n + (n === 1 ? " relation to find" : " relations to find"),
      toFindLong: n => "There " + (n === 1 ? "is 1 correct relation" : "are " + n + " correct relations") + " in this step.",
      brandSub: "Factory Information Organizer",
      welcomeTitle: "Build the factory structure",
      welcomeLead: "The FIO organises and links the electrical (ePlan) and mechanical (BOMs and Layout file) structures automatically. Can you do the same?",
      steps: [
        "Build the electrical structure: pull the ＋ dot of a piece to another to link them, top to bottom.",
        "Do the same for the mechanical structure.",
        "Link what is the same thing in both structures."
      ],
      start: "Start",
      rulesKicker: "Before you start",
      rulesTitle: "How it works",
      problemTitle: "The challenge",
      problem: "In a car factory, every station on the line is described twice: by electrical engineering, in ePlan, and by mechanical engineering, in the bills of materials (BOMs) and the Layout file, which defines the layout elements (LE). They are the same parts, in different files and with different codes. The FIO brings both structures together and works out on its own what matches what.",
      levelsTitle: "Each structure is a tree with levels",
      levels: {
        fg: ["Functional group", "the first level, coded ++"],
        fu: ["Functional unit", "groups things by function"],
        bmk: ["BMK", "the code that identifies each element"],
        article: ["Article", "the concrete part from the manufacturer (supplier.number)"]
      },
      levelsNote: "Illustrative example: the game uses other parts.",
      masterNote: m => "Master string: each piece appends its code to its parent's (the article with |), e.g. " + m + ".",
      playTitle: "How to play",
      play: [
        ["＋", "Pull the ＋ dot of a piece to another to link them. A link always goes from the upper level to the lower one."],
        ["✋", "Drag pieces around to tidy up the tree. Need room? The mouse wheel (or − / + in the corner) zooms out and in."],
        ["×", "Made a mistake? Click the × on the thread to remove it."],
        ["🏷", "Each piece shows one property, its supplier. In step 3, pieces that are the same thing share the supplier, but there are decoys: check the photo and the description too."],
        ["⚡", "Hint: if the link is right, electric current runs through the thread (on the mechanical side, gears start turning).", "current"],
        ["✓", "At the end of each step, press Check: +1 per correct link, −1 per wrong one."]
      ],
      stepsTitle: "3 steps",
      stepsShort: ["Electrical (ePlan): build the tree.", "Mechanical (BOMs + Layout file): build the tree.", "Relations: link what is the same part on both sides."],
      rulesGo: "Start step 1",
      rulesBack: "Back to the game",
      help: "How it works",
      stepIntro: [
        null,
        { title: "Step 2 · Mechanical", text: "The same line, now as mechanical engineering sees it. There are no functional groups here: the layout elements (LE…) from the Layout file are at the top, and the BOM items hang below them, with codes that extend the parent's (LE001 → LE001.1 → LE001.1.1). Right link? The gears start turning." },
        { title: "Step 3 · Relations", text: "Now what the FIO does on its own: find what is the same part on both sides. Link each electrical card (orange) to the mechanical card (purple) that matches it. The supplier tag helps, but some decoys share the supplier, and not everything has a partner." }
      ],
      introGo: "Let's go",
      stepNames: ["Electrical", "Mechanical", "Relations"],
      electrical: "Electrical (ePlan)",
      mechanical: "Mechanical (BOM + Layout)",
      sideWord: { electrical: "electrical", mechanical: "mechanical" },
      kindWord: { fg: "functional group", station: "station", fu: "functional unit", bmk: "BMK", article: "article", le: "layout element", part: "BOM item" },
      kindInfo: {
        fg: "Functional group (++): the first level of the electrical structure. It groups functional units.",
        station: "Station: the root of the tree. It groups functional units.",
        fu: "Functional unit: groups BMKs by function.",
        bmk: "BMK: an object identified by a code.",
        article: "Article: the concrete part from the manufacturer (supplier.number).",
        le: "Layout element (LE): comes from the Layout file and is the top of the mechanical structure.",
        part: "BOM item: what the element above is made of. Its code extends the parent's."
      },
      intro: [
        "Build the ELECTRICAL structure: pull the ＋ dot of a piece to another to link them, from the upper level to the lower one.",
        "Now the MECHANICAL structure: start from the layout elements (LE…) and pull the ＋ dot of a piece to another, from the upper level to the lower one.",
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
      fields: { master: "Master string", description: "Standard Description", subgroup: "Subgroup", supplier: "Supplier Name", type: "Type Designation" },
      fioTitle: "The FIO does this on its own",
      fioText: "The FIO reads the ePlan, BOM and Layout file exports, organises the structures and finds these relations automatically.",
      you: "You", fioLabel: "FIO",
      belongs: (c, p) => c + " belongs to " + p + ".",
      noPair: (bmk, side) => bmk + " only exists on the " + side + " side: it has no partner.",
      wrongPair: "Not the same article.",
      sameSupplier: "Same supplier, but a different article.",
      missed: "This link was missing."
    }
  }
};
