# Projeto: Site de Natal (presente para minha namorada)

## Objetivo
Site-presente de Natal para minha namorada. Ela vai abrir no celular, então mobile-first é prioridade. Vou entregar o link num cartão com QR code.

## Estética
- Tema "papel de presente": fundo vermelho natalino com textura/padrão de papel de embrulho.
- Laços verdes como elemento visual recorrente (no topo, nos cards, nas transições).
- Clima aconchegante e romântico, não infantil.
- Animações suaves (abrir laço, desembrulhar), respeitando `prefers-reduced-motion`.

## Estrutura
Página inicial com um **menu** que leva a três seções:

### 1. Calendário do Advento
- 24 portinhas, numeradas de 1 a 24.
- **Trava**: o calendário só libera quando faltar 24 dias para o Natal, ou seja, a partir de 1º de dezembro. Antes disso, mostrar um estado bloqueado com contagem regressiva até a liberação.
- Depois de liberado, a porta N só abre no dia N de dezembro (porta 1 em 01/12, porta 24 em 24/12). Portas futuras ficam trancadas.
- Cada porta revela um conteúdo: lembrança de nós, foto, vale, música, piada interna ou mensagem.
- Guardar no localStorage quais portas ela já abriu (com try/catch).
- Ter um jeito de eu testar simulando datas (ex.: `?data=2026-12-10` só em desenvolvimento).

### 2. Árvore de memórias
- Árvore de Natal com enfeites clicáveis.
- Cada enfeite abre uma memória do nosso ano (foto + texto curto) num modal.
- A estrela no topo abre a carta principal.

### 3. Lista de desejos (carta ao Papai Noel invertida)
- Em vez de pedidos para mim, uma lista de coisas que eu desejo para ela e para nós em 2027 (viagens, planos, sonhos).
- Visual de carta/pergaminho; pode terminar com um vale de algo real.

## Conteúdo
- Todo o conteúdo (portas, memórias, desejos, carta) deve ficar num arquivo de dados separado (ex.: `content.js` ou `content.json`) para eu editar fácil sem mexer no layout.
- Começar com textos de exemplo marcados como placeholder; eu substituo pelos reais.
- Fotos numa pasta `assets/`.

## Técnico
- Stack: HTML/CSS/JS puro (sem build). Arquivos: `index.html`, `styles.css`, `app.js`, `content.js`.
- Testar localmente: `npx serve .` e abrir `http://localhost:3000/?data=2026-12-10` (o `?data=` só funciona em localhost/arquivo local).
- Fuso horário das datas: America/Sao_Paulo.
- Deploy: Vercel ou Netlify, com domínio personalizado se possível.