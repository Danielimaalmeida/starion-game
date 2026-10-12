# FIO – Monta a estrutura (3D Day)

Jogo local, sem internet, para o stand do 3D Day. Em três passos, o visitante faz o
que o FIO faz automaticamente:

1. **Elétrico**: monta a árvore elétrica (estação → functional unit → BMK).
2. **Mecânico**: monta a árvore mecânica.
3. **Relações**: liga cada BMK elétrico ao mecânico que usa o mesmo article.
   No fim, "Tu vs. FIO" mostra o FIO a encontrar as relações sozinho.

## Como correr

Abre `index.html` num browser (Chrome ou Edge). Não precisa de servidor nem de rede.

Modo quiosque (ecrã inteiro, sem barras):

```
chrome --kiosk --app=file:///CAMINHO/PARA/starion-game/index.html
```

Tecla `F` alterna ecrã inteiro. Idioma: `index.html?lang=en` (ou `config.lang` em `data.js`).

## Como se joga (rato)

- Passos 1 e 2: as peças flutuam devagar. Param quando o rato está em cima, quando são
  arrastadas ou quando já estão ligadas.
  - Arrastar a peça: move-a, para arrumar a árvore.
  - Puxar o ponto ＋ de uma peça até outra: cria uma ligação (um fio). O sentido é
    automático, do nível de cima para o de baixo. Peças do mesmo nível não se ligam.
  - Também dá para clicar no ＋ e depois na outra peça.
- Passo 3: arrastar de um cartão elétrico para um mecânico (ou clicar num e no outro).
- Apagar uma ligação: clicar no `×` a meio do fio. `Limpar` apaga as do passo atual.
- `Dica`: até 3 por passo, progressivas. Cada uma custa um ponto.
- `Verificar`: fios certos a verde ✓, errados a vermelho ✗, em falta a ponteado ?.
  Passar o rato por um fio explica porquê. `Continuar` passa ao passo seguinte.
- `Recomeçar` volta ao passo 1. Se já houver progresso, pede um segundo clique.
- Sem interação durante 60 s: aviso de 10 s e volta ao ecrã inicial.

## Trocar o conteúdo

Tudo está em `data.js` (os dados atuais são fictícios):

- `articles`: peças físicas (só estas têm foto), com os campos do FIO.
- `nodes`: as peças das duas árvores. `kind` é `station`, `fu` ou `bmk`, e `parent`
  diz onde a peça pendura: é o gabarito dos passos 1 e 2. Os BMK apontam para um article.
- `answerKey`: o gabarito do passo 3, pares `e` (elétrico) ↔ `m` (mecânico). Um BMK
  pode ter vários pares. Um BMK fora do gabarito não tem par: ligá-lo é erro.
- `config`: pontuação, dicas, deriva das peças (`drift`, `driftSpeed`), tempos de
  inatividade, cronómetro, `hidePhotos` (passo 3: esconde as fotos de um lado até
  passar o rato).

`config.fioSeconds` está a `null` (não mostra tempo do FIO). Só o preenchas com um
valor que tenhas medido.

## Imagens

Põe os PNGs (versão com sombra) em `img/`, com o nome do campo `image` do article
mais `.png`. Se faltar uma imagem aparece um quadrado tracejado com as iniciais.
Os ficheiros usados pelos dados atuais:

`sensor_M12_cabo`, `sensor_ifm_laranja`, `valvula_festo`, `motorredutor_vermelho`,
`plc_siemens`, `controlador_robot_kuka`, `robot_kuka`, `rolos_transportador`.

Antes de qualquer uso fora da empresa, confirmar os direitos de imagem dos fabricantes.
