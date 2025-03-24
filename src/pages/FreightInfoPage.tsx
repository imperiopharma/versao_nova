
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Truck, Calendar, ShieldCheck, CheckCircle } from 'lucide-react';

export const FreightInfoPage: React.FC = () => {
  const shippingOptions = [
    {
      name: 'Sedex',
      icon: <Truck className="text-imperio-navy" size={24} />,
      deliveryTime: '1 a 3 dias úteis',
      price: {
        'SP/RJ': 'R$ 20,00',
        'Outros': 'R$ 30,00',
      },
      features: [
        'Entrega rápida para todo o Brasil',
        'Rastreamento em tempo real',
        'Entrega em dias úteis',
      ],
    },
    {
      name: 'PAC',
      icon: <Calendar className="text-imperio-navy" size={24} />,
      deliveryTime: '3 a 8 dias úteis',
      price: {
        'SP/RJ': 'R$ 15,00',
        'Outros': 'R$ 20,00',
      },
      features: [
        'Opção econômica para todo o Brasil',
        'Rastreamento disponível',
        'Melhor custo-benefício',
      ],
    },
    {
      name: 'Transportadora',
      icon: <Truck className="text-imperio-navy" size={24} />,
      deliveryTime: '2 a 5 dias úteis',
      price: {
        'SP/RJ': 'R$ 40,00',
        'Outros': 'R$ 40,00',
      },
      features: [
        'Ideal para pedidos grandes ou frágeis',
        'Rastreamento completo',
        'Disponível para algumas regiões',
      ],
    },
  ];
  
  const shippingPolicies = [
    {
      title: 'Política de Remessa',
      description: 'Todos os produtos são enviados com discrição máxima. As embalagens não possuem identificação de conteúdo e são seladas de forma segura.',
    },
    {
      title: 'Combinação de Marcas',
      description: 'Alguns laboratórios exigem envio separado, o que pode resultar em fretes adicionais. Isso é indicado na página de cada marca.',
    },
    {
      title: 'Seguro Opcional',
      description: 'Oferecemos seguro de envio por um adicional de 20% sobre o valor total do pedido, garantindo proteção contra extravios ou danos.',
    },
    {
      title: 'Prazos de Entrega',
      description: 'Os prazos estimados começam a contar a partir da confirmação do pagamento. O envio ocorre em até 24h após essa confirmação.',
    },
  ];

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-imperio-navy mb-8">Informações de Frete</h1>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold text-imperio-navy mb-6">Opções de Envio</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shippingOptions.map((option, index) => (
                  <div 
                    key={index} 
                    className="imperio-card hover-lift p-6 flex flex-col h-full animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center mb-4">
                      {option.icon}
                      <h3 className="text-xl font-medium ml-3">{option.name}</h3>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Prazo estimado:</p>
                      <p className="font-medium">{option.deliveryTime}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Valor:</p>
                      <div className="space-y-1">
                        <p>
                          <span className="font-medium">SP/RJ:</span> {option.price['SP/RJ']}
                        </p>
                        <p>
                          <span className="font-medium">Outros estados:</span> {option.price['Outros']}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <p className="text-sm text-gray-500 mb-2">Características:</p>
                      <ul className="space-y-2">
                        {option.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle size={16} className="text-imperio-navy mr-2 flex-shrink-0 mt-1" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-imperio-navy mb-6">Políticas de Envio</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shippingPolicies.map((policy, index) => (
                  <div 
                    key={index} 
                    className="bg-imperio-extra-light-navy rounded-lg p-6 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-lg font-medium mb-3">{policy.title}</h3>
                    <p className="text-gray-700">{policy.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-imperio-navy mb-6">Perguntas Frequentes</h2>
              
              <div className="space-y-6 bg-white rounded-lg shadow-subtle p-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-medium mb-2">Como rastrear meu pedido?</h3>
                  <p className="text-gray-700">
                    Após o envio, você receberá o código de rastreamento por WhatsApp e email.
                    Utilize o código no site dos Correios ou transportadora para acompanhar seu pedido.
                  </p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-medium mb-2">O que acontece se eu não estiver em casa para receber?</h3>
                  <p className="text-gray-700">
                    Para Sedex e PAC, os Correios tentarão a entrega até 3 vezes. Após isso, o pacote ficará disponível 
                    na agência mais próxima por até 7 dias. No caso de transportadora, eles entrarão em contato para 
                    agendar uma nova entrega.
                  </p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-medium mb-2">Como é a embalagem dos produtos?</h3>
                  <p className="text-gray-700">
                    Todos os produtos são enviados em embalagens discretas, sem identificação do conteúdo ou da loja.
                    Utilizamos caixas ou envelopes reforçados, dependendo do tamanho do pedido, garantindo a privacidade 
                    e segurança dos seus produtos.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">O que fazer se meu produto for entregue danificado?</h3>
                  <p className="text-gray-700">
                    Se você contratou o seguro, entre em contato imediatamente por WhatsApp enviando fotos do produto
                    e da embalagem danificada. Caso não tenha contratado o seguro, também entre em contato, e analisaremos 
                    cada caso individualmente.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="bg-imperio-navy text-white rounded-lg p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <ShieldCheck size={64} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Seguro de Envio</h2>
                  <p className="mb-4">
                    Recomendamos a contratação do seguro de envio para uma proteção adicional da sua compra.
                    Por apenas 20% do valor total do pedido, você garante:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 flex-shrink-0 mt-1" />
                      <span>Cobertura contra extravios durante o transporte</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 flex-shrink-0 mt-1" />
                      <span>Proteção contra danos à mercadoria</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 flex-shrink-0 mt-1" />
                      <span>Reembolso total ou envio de um novo produto em caso de sinistro</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 flex-shrink-0 mt-1" />
                      <span>Processo de reembolso simplificado</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};
