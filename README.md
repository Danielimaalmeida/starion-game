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

Tecla `F` alterna ecrã inteiro. Idioma: `index.html?lang=en` (ou `config.lang` em `data.js`).

## Como se joga (rato)

- Passos 1 e 2: as peças flutuam devagar. Param quando o rato está em cima, quando são
  arrastadas ou quando já estão ligadas.
  - Arrastar a peça: move-a, para arrumar a árvore. Fica onde a largares e afasta-se
    sozinha se cair em cima de outra.
  - Puxar o ponto ＋ de uma peça até outra: cria uma ligação (um fio). O sentido é
    automático, do nível de cima para o de baixo.
  - Também dá para clicar no ＋ e depois na outra peça.
- Passo 3: arrastar de um cartão elétrico (laranja) para um mecânico (roxo) (ou clicar num e no outro).
- Apagar uma ligação: clicar no `×` a meio do fio. `Limpar` apaga as do passo atual.
- `Dica`: até 3 por passo, progressivas. Cada uma custa um ponto.
- `Verificar`: fios certos com ✓ verde, errados a vermelho ✗, em falta a ponteado ?.
  Nos passos 1 e 3, os fios certos ganham corrente elétrica: um clarão percorre-os um a um
  e depois fica uma corrente contínua (`config.currentOnLink: true` mostra-a logo ao
  ligar, mas revela as respostas). Passar o rato por um fio explica porquê.
  `Continuar` passa ao passo seguinte.
- `Recomeçar` volta ao passo 1. Se já houver progresso, pede um segundo clique.
- Sem interação durante 60 s: aviso de 10 s e volta ao ecrã inicial.

## Trocar o conteúdo

Tudo está em `data.js`. As duas árvores seguem o board "3D Day – Jogo com fotos".
Os BMKs `-Q1`, `-X1`, `-M1` e os nomes e descrições mecânicos (`LE001…`) são ilustrativos.

- `articles`: peças concretas do fabricante (supplier.número), com os campos do FIO.
- `nodes`: as peças das duas árvores. `kind` é `station`, `fu`, `bmk` ou `article`,
  e `parent` diz onde a peça pendura: é o gabarito dos passos 1 e 2. A seta vai sempre
  do nível de cima para o de baixo; ligar peças do mesmo nível é permitido, mas conta
  como erro. Foto: `image` no próprio nó, ou a do seu `article`. Peças sem foto
  aparecem como etiqueta.
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
