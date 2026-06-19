***Otter Island***



* **Grupo**

\- Simão Gigante — 33403

\- Lucas Montagna — 33454



* **Motor**

Phaser 3.90.0, incluído localmente em `src/libs/phaser.min.js`.



* **Descrição**

Otter Island é um platformer 2D em que o jogador controla uma lontra numa ilha tropical.

O objetivo é explorar os 3 níveis, apanhar frutas, derrotar inimigos e entrar na gruta no fim de cada nível.



**Funcionalidades implementadas:**

\- 3 níveis jogáveis com cenários diferentes

\- 2 tipos de inimigos: caranguejos e tartarugas

\- Tartarugas podem ser apanhadas e usadas como projétil

\- Itens enterrados no chão: pedras, berries e peixes (recuperam vida)

\- Sistema de vidas com animação de dano e invencibilidade temporária

\- HUD com contador de berries e corações

\- Menu principal com fundo animado

\- Seleção de nível

\- Ecrã de Game Over e ecrã de Vitória por nível

\- Ecrã final ao completar todos os níveis

\- Pausa com tecla P

\- Suporte multilíngue PT/EN/ES/FR com seletor no menu

\- Controlo de volume nas opções

\- Voltar ao menu no Game Over e na Pausa



* **Controlos**



|**TECLA**|**AÇÃO**|
|-|-|
| ← →|Mover|
|X|Correr|
|Z / Espaço / ↑|Saltar|
|A|Apanhar / Atirar / Escavar|
|P|Pausar|
|M|Voltar ao menu (pausa/game over)|
|Z / Enter|Confirmar no menu|





* **Como executar**

1\. Clonar o repositório

2\. Abrir terminal na pasta do projeto

3\. Correr `python -m http.server 8000`

4\. Abrir `http://localhost:8000` no browser (Chrome, Firefox ou Edge)



**## Aspectos multimédia**



* **Imagens**

\- Sprites do jogador, inimigos e itens: pixel art 16×16 e 24×24, criados no Paint.NET pelo Lucas Montagna

\- Tileset de terreno: pixel art 16×16

\- Backgrounds dos níveis: pixel art criados no Paint.NET

\- Fundo do menu: criado no Piskel, 320×180px pelo Simão Gigante

\- Ícone do peixe (item de vida): criado no Piskel, 16×16px pelo Simão Gigante

\- Gruta (objetivo do nível): criada no Piskel, 32×32px pelo Simão Gigante

\- Todos os sprites têm resolução proporcional ao uso no jogo (zoom 3×)



* **Áudio**

\- Música de fundo do jogo: OGG, toca em loop durante o jogo

\- Música do menu: OGG, toca em loop no menu

\- Som de vitória de nível: OGG

\- Som de game over: OGG

\- Som de dano: OGG

\- Som de salto: OGG

\- Som de atirar: OGG

\- Som de apanhar fruta: OGG

\- Áudio em formato OGG para melhor compatibilidade e menor tamanho



* **Fontes**

\- Bitmap fonts pixel art para toda a UI (small e big), carregadas via RetroFont do Phaser



* **Traduções**

\- Sistema de traduções em `assets/lang.json` com suporte a PT, EN, ES e FR

\- Toda a UI textual traduzida



* **Tamanho total de assets**

Inferior a 10MB.

