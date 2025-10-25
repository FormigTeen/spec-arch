import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Deck,
  DefaultTemplate,
  Slide,
  FlexBox,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Stepper
} from 'spectacle';
import { Mermaid } from './components/Mermaid';
import { FiCheckSquare } from 'react-icons/fi';

// Tema flat global
const theme = {
  colors: {
    background: '#0f172a', // slate-900
    text: '#e5e7eb',       // zinc-200
    primary: '#38bdf8',    // sky-400
    secondary: '#94a3b8',  // slate-400
    accent: '#f59e0b',     // amber-500
    muted: '#334155',      // slate-700
  },
};

// Helpers de UI simples
const InfoBlock: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div
    style={{
      borderLeft: '6px solid currentColor',
      paddingLeft: '1em',
      margin: '0 0 1em 0',
      color: 'inherit',
      ...style,
    }}
  >
    {children}
  </div>
);

const SubSectionTitle: React.FC<React.PropsWithChildren<{ color?: string }>> = ({ children, color = '#F59E0B' }) => (
  <Heading fontSize="32px" color={color} margin="0 0 0.25em 0">{children}</Heading>
);

const NumberBadge: React.FC<{ n: number }> = ({ n }) => (
  <div
    style={{
      background: 'rgba(255,255,255,0.20)',
      color: '#ffffff',
      borderRadius: 10,
      padding: '0.05em 0.55em',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      marginRight: '0.6em',
      border: '1px solid rgba(255,255,255,0.25)',
      fontSize: 40,
    }}
  >
    {n}
  </div>
);

const Card: React.FC<React.PropsWithChildren<{ title: string; centerContent?: boolean; footer?: React.ReactNode }>> = ({ title, children, centerContent = false, footer }) => (
  <div
    style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 12,
      padding: '0.8em',
      height: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
    }}
  >
    <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', background: 'transparent', display: 'flex', alignItems: 'center', gap: 8 }}>
      <FiCheckSquare style={{ opacity: 0.9 }} />
      <span>{title}</span>
    </div>
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.14)', margin: '4px 0 8px 0' }} />
    {footer && (
      <div style={{ color: '#94a3b8', fontSize: 14, fontStyle: 'italic', margin: '0 0 2px 0', padding: '6px 2px' }}>
        {footer}
      </div>
    )}
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', margin: 0 }} />
    <div
      style={{
        fontSize: 16,
        color: '#ffffff',
        lineHeight: 1.6,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
        display: 'flex',
        flex: 1,
        alignItems: centerContent ? 'center' : 'flex-start',
        textAlign: 'justify',
        padding: '1px 0',
      }}
    >
      {children}
    </div>
  </div>
);

const TwoUpStepper: React.FC<{ items: React.ReactNode[] }> = ({ items }) => {
  const pages: React.ReactNode[][] = [];
  const arr = items.slice();
  if (arr.length % 2 !== 0) arr.push(null as any);
  for (let i = 0; i < arr.length; i += 2) pages.push([arr[i], arr[i + 1]]);

  return (
    <Stepper values={pages}>
      {(pair, step) => {
        const isSingle = !pair?.[1];
        return (
          <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isSingle ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,1fr)',
                  gap: '2rem',
                  width: '100%',
                  maxWidth: '100%',
                  padding: '0 3vw',
                  alignItems: 'stretch',
                  justifyItems: 'stretch',
                }}
              >
                <div style={{ minWidth: 0, display: 'flex' }}>{pair?.[0]}</div>
                {!isSingle && <div style={{ minWidth: 0, display: 'flex' }}>{pair?.[1]}</div>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {pages.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    border: '1px solid rgba(229,231,235,0.7)',
                    background: i === (step ?? 0) ? 'rgba(229,231,235,0.9)' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>
        );
      }}
    </Stepper>
  );
};

const Presentation = () => (
  <Deck template={() => <DefaultTemplate />} theme={theme}>
    <Slide backgroundColor="background">
      <FlexBox height="100%" alignItems="center" justifyContent="center" padding="2em" width="100%" flexDirection="column">
        <Heading textAlign="left" fontSize="64px" margin="0 0 0.2em 0" color="text">Sistema de Perguntas</Heading>
        <div style={{ width: 'min(900px, 90%)', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ color: '#e5e7eb', fontSize: 48, fontWeight: 800, lineHeight: 1, paddingRight: '4%' }}>Arquitetura</div>
        </div>
      </FlexBox>
    </Slide>


    {/* Principais Características - título (antes de Disponibilidade) */}
    <Slide>
      <FlexBox height="100%" alignItems="center" justifyContent="center">
        <Heading fontSize="56px" textAlign="center">Principais Características</Heading>
      </FlexBox>
    </Slide>

    {/* Disponibilidade */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="flex-start" justifyContent="flex-start" height="100%" padding="2em">
        <Heading fontSize="48px" color="primary">Disponibilidade</Heading>
        <InfoBlock>
          <Text fontSize="24px" margin="0">
            O sistema deve permanecer online de forma contínua para permitir que os usuários participem de quizzes e realizem compras. Como a interação de resposta ao quiz pode concentrar grande volume de acessos em janelas curtas, a disponibilidade torna-se crítica para evitar interrupções na experiência e perda de receita.
          </Text>
        </InfoBlock>
        <SubSectionTitle>Táticas</SubSectionTitle>
        <UnorderedList fontSize="22px">
          <ListItem>Cadastro de health check em endpoints críticos para monitorar latência e disponibilidade.</ListItem>
          <ListItem>Cadastro de alertas para latências elevadas em endpoints críticos.</ListItem>
        </UnorderedList>
      </FlexBox>
    </Slide>

      {/* Requisitos Base — Disponibilidade (2-up carousel) */}
      <Slide backgroundColor="background">
          <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
              <Heading fontSize="44px" color="accent" margin="0 0 0.6em 0" style={{ background: 'transparent' }}>Requisitos Base</Heading>
              <div style={{ flex: 1, display: 'flex' }}>
                  <TwoUpStepper
                      items={[
                          (
                              <Card title="REQ 06 — Disputar Quiz" centerContent footer={<span>O sistema deve permitir a disputa do Quiz pelo usuário. O usuário pode disputar um quiz de um time específico ou um quiz geral (com todos os times existentes na aplicação).</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      Não há uma previsibilidade clara de quando o usuário poderá realizar um quiz aberto.
                                  </Text>
                              </Card>
                          ),
                          (
                              <Card title="REQ 07 — Encerrar Quiz" centerContent footer={<span>O sistema deve permitir o encerramento do Quiz pelo usuário. Ao encerrar o quiz, se for finalizado pelo administrador, o usuário pode visualizar a sua pontuação no ranking. O quiz pode também ser encerrado pelo usuário ou pelo próprio sistema de acordo com um tempo pré-definido para realização do quiz.</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      Um sistema que fica indisponível durante o período de realização do quiz pode impactar diretamente na experiência do usuário principalmente em situações de janalas curtas de realização do quiz.
                                  </Text>
                              </Card>
                          ),
                          (
                              <Card title="REQ 12 — Dashboard questões" centerContent footer={<span>O sistema deve disponibilizar um dashboard com as perguntas que os usuários têm tido mais dificuldades para responder, assim como as mais demoradas.</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      Dados de Analytics podem ser impactados por indisponibilidade do sistema, o que pode prejudicar a geração de relatórios e insights.
                                  </Text>
                              </Card>
                          ),
                          (
                              <Card title="REQ 13 — Identificar Jogador mais rápido" centerContent footer={<span>O sistema deve identificar o jogador que finalizou o quiz de forma mais rápida com a maior pontuação.</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      Performance do usuário pode ser impactada por indisponibilidade do sistema, o que pode prejudicar a experiência do usuário e causar problemas legais em casos de recompensas financeiras.
                                  </Text>
                              </Card>
                          ),
                          (
                              <Card title="REQ 15 — Comprar créditos" centerContent footer={<span>O sistema deve permitir que usuários possam comprar créditos via PIX. Com os créditos comprados, o sistema deve permitir a criação de quizes com recompensa financeira para o vencedor. O vencedor recebe 30% do valor arrecadado.</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                        A indisponibilidade do sistema pode impactar diretamente na receita do negócio, uma vez que o usuário não conseguirá realizar compras de créditos e poderá prejudicar a reputação e confiança no sistema por parte dos usuários.
                                  </Text>
                              </Card>
                          ),
                      ]}
                  />
              </div>
          </FlexBox>
      </Slide>

    {/* Elasticidade */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="flex-start" justifyContent="flex-start" height="100%" padding="2em">
        <Heading fontSize="48px" color="primary">Elasticidade</Heading>
        <InfoBlock>
          <Text fontSize="24px" margin="0">
            O envio de notificações pode provocar picos de tráfego. A arquitetura precisa escalar automaticamente para absorver fluxos intensos de usuários em curtos períodos.
          </Text>
        </InfoBlock>
        <SubSectionTitle>Táticas</SubSectionTitle>
        <UnorderedList fontSize="22px">
          <ListItem>Dados de analytics para rastrear e analisar o uso do usuário e identificar pontos críticos.</ListItem>
          <ListItem>Gráficos de observabilidade para visibilidade do uso dos recursos em momentos de pico.</ListItem>
          <ListItem>Camadas de cache para conteúdos com baixa taxa de modificação (CDN ou Redis).</ListItem>
          <ListItem>Desacoplamento de serviços críticos com escalabilidade horizontal (Functions/Lambda, etc.).</ListItem>
        </UnorderedList>
      </FlexBox>
    </Slide>

    {/* Manutenção */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="flex-start" justifyContent="flex-start" height="100%" padding="2em">
        <Heading fontSize="48px" color="primary">Manutenção</Heading>
        <InfoBlock>
          <Text fontSize="24px" margin="0">
            É essencial que a solução seja fácil de operar, mantendo baixo o custo de suporte e maximizando o ROI por meio de transações dos usuários.
          </Text>
        </InfoBlock>
        <SubSectionTitle>Táticas</SubSectionTitle>
        <UnorderedList fontSize="22px">
          <ListItem>Contratos estáveis para serviços de domínio genéricos (ex.: autenticação e CMS).</ListItem>
          <ListItem>Monitoramento de erros, logs e tracing para investigação (ex.: Sentry).</ListItem>
          <ListItem>Rotinas de CI/CD claras, simples e semi-automáticas.</ListItem>
          <ListItem>Documentação suficiente dos módulos principais e passos de diagnóstico.</ListItem>
        </UnorderedList>
      </FlexBox>
    </Slide>

    {/* Autenticação e Autorização */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="flex-start" justifyContent="flex-start" height="100%" padding="2em">
        <Heading fontSize="48px" color="primary">Autenticação e Autorização</Heading>
        <InfoBlock>
          <Text fontSize="24px" margin="0">
            Autenticar usuários e aplicar regras de autorização com perfis (ex.: usuário e administrador), atendendo aos requisitos explícitos de gestão de contas e acesso a informações gerenciais.
          </Text>
        </InfoBlock>
        <SubSectionTitle>Táticas</SubSectionTitle>
        <UnorderedList fontSize="22px">
          <ListItem>Provedor gerenciado de autenticação para usuários finais; suporte a OAuth2 quando necessário.</ListItem>
          <ListItem>Modularização por autorização com contextos independentes e controle por escopo/localidade.</ListItem>
        </UnorderedList>
      </FlexBox>
    </Slide>

    {/* Componentes Principais - título */}
    <Slide>
      <FlexBox height="100%" alignItems="center" justifyContent="center">
        <Heading fontSize="56px" textAlign="center">Componentes Principais</Heading>
      </FlexBox>
    </Slide>

      {/* Diagrama de Componentes (Mermaid — simplificado e flat) */}
      <Slide>
          <FlexBox height="100%" width="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="1em">
              <Heading fontSize="40px" margin="0 0 0.5em 0">Diagrama de Componentes (GERAL)</Heading>
              <Mermaid
                  style={{ width: '100%', maxWidth: 1100, margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 12 }}
                  config={{ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'linear' } }}
                  chart={`
            flowchart TB
              %% Estilos flat
              classDef comp fill:transparent,stroke:#e5e7eb,stroke-width:2.5px,color:#e5e7eb
              classDef compCore fill:transparent,stroke:#e5e7eb,stroke-width:3px,color:#e5e7eb
              classDef db fill:transparent,stroke:#e5e7eb,stroke-width:2.5px,color:#e5e7eb

              %% Layout: três colunas lado a lado
              subgraph LAYOUT[ ]
                direction LR

                %% Coluna 1 (esquerda)
                subgraph C1[ ]
                  direction TB
                  CLI["Cliente"]:::comp
                  OPER["Operador"]:::compCore
                  DB_OPER[(Operador DB)]:::db
                end

                %% Coluna 2 (meio)
                subgraph C2[ ]
                  direction TB
                  AUTH["Auth"]:::comp
                  CMS["CMS"]:::comp
                  DB_CMS[(CMS DB)]:::db
                end

                %% Coluna 3 (direita)
                subgraph C3[ ]
                  direction TB
                  PAY["Pagamentos"]:::comp
                  NOTIF["Analytics"]:::comp
                end
              end
              style LAYOUT fill:transparent,stroke-width:0
              style C1 fill:transparent,stroke-width:0
              style C2 fill:transparent,stroke-width:0
              style C3 fill:transparent,stroke-width:0

              %% Conexões
              DB_OPER <--> OPER
              OPER <--> CLI
              CLI <-. Eventos .-> NOTIF
              OPER -. Eventos .-> NOTIF
              CLI <--> AUTH
              CMS --> CLI
              AUTH --> OPER
              CMS --> OPER
              OPER <--> PAY
              CMS <--> DB_CMS
          `}
              />
          </FlexBox>
      </Slide>

    {/* 1) CMS Administrativo */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
          <NumberBadge n={1} />
          <Heading fontSize="40px" color="primary" margin="0">CMS Administrativo</Heading>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%' }}>
          <Card title="Descrição">
            <UnorderedList fontSize="20px">
              <ListItem>Serviço monolítico para gestão de conteúdo e administração.</ListItem>
              <ListItem>Autenticação de administradores via módulo nativo do CMS.</ListItem>
              <ListItem>Catálogos (times/perguntas/respostas/quizzes) e metadados.</ListItem>
              <ListItem>Expõe API apenas para o Sistema de Operações.</ListItem>
              <ListItem>Banco de dados acoplado ao CMS.</ListItem>
            </UnorderedList>
          </Card>
          <Card title="Tecnologia Sugerida">
            <Text fontSize="22px">Strapi ou FireCMS</Text>
          </Card>
        </div>
      </FlexBox>
    </Slide>

    {/* 2) Notificações & Analytics */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
          <NumberBadge n={2} />
          <Heading fontSize="40px" color="primary" margin="0">Notificações & Analytics</Heading>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%' }}>
          <Card title="Descrição">
            <UnorderedList fontSize="20px">
              <ListItem>Envio de notificações e rastreamento de eventos.</ListItem>
              <ListItem>Push (início de quiz), coleta de eventos, funis e públicos.</ListItem>
              <ListItem>Integra com Auth (base usuários), BFF e CMS (gatilhos).</ListItem>
              <ListItem>Tokens de push, eventos e atribuições de campanha.</ListItem>
            </UnorderedList>
          </Card>
          <Card title="Tecnologia Sugerida">
            <Text fontSize="22px">Firebase</Text>
          </Card>
        </div>
      </FlexBox>
    </Slide>

    {/* 3) Provedor de Autenticação */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
          <NumberBadge n={3} />
          <Heading fontSize="40px" color="primary" margin="0">Provedor de Autenticação</Heading>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%' }}>
          <Card title="Descrição">
            <UnorderedList fontSize="20px">
              <ListItem>Módulo independente para autenticação e contas.</ListItem>
              <ListItem>Cadastro/login, recuperação de senha, tokens e perfis.</ListItem>
              <ListItem>Integra com FrontEnd (login), BFF (autz) e Notificações.</ListItem>
              <ListItem>Guarda credenciais, IDs e atributos mínimos de perfil.</ListItem>
            </UnorderedList>
          </Card>
          <Card title="Tecnologia Sugerida">
            <Text fontSize="22px">Firebase Auth</Text>
          </Card>
        </div>
      </FlexBox>
    </Slide>

    {/* 4) Provedor de Pagamentos */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
          <NumberBadge n={4} />
          <Heading fontSize="40px" color="primary" margin="0">Provedor de Pagamentos</Heading>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%' }}>
          <Card title="Descrição">
            <UnorderedList fontSize="20px">
              <ListItem>Cria, valida e concilia transações (ex.: PIX).</ListItem>
              <ListItem>Ordens, webhooks de confirmação, carteiras/saldo e relatórios.</ListItem>
              <ListItem>Integra com BFF (orquestra), Analytics (eventos) e CMS.</ListItem>
              <ListItem>Transações, comprovantes e reconciliações.</ListItem>
            </UnorderedList>
          </Card>
          <Card title="Tecnologia Sugerida">
            <Text fontSize="22px">Abacate, Stripe ou Mercado Pago</Text>
          </Card>
        </div>
      </FlexBox>
    </Slide>

    {/* 5) Sistema de Operações (BFF/API & Core) */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
          <NumberBadge n={5} />
          <Heading fontSize="40px" color="primary" margin="0">Sistema de Operações — BFF/API & Core</Heading>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%' }}>
          <Card title="Descrição">
            <UnorderedList fontSize="20px">
              <ListItem>Monólito de negócio que expõe a API ao FrontEnd.</ListItem>
              <ListItem>Sessões de quiz, ranking, convites, agendamentos e agregações.</ListItem>
              <ListItem>Lê CMS, autentica via Auth, chama Pagamentos e dispara Notificações.</ListItem>
              <ListItem>Estado transacional (partidas, respostas, pontuações, rankings).</ListItem>
            </UnorderedList>
          </Card>
          <Card title="Tecnologia Sugerida">
            <Text fontSize="22px">Node.js/Express, NestJS ou equivalente</Text>
          </Card>
        </div>
      </FlexBox>
    </Slide>

    {/* 6) FrontEnd */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
          <NumberBadge n={6} />
          <Heading fontSize="40px" color="primary" margin="0">FrontEnd</Heading>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%' }}>
          <Card title="Descrição">
            <UnorderedList fontSize="20px">
              <ListItem>Aplicação Web (PWA) para usuários e admins (áreas separadas).</ListItem>
              <ListItem>Jogar quiz, ver ranking, comprar créditos e receber pushes.</ListItem>
              <ListItem>Consome BFF/APIs, Auth (login), Pagamentos (checkout) e recebe push.</ListItem>
            </UnorderedList>
          </Card>
          <Card title="Tecnologia Sugerida">
            <Text fontSize="22px">Ionic ou React Web (PWA)</Text>
          </Card>
        </div>
      </FlexBox>
    </Slide>


    {/* Justificativas dos componentes críticos (separado do diagrama) */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="flex-start" justifyContent="flex-start" height="100%" padding="2em">
        <Heading fontSize="40px" color="primary">Componentes críticos — justificativa</Heading>
        <UnorderedList fontSize="22px">
          <ListItem><b>Operador</b>: centraliza regras, reduz acoplamento, facilita auditoria e cache.</ListItem>
          <ListItem><b>Auth gerenciado</b>: menor manutenção, segurança embutida, melhor escala.</ListItem>
          <ListItem><b>CMS headless</b>: acelera CRUD editorial e padroniza contratos.</ListItem>
          <ListItem><b>Pagamentos</b>: compliance e reconciliação com provedor especializado.</ListItem>
          <ListItem><b>Notificações/Analytics</b>: recebe eventos diretos do Cliente e do Operador para engajamento e visibilidade.</ListItem>
          <ListItem><b>DB Operador e DB CMS</b>: isolamento por contexto e estratégias de backup específicas.</ListItem>
        </UnorderedList>
      </FlexBox>
    </Slide>

    {/* Encerramento */}
    <Slide>
      <FlexBox height="100%" alignItems="center" justifyContent="center">
        <Heading fontSize="56px" textAlign="center">Fim</Heading>
      </FlexBox>
    </Slide>
  </Deck>
);

createRoot(document.getElementById('app')!).render(<Presentation />);
