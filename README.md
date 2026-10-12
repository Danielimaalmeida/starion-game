# FIO – Encontra as relações (3D Day)

Jogo local, sem internet, para o stand do 3D Day. O visitante liga cada elemento
da árvore elétrica (ePlan) ao elemento mecânico (BOM) que usa o mesmo article.

## Como correr

Abre `index.html` num browser (Chrome ou Edge). Não precisa de servidor nem de rede.

Modo quiosque (ecrã inteiro, sem barras):

```
chrome --kiosk --app=file:///CAMINHO/PARA/starion-game/index.html
```

Tecla `F` alterna ecrã inteiro. Idioma: `index.html?lang=en` (ou `config.lang` em `data.js`).

## Como se joga

- Arrastar de um cartão até ao par do outro lado, ou clicar num e depois no outro.
- Apagar uma ligação: clicar no `×` a meio da linha. `Recomeçar` está sempre visível.
- `Dica`: até 3, progressivas (supplier, grupo, cartão). Cada uma custa um ponto.
- `Verificar`: mostra certas (verde ✓), erradas (vermelho ✗) e pares em falta (tracejado ?).
  Passar o rato por uma linha explica porquê.
- `Tu vs. FIO`: o FIO desenha as ligações certas sozinho.
- Sem toque durante 60 s: aviso de 10 s e volta ao ecrã inicial.

## Trocar o conteúdo

Tudo está em `data.js` (os dados atuais são fictícios):

- `articles`: peças físicas (só estas têm foto), com os campos do FIO.
- `groups`: functional units (cabeçalhos de cada lado).
- `cards`: BMKs, cada um ligado a um group e a um article.
- `answerKey`: o gabarito, pares `e` (elétrico) ↔ `m` (mecânico). Um cartão pode ter
  vários pares. Um cartão que não está no gabarito não tem par: ligá-lo é erro.
- `config`: pontuação, número de dicas, tempos de inatividade, baralhar, cronómetro.

`config.fioSeconds` está a `null` (não mostra tempo do FIO). Só o preenchas com um
valor que tenhas medido.

## Imagens

Põe os PNGs (versão com sombra) em `img/`, com o nome do campo `image` do article
mais `.png`. Se faltar uma imagem aparece um quadrado tracejado com as iniciais.
Os ficheiros usados pelos dados atuais:

`sensor_M12_cabo`, `sensor_ifm_laranja`, `valvula_festo`, `sensor_pressao_festo`,
`motorredutor_vermelho`, `controlador_robot_kuka`, `robot_kuka`, `plc_siemens`,
`regua_terminais_10p`, `cabo_lapp`, `perfil_aluminio`, `rolos_transportador`,
`mola_helicoidal`.

Antes de qualquer uso fora da empresa, confirmar os direitos de imagem dos fabricantes.
