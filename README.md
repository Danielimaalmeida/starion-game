# FIO – Monta a estrutura (3D Day)

Jogo local, sem internet, para o stand do 3D Day. Em três passos, o visitante faz o
que o FIO faz automaticamente:

1. **Elétrico**: monta a árvore elétrica (estação → functional unit → BMK → article).
2. **Mecânico**: monta a árvore mecânica.
3. **Relações**: liga cada BMK elétrico ao mecânico que usa o mesmo article.
   No fim, "Tu vs. FIO" mostra o FIO a encontrar as relações sozinho.

## Como correr

Abre `index.html` num browser (Chrome ou Edge). Não precisa de servidor nem de rede.

Modo quiosque (ecrã inteiro, sem barras):

```
chrome --kiosk --app=file:///CAMINHO/PARA/starion-game/index.html
```

Tecla `F` alterna ecrã inteiro. Idioma: botões **Português / English** no ecrã inicial
(guarda-se no endereço, `index.html?lang=en`; por omissão `config.lang` em `data.js`).

## Fluxo

1. Ecrã inicial (volta-se aqui ao fim de 60 s sem interação).
2. "Como funciona": o desafio de negócio (a mesma estação no ePlan e, na mecânica, nas BOMs e no Layout file), os níveis
   da árvore com um exemplo fictício (`rulesExample` em `data.js`, para não dar respostas)
   e as regras. O cronómetro só começa ao fechar este ecrã.
3. Passo 1, depois um cartão curto antes dos passos 2 e 3 a explicar o que muda.
   O botão `?` no cabeçalho reabre o "Como funciona" sem perder o jogo.

## Como se joga (rato)

- Passos 1 e 2: as peças flutuam devagar. Param quando o rato está em cima, quando são
  arrastadas ou quando já estão ligadas.
  - Arrastar a peça: move-a, para arrumar a árvore. Fica onde a largares e afasta-se
    sozinha se cair em cima de outra.
  - Puxar o ponto ＋ de uma peça até outra: cria uma ligação (um fio). O sentido é
    automático, do nível de cima para o de baixo.
  - Também dá para clicar no ＋ e depois na outra peça.
- Passo 3: arrastar de um cartão elétrico (laranja) para um mecânico (roxo) (ou clicar num e no outro).
  O cabeçalho e o cartão de entrada dizem quantas relações há para encontrar (hoje 3:
  robot, garra e motor SEW).
- Apagar uma ligação: clicar no `×` a meio do fio. `Limpar` apaga as do passo atual.
- `Dica`: até 3 por passo, progressivas. Cada uma custa um ponto.
- `Verificar`: fios certos com ✓ verde, errados a vermelho ✗, em falta a ponteado ?.
  Passar o rato por um fio explica porquê.
- Pista: quando fazes uma ligação certa, nos passos 1 e 3 um clarão amarelo percorre o fio e
  fica uma corrente elétrica contínua; no passo 2 aparecem duas engrenagens a rodar.
  A pontuação só conta ao Verificar.
  Para esconder a pista até ao Verificar: `config.currentOnLink: false`.
  `Continuar` passa ao passo seguinte.
- `Recomeçar` volta ao passo 1. Se já houver progresso, pede um segundo clique.
- Sem interação durante 60 s: aviso de 10 s e volta ao ecrã inicial.

## Trocar o conteúdo

Tudo está em `data.js`. As duas árvores seguem o board "3D Day – Jogo com fotos".
Os BMKs `-Q1`, `-X1`, `-M1`, o ramo mecânico do robot (`LE002…`: a garra fica montada no robot e há
um pedestal que o elétrico não tem; fotos espelhadas em `img/variant/`) e os nomes e descrições mecânicos (`LE001…`)
são ilustrativos.

- `articles`: peças concretas do fabricante (supplier.número), com os campos do FIO.
- `nodes`: as peças das duas árvores. No elétrico, `kind` é `station`, `fu`, `bmk` ou `article`.
  Na mecânica não há estações: as raízes são layout elements (`le`, do Layout file) e por baixo
  estão as peças das BOMs (`part`), com códigos que continuam o do pai (LE001 → LE001.1 → LE001.1.1).
  Em ambos,
  `parent` diz onde a peça pendura: é o gabarito dos passos 1 e 2. A seta vai sempre
  do nível de cima para o de baixo; ligar peças do mesmo nível é permitido, mas conta
  como erro. Foto: `image` no próprio nó, ou a do seu `article`. Peças sem foto
  aparecem como etiqueta.
- Propriedade: cada peça com foto mostra uma etiqueta (`config.showProperty`). Por omissão
  é o `supplier`; um nó pode ter `prop` com outro valor. Peças que correspondem partilham-na,
  e há iscos que também a partilham (a roda dentada `LE001.1.1` é SEW-Eurodrive como o motor).
  Os suppliers Schunk, Rittal, Item e Neugart são ilustrativos.
- `answerKey`: o gabarito do passo 3, pares `e` (elétrico) ↔ `m` (mecânico). Uma peça
  pode ter vários pares. Uma peça com foto fora do gabarito não tem par: ligá-la é erro.
- `config`: pontuação, dicas, tamanho das peças nos passos 1 e 2 (`scale`, 0.8 = 20% mais pequenas), deriva (`drift`, `driftSpeed`), tempos de
  inatividade, cronómetro, `hidePhotos` (passo 3: esconde as fotos de um lado até
  passar o rato).

`config.fioSeconds` está a `null` (não mostra tempo do FIO). Só o preenchas com um
valor que tenhas medido.

## Imagens

Ficam em `img/`, e o campo `image` é o caminho dentro de `img/` sem `.png`.
Se faltar uma imagem aparece um quadrado tracejado com as iniciais.

As exportações do board trazem o autocolante, a caixa de texto por baixo e margens
brancas. Para ficar só com o autocolante:

```
python3 tools/crop_stickers.py      # img/*.png -> img/crop/*.png (precisa de Pillow)
```

Os originais ficam intactos e os dados usam `crop/<nome>`.

Antes de qualquer uso fora da empresa, confirmar os direitos de imagem dos fabricantes.
