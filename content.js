/*
  ============================================================
  CONTEÚDO DO SITE — edite SOMENTE este arquivo para trocar textos e fotos.
  ============================================================
  - Tudo o que está marcado com `placeholder: true` é texto de exemplo.
    Troque o texto e apague `placeholder: true` (ou deixe, não aparece pra ela).
    No modo teste (localhost) aparece uma etiqueta "placeholder" nos itens que faltam trocar.
  - Fotos: coloque os arquivos em assets/ e preencha `imagem: 'assets/nome.jpg'`.
  - Tipos de porta: 'mensagem' | 'memoria' | 'foto' | 'vale' | 'musica' | 'piada'
  - Música: preencha `link` com a URL (Spotify/YouTube) e ela ganha um botão "Ouvir".
*/

const p = (tipo, titulo, texto, extra = {}) => ({ tipo, titulo, texto, imagem: '', link: '', placeholder: true, ...extra });

const christmasContent = {
  // Ano do calendário (as portas abrem em dezembro deste ano).
  ano: 2026,

  // Rodapé / textos gerais
  nomeDela: 'Lorena',

  // ---------- 1. CALENDÁRIO DO ADVENTO (24 portas, na ordem) ----------
  portas: [
    p('mensagem', 'Primeiro dia', 'O nosso primeiro sorriso do dia. Que dezembro comece assim.'),
    p('vale', 'Vale escolher o filme', 'Hoje você escolhe o filme, sem direito a reclamação (e eu faço a pipoca).'),
    p('musica', 'A música que lembra você', 'Toda vez que toca, eu penso em você. Aperta o play.', { link: '', linkTexto: 'Ouvir' }),
    p('piada', 'A nossa favorita', 'Aqui vai a piada interna que só a gente entende. (troque pela real!)'),
    p('mensagem', 'Um abraço demorado', 'Um abraço demorado, sem motivo nenhum. Só porque sim.'),
    p('foto', 'A foto que me faz sorrir', 'Essa foto sempre me faz sorrir. Ainda não sei se é a foto ou é você.'),
    p('vale', 'Vale um café', 'Um café feito por mim, servido na cama, com carinho.'),
    p('memoria', 'Um dia simples', 'Uma lembrança de um dia simples que ficou guardado como um dos melhores.'),
    p('mensagem', 'Mais bonito', 'Você deixa tudo mais bonito só por estar por perto.'),
    p('vale', 'Passeio surpresa', 'Vale um passeio surpresa. Você só precisa estar pronta.'),
    p('memoria', 'A parte mais gostosa', 'A parte mais gostosa do nosso ano até aqui.'),
    p('vale', 'Vale escolher o jantar', 'Hoje o jantar é por sua conta: você escolhe, eu levo (ou cozinho).'),
    p('mensagem', 'Uma promessa para 2027', 'Uma promessa pequena e sincera para o ano que vem.'),
    p('mensagem', 'Meu porto', 'Obrigado por ser meu porto seguro.'),
    p('mensagem', 'Uma dança na sala', 'Hoje tem dança na sala, de meia, sem música certa.'),
    p('mensagem', 'Próxima aventura', 'A nossa próxima aventura começa aqui.'),
    p('mensagem', 'Boa noite', 'Um beijo de boa noite, entregue antecipado.'),
    p('piada', 'Melhor coincidência', 'Você é a minha melhor coincidência.'),
    p('vale', 'Manhã sem despertador', 'Vale uma manhã inteira sem despertador, com café quentinho.'),
    p('memoria', 'Para guardar', 'Uma memória para guardar no lugar mais quentinho da cabeça.'),
    p('mensagem', 'Meu lugar preferido', 'Meu lugar preferido é ao seu lado.'),
    p('mensagem', 'Um desejo pequenininho', 'Um desejo pequenininho: que você sinta como é amada.'),
    p('mensagem', 'Quase Natal', 'Quase Natal. Mais um abraço, que é pra aguentar a ansiedade.'),
    p('mensagem', 'Feliz Natal, meu amor', 'Feliz Natal. Obrigado por fazer deste ano o melhor.')
  ],

  // ---------- 2. ÁRVORE DE MEMÓRIAS ----------
  // x e y: posição do enfeite na árvore, em % (0–100). Pode adicionar/remover enfeites à vontade.
  memorias: [
    { x: 50, y: 29, rotulo: 'o primeiro capítulo', titulo: 'O começo', texto: 'Aqui entra a lembrança que mora no começo de tudo.', imagem: 'assets/bolinha1_comeco.jpg', placeholder: false },
    { x: 39, y: 38, rotulo: 'um dia comum', titulo: 'Um dia comum', texto: 'Um momento simples que ficou especial só porque a gente estava junto.', imagem: 'assets/bolinha2_diacomum.jpg', placeholder: false },
    { x: 62, y: 44, rotulo: 'uma aventura', titulo: 'Uma aventura', texto: 'Uma viagem, um passeio ou um plano que vivemos lado a lado.', imagem: 'assets/bolinha3_umaaventura.jpg', placeholder: false },
    { x: 32, y: 60, rotulo: 'nosso lugar', titulo: 'Nosso lugar', texto: 'O lugar que tem um pedacinho da nossa história.', imagem: 'assets/bolinha5_nossolugar.jpg', placeholder: false },
    { x: 50, y: 56, rotulo: 'motivo para celebrar', titulo: 'Um motivo para celebrar', texto: 'Uma conquista, uma surpresa ou qualquer motivo pequeno para comemorar.', imagem: 'assets/bolinha4_ummotivo.jpg', placeholder: false },
    { x: 68, y: 67, rotulo: 'risada', titulo: 'A risada', texto: 'Aquele dia em que a gente riu até doer a barriga.', imagem: 'assets/bolinha6_arisada.jpg', placeholder: false },
    { x: 23, y: 79, rotulo: 'carinho', titulo: 'O carinho', texto: 'Um gesto pequeno seu que eu nunca vou esquecer.', imagem: 'assets/bolinha8_ocarinho.jpg', placeholder: false },
    { x: 45, y: 76, rotulo: 'o agora', titulo: 'Agora', texto: 'Hoje, aqui, do jeito que a gente está. Isso também vira memória.', imagem: 'assets/bolinha7_hojeemdia.jpg', placeholder: false }
  ],

  // Carta principal (a estrela no topo da árvore)
  carta: {
    rotulo: 'a carta principal',
    titulo: 'Minha carta para você',
    texto: 'Lorena, se eu pudesse embrulhar tudo que sinto, ainda faltaria papel. Obrigado por fazer os dias comuns terem gosto de história. Que o próximo ano traga caminhos novos, mas que a gente continue encontrando o caminho de volta um para o outro.',
    imagem: '',
    placeholder: true
  },

  // ---------- 4. PRESENTE FÍSICO (trancado até o dia 25/12) ----------
  // Até o dia 25 o menu mostra "indisponível" e o aviso abaixo. No dia 25 abre a página
  // com as fotos de vocês escolhendo/fazendo o presente e a carta.
  presenteFisico: {
    aviso: {
      rotulo: 'indisponível por aqui',
      titulo: 'Esse presente é de verdade',
      texto: 'Ele não cabe numa tela: é o presente físico, feito para ser aberto com as mãos. No dia 25, esta porta se abre e você vê os bastidores de como ele nasceu.'
    },
    titulo: 'Os bastidores do presente',
    abertura: 'Agora que você já abriu o presente de verdade, venha ver como ele foi escolhido e feito.',
    // Fotos em assets/ (preencha `imagem`). Adicione/remova à vontade.
    fotos: [
      { imagem: '', legenda: 'Escolhendo o presente' },
      { imagem: '', legenda: 'Pensando em você' },
      { imagem: '', legenda: 'Fazendo com carinho' },
      { imagem: '', legenda: 'Quase pronto' }
    ],
    carta: {
      titulo: 'Uma carta sobre o presente',
      texto: 'Escreva aqui a carta que acompanha o presente físico. Conte o que você pensou ao escolher, o que deu trabalho, o que te fez sorrir no caminho.'
    },
    placeholder: true
  },

  // ---------- 3. LISTA DE DESEJOS (carta ao Papai Noel invertida) ----------
  desejos: {
    abertura: 'Neste ano, eu não quero pedir nada para mim.',
    lista: [
      'que a gente conheça lugares que ainda não cabem no mapa',
      'que seus sonhos encontrem espaço, tempo e coragem',
      'que nunca faltem domingos lentos e risadas inesperadas',
      'que 2027 nos dê muitas histórias para contar'
    ],
    // Vale real no final da carta (deixe `vale: null` para não mostrar)
    vale: {
      titulo: 'Vale uma viagem',
      texto: 'Um fim de semana só nosso, com destino escolhido por você. Válido em 2027.',
      placeholder: true
    },
    // Ilustração de vocês duas no fim da carta (troque por uma foto real se quiser; '' para não mostrar)
    ilustracao: 'assets/nos-duas.svg',
    ilustracaoLegenda: 'nós duas, sempre',
    assinatura: 'seu presente favorito',
    placeholder: true
  }
};
