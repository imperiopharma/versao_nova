
// Padrões de resposta para o chatbot
type Pattern = {
  regex: RegExp;
  responses: string[];
  followUpSuggestions: string[];
};

// Base de conhecimento do chatbot
const patterns: Pattern[] = [
  {
    regex: /(oi|olá|e aí|ola|boa (tarde|noite|dia)|hey)/i,
    responses: [
      'Olá! Tudo bem? Sou o assistente virtual da Farmácia Futura. Como posso ajudar você hoje?',
      'Oi! Bem-vindo à Farmácia Futura. Em que posso ser útil?',
      'Olá! Estou aqui para ajudar você com produtos, entregas, promoções e mais. O que precisa?'
    ],
    followUpSuggestions: ['Ver produtos', 'Promoções', 'Horário de funcionamento', 'Falar sobre entrega']
  },
  {
    regex: /(produto|remédio|medicamento|item|comprar)/i,
    responses: [
      'Temos uma ampla variedade de produtos. Você está procurando algo específico?',
      'Nossa farmácia tem diversos medicamentos e produtos de saúde. O que você precisa?',
      'Posso ajudar você a encontrar produtos. Está buscando alguma categoria específica?'
    ],
    followUpSuggestions: ['Medicamentos genéricos', 'Produtos de beleza', 'Vitaminas', 'Produtos em promoção']
  },
  {
    regex: /(entrega|frete|delivery|entregar)/i,
    responses: [
      'Oferecemos entregas para toda a cidade! Para compras acima de R$200, o frete é grátis. Normalmente entregamos em até 2 horas após a confirmação do pedido.',
      'Nosso serviço de entrega funciona todos os dias. Compras acima de R$200 têm frete grátis e entregamos em até 2 horas!'
    ],
    followUpSuggestions: ['Prazo de entrega', 'Área de cobertura', 'Valor do frete', 'Rastrear pedido']
  },
  {
    regex: /(horário|hora|funcionamento|aberto|fechado)/i,
    responses: [
      'Nossa farmácia funciona de segunda a sábado, das 7h às 22h. Aos domingos e feriados, das 8h às 20h.',
      'Estamos abertos todos os dias! De segunda a sábado das 7h às 22h, e aos domingos e feriados das 8h às 20h.'
    ],
    followUpSuggestions: ['Atendimento 24h', 'Plantão', 'Endereço', 'Telefone']
  },
  {
    regex: /(desconto|promoção|oferta|cupom)/i,
    responses: [
      'Temos várias promoções ativas! Assinantes do nosso programa VIP têm 10% de desconto em todos os produtos. Além disso, temos ofertas semanais de até 30% em produtos selecionados.',
      'Nossas promoções atuais incluem 10% de desconto para membros VIP e ofertas especiais semanais com até 30% de desconto! Quer ver as ofertas desta semana?'
    ],
    followUpSuggestions: ['Ver promoções', 'Programa VIP', 'Cupons disponíveis', 'Medicamentos em oferta']
  },
  {
    regex: /(obrigado|valeu|agradecido|grato)/i,
    responses: [
      'Por nada! Estou sempre à disposição para ajudar. Precisa de mais alguma coisa?',
      'É um prazer ajudar! Se precisar de algo mais, estou aqui.',
      'Não há de quê! Fico feliz em poder ajudar. Mais alguma dúvida?'
    ],
    followUpSuggestions: ['Ver mais produtos', 'Finalizar atendimento', 'Avaliar atendimento']
  },
  {
    regex: /(genérico|similar|referência)/i,
    responses: [
      'Temos uma grande variedade de medicamentos genéricos com até 60% de economia em relação aos medicamentos de referência. Qual você está procurando?',
      'Os medicamentos genéricos são mais econômicos e têm a mesma eficácia dos medicamentos de referência. Nossa farmácia possui um amplo estoque. Qual você precisa?'
    ],
    followUpSuggestions: ['Lista de genéricos', 'Diferença entre genérico e similar', 'Medicamentos de referência']
  },
  {
    regex: /(pagamento|pagar|cartão|débito|crédito|pix)/i,
    responses: [
      'Aceitamos diversas formas de pagamento: cartões de crédito e débito, Pix, dinheiro, e até parcelamos em até 3x sem juros para compras acima de R$150.',
      'Você pode pagar com cartão de crédito/débito, Pix, transferência bancária ou dinheiro. Parcelamos em até 3x sem juros para compras acima de R$150.'
    ],
    followUpSuggestions: ['Parcelamento', 'Pagamento online', 'Desconto à vista']
  },
  {
    regex: /(programa|vip|fidelidade|desconto|clube)/i,
    responses: [
      'Nosso Programa VIP oferece benefícios exclusivos como 10% de desconto em todas as compras, frete grátis sempre, e acesso antecipado a promoções. A mensalidade é de apenas R$19,90.',
      'O Programa VIP da Farmácia Futura custa R$19,90 por mês e oferece 10% de desconto em todas as compras, frete grátis e promoções exclusivas. Vale muito a pena!'
    ],
    followUpSuggestions: ['Como se cadastrar', 'Benefícios VIP', 'Cancelar assinatura']
  },
  {
    regex: /(onde|localização|endereço|loja)/i,
    responses: [
      'Nossa loja principal fica na Av. Brasil, 1500, Centro. Mas temos outras 3 unidades pela cidade. Qual região você prefere?',
      'Temos 4 lojas na cidade. A matriz fica na Av. Brasil, 1500, Centro. Quer informações sobre alguma unidade específica?'
    ],
    followUpSuggestions: ['Ver no mapa', 'Outras unidades', 'Como chegar', 'Estacionamento']
  }
];

// Função para encontrar resposta baseada no padrão
export const getResponseForPattern = (userInput: string): string => {
  // Procurar por correspondências nos padrões
  for (const pattern of patterns) {
    if (pattern.regex.test(userInput)) {
      // Selecionar uma resposta aleatória deste padrão
      const randomIndex = Math.floor(Math.random() * pattern.responses.length);
      return pattern.responses[randomIndex];
    }
  }
  
  // Resposta padrão se nenhum padrão corresponder
  return 'Entendi! Posso ajudar com informações sobre medicamentos, entregas, horários de funcionamento e promoções. Em que mais posso ajudar?';
};

// Função para obter sugestões de resposta rápida
export const getQuickRepliesForResponse = (botResponse: string): string[] => {
  // Procurar qual padrão gerou esta resposta
  for (const pattern of patterns) {
    for (const response of pattern.responses) {
      if (botResponse === response) {
        return pattern.followUpSuggestions;
      }
    }
  }
  
  // Sugestões padrão se nenhuma correspondência for encontrada
  return ['Ver produtos', 'Promoções', 'Horário de funcionamento', 'Falar com atendente'];
};
