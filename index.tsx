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
import { FiCheckSquare, FiFileText, FiCpu } from 'react-icons/fi';

// Tema flat global — acessível (alto contraste)
const theme = {
  colors: {
    background: '#0f172a', // slate-900
    text: '#F8FAFC',       // slate-50 (alto contraste)
    primary: '#F8FAFC',    // usar branco para títulos
    secondary: '#E2E8F0',  // slate-200 (contraste melhor que slate-400)
    accent: '#f59e0b',     // amber-500 (apenas ênfase/pouco texto)
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

// Divisor sutil para seções dentro dos cards
const CardDivider: React.FC = () => (
  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', margin: '8px 0 10px 0' }} />
);

// Layout auxiliar: seções em 2 colunas
const TwoColSections: React.FC<React.PropsWithChildren<{ gap?: string }>> = ({ children, gap = '1rem' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap }}>{children}</div>
);

// Grid de características: 3 colunas fixas (subcards com borda leve)
const FeatureGrid: React.FC<React.PropsWithChildren<{ gap?: string }>> = ({ children, gap = '0.75rem' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap, width: '100%', alignSelf: 'stretch' }}>{children}</div>
);

const FeatureItem: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div
    style={{
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 10,
      background: 'rgba(255,255,255,0.03)',
      padding: '0.6em 0.75em',
      minWidth: 0,
    }}
  >
    {children}
  </div>
);

// Card de Requisitos (mantém divisórias e footer)
const RequirementCard: React.FC<React.PropsWithChildren<{ title: string; centerContent?: boolean; footer?: React.ReactNode }>> = ({ title, children, centerContent = false, footer }) => (
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
    <div style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', background: 'transparent', display: 'flex', alignItems: 'center', gap: 8 }}>
      <FiCheckSquare style={{ opacity: 0.9 }} />
      <span>{title}</span>
    </div>
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.14)', margin: '4px 0 8px 0' }} />
    {footer && (
      <div style={{ color: '#E2E8F0', fontSize: 14, fontStyle: 'italic', margin: '0 0 2px 0', padding: '6px 2px' }}>
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

// Card de Módulos (ícone por props; sem divisórias/sem footer)
type IconTypeProp = React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
const ModuleCard: React.FC<React.PropsWithChildren<{ title: string; icon: IconTypeProp; centerContent?: boolean }>> = ({ title, icon: Icon, children, centerContent = false }) => (
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
      gap: 8,
    }}
  >
    <div style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', background: 'transparent', display: 'flex', alignItems: 'center', gap: 10 }}>
      <Icon size={22} style={{ opacity: 0.95 }} />
      <span>{title}</span>
    </div>
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
          <div style={{ color: '#F8FAFC', fontSize: 48, fontWeight: 800, lineHeight: 1, paddingRight: '4%' }}>Arquitetura</div>
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
                              <RequirementCard title="REQ 06 — Disputar quiz" centerContent footer={<span>O sistema deve permitir a disputa do quiz pelo usuário. O usuário pode disputar um quiz de um time específico ou um quiz geral (com todos os times existentes na aplicação).</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      Não há previsibilidade de quando um quiz ficará disponível para realização.
                                  </Text>
                              </RequirementCard>
                          ),
                          (
                              <RequirementCard title="REQ 07 — Encerrar quiz" centerContent footer={<span>O sistema deve permitir o encerramento do quiz pelo usuário. Ao encerrar o quiz, se for finalizado pelo administrador, o usuário pode visualizar sua pontuação no ranking. O quiz também pode ser encerrado pelo usuário ou automaticamente pelo sistema conforme o tempo definido para realização.</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      Um sistema indisponível durante o período do quiz impacta diretamente a experiência do usuário, especialmente em janelas curtas para realização.
                                  </Text>
                              </RequirementCard>
                          ),
                          (
                              <RequirementCard title="REQ 12 — Dashboard de questões" centerContent footer={<span>O sistema deve disponibilizar um dashboard com as perguntas de maior dificuldade e as que levam mais tempo para serem respondidas.</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      Dados analíticos podem ser impactados por indisponibilidade do sistema, o que pode prejudicar a geração de relatórios e insights.
                                  </Text>
                              </RequirementCard>
                          ),
                          (
                              <RequirementCard title="REQ 13 — Identificar o jogador mais rápido" centerContent footer={<span>O sistema deve identificar o jogador que finalizou o quiz mais rapidamente com a maior pontuação.</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      Performance do usuário pode ser impactada por indisponibilidade do sistema, o que pode prejudicar a experiência do usuário e causar problemas legais em casos de recompensas financeiras.
                                  </Text>
                              </RequirementCard>
                          ),
                          (
                              <RequirementCard title="REQ 15 — Comprar créditos" centerContent footer={<span>O sistema deve permitir que usuários comprem créditos via PIX. Com os créditos comprados, o sistema deve permitir a criação de quizzes com recompensa financeira para o vencedor. O vencedor recebe 30% do valor arrecadado.</span>}>
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                        A indisponibilidade do sistema pode impactar diretamente na receita do negócio, uma vez que o usuário não conseguirá realizar compras de créditos e poderá prejudicar a reputação e confiança no sistema por parte dos usuários.
                                  </Text>
                              </RequirementCard>
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

    {/* Requisitos Base — Elasticidade (2-up carousel) */}
    <Slide backgroundColor="background">
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <Heading fontSize="44px" color="accent" margin="0 0 0.6em 0" style={{ background: 'transparent' }}>Requisitos Base</Heading>
        <div style={{ flex: 1, display: 'flex' }}>
          <TwoUpStepper
            items={[
              (
                <RequirementCard
                  title="REQ 17 — Notificar usuário sobre novo quiz"
                  centerContent
                  footer={<span>O sistema deve notificar os usuários quando um quiz for iniciado.</span>}
                >
                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                      Esse requisito pode gerar picos de tráfego significativos em um curto período de tempo porque promove a interação dos usuários com o sistema de forma simultânea.
                  </Text>
                </RequirementCard>
              ),
              (
                <RequirementCard
                  title="REQ 09 — Login no sistema"
                  centerContent
                  footer={<span>O sistema deve permitir que o usuário efetue login no sistema.</span>}
                >
                    <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                        Durante períodos de pico, muitos usuários podem tentar acessar o sistema simultaneamente.<br />
                        A falta de elasticidade pode causar falhas de sessão e desconexões em massa, prejudicando a experiência do usuário.
                    </Text>
                </RequirementCard>
              ),
              (
                <RequirementCard
                  title="REQ 07 — Encerrar quiz"
                  centerContent
                  footer={<span>O sistema deve permitir o encerramento do quiz pelo usuário. Ao encerrar, se for finalizado pelo administrador, o usuário pode visualizar sua pontuação no ranking. O quiz também pode ser encerrado pelo usuário ou automaticamente pelo sistema conforme o tempo definido para realização.</span>}
                >
                    <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                        Janelas curtas de realização do quiz podem levar a alto fluxo de usuários.<br />
                        Usuários podem enfrentar lentidão ou falhas ao tentar encerrar quizzes se o sistema não for elástico o suficiente.
                    </Text>
                </RequirementCard>
              ),
            ]}
          />
        </div>
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

      {/* Requisitos Base — Manutenção (2-up carousel) */}
      <Slide backgroundColor="background">
          <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
              <Heading fontSize="44px" color="accent" margin="0 0 0.6em 0" style={{ background: 'transparent' }}>Requisitos Base</Heading>
              <div style={{ flex: 1, display: 'flex' }}>
                  <TwoUpStepper
                      items={[
                          (
                              <RequirementCard
                                  title="REQ 01 — Manter Usuário"
                                  centerContent
                                  footer={<span>O sistema deve permitir a manutenção de usuários (inclusão, alteração, exclusão e consulta) para acesso ao sistema.</span>}
                              >
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      O requisito indica a necessidade de um sistema simples de operar, permitindo que administradores gerenciem usuários sem intervenção técnica.
                                  </Text>
                              </RequirementCard>
                          ),
                          (
                              <RequirementCard
                                  title="REQ 03 — Cadastrar Time"
                                  centerContent
                                  footer={<span>O sistema deve permitir o cadastro de times pelo usuário (administrador).</span>}
                              >
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      A capacidade de adicionar conteúdo sem necessidade de conhecimento técnico reforça a intenção de facilitar a operação do sistema, sem depender de alterações no código-fonte.
                                  </Text>
                              </RequirementCard>
                          ),
                          (
                              <RequirementCard
                                  title="REQ 04 — Cadastrar Pergunta"
                                  centerContent
                                  footer={<span>O sistema deve permitir o cadastro de perguntas pelo usuário (administrador).</span>}
                              >
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      A capacidade de adicionar conteúdo sem necessidade de conhecimento técnico reforça a intenção de facilitar a operação do sistema, sem depender de alterações no código-fonte.
                                  </Text>
                              </RequirementCard>
                          ),
                          (
                              <RequirementCard
                                  title="REQ 05 — Cadastrar Resposta"
                                  centerContent
                                  footer={<span>O sistema deve permitir o cadastro de respostas pelo usuário (administrador), dada uma questão definida.</span>}
                              >
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                      A capacidade de adicionar conteúdo sem a necessidade de conhecimento técnico promove justifica a intenção de facilitar a operação do sistema sem necessitar de alterações no código-fonte.
                                  </Text>
                              </RequirementCard>
                          ),
                          (
                              <RequirementCard
                                  title="REQ 15 — Comprar créditos"
                                  centerContent
                                  footer={<span>O sistema deve permitir que usuários possam comprar créditos via PIX. Com os créditos comprados, o sistema deve permitir a criação de quizzes com recompensa financeira para o vencedor. O vencedor recebe 30% do valor arrecadado.</span>}
                              >
                                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                                        Um baixo custo de desenvolvimento e manutenção aumenta o ROI do sistema.
                                  </Text>
                              </RequirementCard>
                          ),
                      ]}
                  />
              </div>
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


    {/* Requisitos Base — Autenticação e Autorização (2-up carousel) */}
    <Slide backgroundColor="background">
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <Heading fontSize="44px" color="accent" margin="0 0 0.6em 0" style={{ background: 'transparent' }}>Requisitos Base</Heading>
        <div style={{ flex: 1, display: 'flex' }}>
          <TwoUpStepper
            items={[
              (
                <RequirementCard
                  title="REQ 01 — Manter Usuário"
                  centerContent
                  footer={<span>O sistema deve permitir a manutenção de usuários (inclusão, alteração, exclusão e consulta) para acesso ao sistema.</span>}
                >
                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                    A gestão de usuários é um requisito administrativo, o que torna necessário uma arquitetura com controle de acesso baseado em perfis.
                  </Text>
                </RequirementCard>
              ),
              (
                <RequirementCard
                  title="REQ 02 — Recuperar Senha"
                  centerContent
                  footer={<span>O sistema deve permitir que o usuário possa recuperar a senha de acesso ao sistema.</span>}
                >
                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                    A recuperação de senha é uma funcionalidade típica de sistemas com autenticação de usuários, o que reforça a necessidade de uma arquitetura que suporte autenticação.
                  </Text>
                </RequirementCard>
              ),
              (
                <RequirementCard
                  title="REQ 09 — Login no sistema"
                  centerContent
                  footer={<span>O sistema deve permitir que o usuário efetue login no sistema.</span>}
                >
                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                    O requisito de login é fundamental para autenticar usuários, o que implica a necessidade de uma arquitetura que suporte à autenticação.
                  </Text>
                </RequirementCard>
              ),
              (
                <RequirementCard
                  title="REQ 10 — Logout do sistema"
                  centerContent
                  footer={<span>O sistema deve permitir que o usuário efetue logout no sistema.</span>}
                >
                  <Text fontSize="16px" style={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
                    O requisito de logout é essencial para a segurança e o controle de sessões dos usuários, reforçando a necessidade de uma arquitetura que suporte à autenticação.
                  </Text>
                </RequirementCard>
              ),
            ]}
          />
        </div>
      </FlexBox>
    </Slide>

    {/* Componentes Principais - título */}
    <Slide>
      <FlexBox height="100%" alignItems="center" justifyContent="center">
        <Heading fontSize="56px" textAlign="center">Componentes Principais</Heading>
      </FlexBox>
    </Slide>

      <Slide>
          <FlexBox height="100%" width="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="1em">
              <Heading fontSize="40px" margin="0 0 0.5em 0">Diagrama Geral de Componentes</Heading>
              <Mermaid
                  className="mermaid-fit-height"
                  style={{ width: '100%', maxWidth: 1100, margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 12, overflow: 'hidden' }}
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
        <div style={{ margin: '0 0 1em 0' }}>
          <Text fontSize="18px" margin="0">Sistema de gerenciamento de conteúdo (quizzes, perguntas, respostas e times).</Text>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1em', width: '100%' }}>
          <ModuleCard title="Principais Características" icon={FiCpu}>
            <FeatureGrid>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Arquitetura</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                  <ListItem>Monólito e Opinativo</ListItem>
                  <ListItem>Banco de dados acoplado</ListItem>
                  <ListItem>Kernel para extensão</ListItem>
                </UnorderedList>
              </FeatureItem>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Especificações</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                  <ListItem>Elasticidade opcional</ListItem>
                  <ListItem>Extensões de cache</ListItem>
                  <ListItem>CRUD de conteúdo</ListItem>
                </UnorderedList>
              </FeatureItem>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Manutenção</div>
                  <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                      <ListItem>Tipo de domínio genérico</ListItem>
                      <ListItem>Amplamente adotado</ListItem>
                      <ListItem>Ecossistema maduro</ListItem>
                </UnorderedList>
              </FeatureItem>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Dependências</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                  <ListItem>Provedor de conteúdo</ListItem>
                  <ListItem>Dependente do banco de dados</ListItem>
                </UnorderedList>
              </FeatureItem>
            </FeatureGrid>
          </ModuleCard>
        </div>
      </FlexBox>
    </Slide>

      <Slide>
          <FlexBox height="100%" width="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="1em">
              <Heading fontSize="40px" margin="0 0 0.5em 0" style={{ textAlign: 'center', width: '100%' }}>Diagrama do CMS</Heading>
              <div style={{ width: 820, maxWidth: '100%', margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 12 }}>
                <Mermaid
                    className="mermaid-natural"
                    style={{ display: 'block', width: '100%' }}
                    config={{ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: false, htmlLabels: false, curve: 'linear' } }}
                    chart={`
            %%{init: {"themeCSS": ".cluster text{fill:#F8FAFC;transform:translateY(4px)} .cluster rect{stroke:#F8FAFC}"}}%%
            flowchart TB
              %% Estilos
              classDef comp fill:transparent,stroke:#F8FAFC,stroke-width:2.5px,color:#F8FAFC
              classDef compCore fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC
              classDef db fill:transparent,stroke:#F8FAFC,stroke-width:2.5px,color:#F8FAFC

              %% Topo: Banco do CMS acima do CMS
              subgraph TOP[ ]
                direction LR
                DB_CMS[(CMS DB)]:::db
                CACHE[(Cache)]:::db
              end
              style TOP fill:transparent,stroke-width:0

              %% Nós externos
              CLI["Cliente"]:::comp
              OPER["Operador"]:::compCore
              style CACHE stroke-dasharray: 8 5

              %% CMS com módulos internos
              subgraph CMS["CMS"]
                direction TB
                subgraph ROW1[ ]
                  direction LR
                  Q["Quizes"]:::comp
                  R["Respostas"]:::comp
                end
                subgraph ROW2[ ]
                  direction LR
                  T["Times"]:::comp
                  P["Perguntas"]:::comp
                end
                subgraph ROW3[ ]
                  direction LR
                  A["Autenticação de Admin"]:::comp
                  FE["FrontEnd do CMS"]:::comp
                end
              end
              style ROW1 fill:transparent,stroke-width:0
              style ROW2 fill:transparent,stroke-width:0
              style ROW3 fill:transparent,stroke-width:0
              style CMS fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC

              %% Conexões
              CMS --> CLI
              CMS --> OPER
              CMS <--> DB_CMS
              CMS <-.-> CACHE
          `}
                />
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
        <div style={{ margin: '0 0 1em 0' }}>
          <Text fontSize="18px" margin="0">Sistema para exibição de dados analíticos, rastreamento de uso e envio de notificações.</Text>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1em', width: '100%' }}>
          <ModuleCard title="Principais Características" icon={FiCpu}>
              <FeatureGrid>
                  <FeatureItem>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Arquitetura</div>
                      <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                          <ListItem>Serviço gerenciado</ListItem>
                          <ListItem>Banco de dados gerenciado</ListItem>
                      </UnorderedList>
                  </FeatureItem>
                  <FeatureItem>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Manutenção</div>
                      <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                          <ListItem>Tipo de domínio genérico</ListItem>
                          <ListItem>Amplamente adotado</ListItem>
                          <ListItem>Gerenciado</ListItem>
                      </UnorderedList>
                  </FeatureItem>
                  <FeatureItem>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Integração</div>
                      <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                          <ListItem>Comunicação por API</ListItem>
                          <ListItem>Plugin/Pacote/Driver</ListItem>
                          <ListItem>Desacoplado e independente</ListItem>
                      </UnorderedList>
                  </FeatureItem>
              </FeatureGrid>
          </ModuleCard>
        </div>
      </FlexBox>
    </Slide>

      <Slide>
          <FlexBox height="100%" width="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="1em">
              <Heading fontSize="40px" margin="0 0 0.5em 0" style={{ textAlign: 'center', width: '100%' }}>Diagrama de Notificações/Analytics</Heading>
              {/* Container flex para o diagrama ocupar o espaço restante e centralizar horizontalmente */}
              <div style={{ flex: '1 1 0', minHeight: 0, display: 'flex', justifyContent: 'center' }}>
                <Mermaid
                    className="mermaid-fit-height"
                    style={{
                      height: '100%',
                      maxHeight: '100%',
                      display: 'block',
                      margin: '0 auto',
                      boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 12,
                      padding: 12,
                    }}
                    config={{ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'linear' } }}
                    chart={`
            %%{init: {"themeCSS": ".cluster text{fill:#F8FAFC;transform:translateY(4px)} .cluster rect{stroke:#F8FAFC}"}}%%
            flowchart TB
              %% Estilos
              classDef comp fill:transparent,stroke:#F8FAFC,stroke-width:2.5px,color:#F8FAFC
              classDef compCore fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC

              %% Nós externos
              CLI["Cliente"]:::comp
              OPER["Operador"]:::compCore

              %% Analytics com submódulos internos
              subgraph ANALYTICS["Analytics"]
                direction TB
                subgraph ROW1[ ]
                  direction LR
                  DASH["Dashboard"]:::comp
                  SCHED["Agendador"]:::comp
                end
              end
              style ROW1 fill:transparent,stroke-width:0
              style ANALYTICS fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC

              %% Conexões simplificadas
              ANALYTICS <--> CLI
              ANALYTICS <--> OPER
          `}
                />
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
        <div style={{ margin: '0 0 1em 0' }}>
          <Text fontSize="18px" margin="0">
              Serviço gerenciado de autenticação e autorização de usuários finais, com suporte a perfis e recuperação de credenciais.
          </Text>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1em', width: '100%' }}>
          <ModuleCard title="Principais Características" icon={FiCpu}>
            <FeatureGrid>
                <FeatureItem>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Arquitetura</div>
                    <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                        <ListItem>Serviço gerenciado</ListItem>
                        <ListItem>Banco de dados gerenciado</ListItem>
                    </UnorderedList>
                </FeatureItem>
                <FeatureItem>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Manutenção</div>
                    <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                        <ListItem>Tipo de domínio genérico</ListItem>
                        <ListItem>Amplamente adotado</ListItem>
                        <ListItem>Gerenciado</ListItem>
                    </UnorderedList>
                </FeatureItem>
                <FeatureItem>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Integração</div>
                    <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                        <ListItem>Comunicação por API</ListItem>
                        <ListItem>Plugin/Pacote/Driver</ListItem>
                          <ListItem>Desacoplado e independente</ListItem>
                    </UnorderedList>
                </FeatureItem>
            </FeatureGrid>
          </ModuleCard>
        </div>
      </FlexBox>
    </Slide>
      <Slide>
          <FlexBox height="100%" width="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="1em">
              <Heading fontSize="40px" margin="0 0 0.5em 0">Diagrama do Provedor de Autenticação</Heading>
              <Mermaid
                  className="mermaid-fit-height"
                  style={{
                    height: '100%',
                    maxHeight: '100%',
                    display: 'block',
                    margin: '0 auto',
                    boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    padding: 12,
                  }}
                  config={{ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'linear' } }}
                  chart={`
            %%{init: {"themeCSS": ".cluster text{fill:#F8FAFC;transform:translateY(4px)} .cluster rect{stroke:#F8FAFC}"}}%%
            flowchart TB
              %% Estilos simplificados (como Notificações/Analytics)
              classDef comp fill:transparent,stroke:#F8FAFC,stroke-width:2.5px,color:#F8FAFC
              classDef compCore fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC

              %% Nós externos
              CLI["Cliente"]:::comp
              OPER["Operador"]:::compCore

              %% Auth com submódulos internos
              subgraph AUTH["Auth"]
                direction TB
                subgraph ROW1[ ]
                  direction LR
                  DBUS["Banco de Usuários Finais"]:::comp
                  CAD["Cadastro"]:::comp
                end
                subgraph ROW2[ ]
                  direction LR
                  LOGIN["Login com Senha"]:::comp
                  REC["Recuperação de Senha"]:::comp
                end
              end
              style ROW1 fill:transparent,stroke-width:0
              style ROW2 fill:transparent,stroke-width:0
              style AUTH fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC

              %% Conexões simplificadas
              AUTH <--> CLI
              AUTH <--> OPER
          `}
              />
          </FlexBox>
      </Slide>

    {/* 4) Provedor de Pagamentos */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
          <NumberBadge n={4} />
          <Heading fontSize="40px" color="primary" margin="0">Provedor de Pagamentos</Heading>
        </div>
        <div style={{ margin: '0 0 1em 0' }}>
          <Text fontSize="18px" margin="0">Provedor terceirizado de pagamentos com confirmação e reconciliação financeira.</Text>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1em', width: '100%' }}>
          <ModuleCard title="Principais Características" icon={FiCpu}>
            <FeatureGrid>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Arquitetura</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                  <ListItem>Serviço gerenciado</ListItem>
                  <ListItem>Webhooks idempotentes</ListItem>
                </UnorderedList>
              </FeatureItem>
                <FeatureItem>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Manutenção</div>
                    <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                        <ListItem>Tipo de domínio genérico</ListItem>
                        <ListItem>SLA e suporte do provedor</ListItem>
                        <ListItem>Atualizações automáticas</ListItem>
                    </UnorderedList>
                </FeatureItem>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Custos</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                  <ListItem>Taxas por transação</ListItem>
                  <ListItem>Aumenta segurança e confiabilidade</ListItem>
                </UnorderedList>
              </FeatureItem>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Integração</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                  <ListItem>API/SDK de pagamentos</ListItem>
                  <ListItem>Eventos via webhooks</ListItem>
                </UnorderedList>
              </FeatureItem>
            </FeatureGrid>
          </ModuleCard>
        </div>
      </FlexBox>
    </Slide>

      <Slide>
          <FlexBox height="100%" width="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="1em">
              <Heading fontSize="40px" margin="0 0 0.5em 0">Diagrama do Provedor de Pagamento</Heading>
              <Mermaid
                  className="mermaid-fit-height"
                  style={{ width: '100%', maxWidth: 1100, margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 12, overflow: 'hidden' }}
                  config={{ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'linear' } }}
                  chart={`
            %%{init: {"themeCSS": ".cluster text{fill:#F8FAFC;transform:translateY(4px)} .cluster rect{stroke:#F8FAFC}"}}%%
            flowchart TB
              %% Estilos simplificados (como Notificações/Analytics)
              classDef comp fill:transparent,stroke:#F8FAFC,stroke-width:2.5px,color:#F8FAFC
              classDef compCore fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC

              %% Nó externo
              OPER["Operador"]:::compCore

              %% Pagamentos com submódulos internos
              subgraph PAY["Pagamentos"]
                direction TB
                subgraph ROW1[ ]
                  direction LR
                  BANK["Banco de Transações"]:::comp
                  VALID["Validador de Transações"]:::comp
                end
                subgraph ROW2[ ]
                  direction LR
                  EMIT["Emissor de Eventos"]:::comp
                  ANTI["Anti-Fraude"]:::comp
                end
                subgraph ROW3[ ]
                  direction LR
                  DASH["Dashboard"]:::comp
                end
              end
              style ROW1 fill:transparent,stroke-width:0
              style ROW2 fill:transparent,stroke-width:0
              style ROW3 fill:transparent,stroke-width:0
              style PAY fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC

              %% Conexões simplificadas
              PAY <--> OPER
          `}
              />
          </FlexBox>
      </Slide>

    {/* 5) Sistema de Operações (BFF/API & Core) */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
          <NumberBadge n={5} />
          <Heading fontSize="40px" color="primary" margin="0">Sistema de Operações — BFF/API & Core</Heading>
        </div>
        <div style={{ margin: '0 0 1em 0' }}>
          <Text fontSize="18px" margin="0">Serviço núcleo do negócio, centraliza as regras de negócio e integra com outros serviços.</Text>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1em', width: '100%' }}>
          <ModuleCard title="Principais Características" icon={FiCpu}>
            <FeatureGrid>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Arquitetura</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                  <ListItem>Monólito modular</ListItem>
                    <ListItem>Módulos desacoplados por domínio</ListItem>
                    <ListItem>Banco de dados próprio</ListItem>
                </UnorderedList>
              </FeatureItem>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Especificações</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                    <ListItem>Permitir extração para microserviços</ListItem>
                    <ListItem>API first</ListItem>
                    <ListItem>Observabilidade (logs, métricas, traces)</ListItem>
                    <ListItem>Monitoramento (alerta de erros)</ListItem>
                </UnorderedList>
              </FeatureItem>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Dependências</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                    <ListItem>Tipo de domínio principal</ListItem>
                    <ListItem>Acoplado a serviços externos</ListItem>
                    <ListItem>Desacoplado a serviços/módulos internos</ListItem>
                </UnorderedList>
              </FeatureItem>
            </FeatureGrid>
          </ModuleCard>
        </div>
      </FlexBox>
    </Slide>

      <Slide>
          <FlexBox height="100%" width="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="1em">
              <Heading fontSize="40px" margin="0 0 0.5em 0">Diagrama do Operador</Heading>
              <Mermaid
                  className="mermaid-fit-height"
                  style={{ width: '100%', maxWidth: 1100, margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 12, overflow: 'hidden' }}
                  config={{ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'linear' } }}
                  chart={`
            %%{init: {"themeCSS": ".cluster text{fill:#F8FAFC;transform:translateY(4px)} .cluster rect{stroke:#F8FAFC}"}}%%
            flowchart TB
              %% Estilos simplificados
              classDef comp fill:transparent,stroke:#F8FAFC,stroke-width:2.5px,color:#F8FAFC
              classDef compCore fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC
              classDef db fill:transparent,stroke:#F8FAFC,stroke-width:2.5px,color:#F8FAFC

              %% Nós externos essenciais
              CLI["Cliente"]:::comp
              AUTH["Auth"]:::comp
              PAY["Pagamentos"]:::comp
              NOTIF["Analytics"]:::comp
              DB_OPER[(Operador DB)]:::db
              MSA["Micro-serviço A"]:::comp
              CMS["CMS"]:::comp

              %% Operador com submódulos internos
              subgraph OPER["Operador"]
                direction TB
                subgraph ROW0[ ]
                  direction LR
                  PROXY["Proxy A"]:::comp
                end
                subgraph ROW1[ ]
                  direction LR
                  ABQ["Abertura de Quiz"]:::comp
                  FEQ["Fechamento de Quiz"]:::comp
                end
                subgraph ROW2[ ]
                  direction LR
                  SEQ["Sessão de Quiz"]:::comp
                  PONT["Pontuações"]:::comp
                end
                subgraph ROW3[ ]
                  direction LR
                  CONV["Convites"]:::comp
                  MAT["Rotinas de\nMaterialização de\nDashboard"]:::comp
                end
                subgraph ROW4[ ]
                  direction LR
                  CT["Criar Transações"]:::comp
                  RT["Receptor de Transações"]:::comp
                end
              end
              style ROW0 fill:transparent,stroke-width:0
              style ROW1 fill:transparent,stroke-width:0
              style ROW2 fill:transparent,stroke-width:0
              style ROW3 fill:transparent,stroke-width:0
              style ROW4 fill:transparent,stroke-width:0
              style OPER fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC
              %% Nós tracejados
              style PROXY stroke-dasharray: 8 5
              style MSA stroke-dasharray: 8 5

              %% Conexões somente do Operador
              DB_OPER <--> OPER
              OPER <--> CLI
              OPER <--> AUTH
              OPER <--> PAY
              OPER -. Eventos .-> NOTIF
              CMS --> OPER
              %% Conexão direta entre Proxy (interno) e Micro-serviço A (externo)
              PROXY <--> MSA
          `}
              />
          </FlexBox>
      </Slide>

    {/* 6) FrontEnd */}
    <Slide>
      <FlexBox flexDirection="column" alignItems="stretch" justifyContent="flex-start" height="100%" padding="2em">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5em' }}>
          <NumberBadge n={6} />
          <Heading fontSize="40px" color="primary" margin="0">FrontEnd</Heading>
        </div>
        <div style={{ margin: '0 0 1em 0' }}>
          <Text fontSize="18px" margin="0">Aplicação PWA para usuários finais, integrada aos serviços.</Text>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1em', width: '100%' }}>
          <ModuleCard title="Principais Características" icon={FiCpu}>
            <FeatureGrid>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Arquitetura</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                  <ListItem>Camadas por especialização</ListItem>
                  <ListItem>Módulos por tela</ListItem>
                  <ListItem>Componentização e reutilização</ListItem>
                </UnorderedList>
              </FeatureItem>
              <FeatureItem>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Dependências</div>
                <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                  <ListItem>Acoplado aos serviços (sem gateway)</ListItem>
                  <ListItem>Depende da conexão do usuário (100% online)</ListItem>
                  <ListItem>Autenticação (OAuth/JWT)</ListItem>
                  <ListItem>Integração com API/BFF por HTTPS</ListItem>
                </UnorderedList>
              </FeatureItem>
                <FeatureItem>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Especificações</div>
                    <UnorderedList fontSize="18px" style={{ marginTop: 4 }}>
                        <ListItem>Tipo de dominío principal</ListItem>
                        <ListItem>PWA instalável (Service Worker)</ListItem>
                        <ListItem>Cache offline para telas críticas</ListItem>
                        <ListItem>Responsividade (mobile first)</ListItem>
                        <ListItem>Telemetria e monitoramento</ListItem>
                    </UnorderedList>
                </FeatureItem>
            </FeatureGrid>
          </ModuleCard>
        </div>
      </FlexBox>
    </Slide>

      <Slide>
          <FlexBox height="100%" width="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="1em">
              <Heading fontSize="40px" margin="0 0 0.5em 0">Diagrama do Cliente</Heading>
              <Mermaid
                  className="mermaid-fit-height"
                  style={{ width: '100%', maxWidth: 1100, margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 12, overflow: 'hidden' }}
                  config={{ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'linear' } }}
                  chart={`
            %%{init: {"themeCSS": ".cluster text{fill:#F8FAFC;transform:translateY(4px)} .cluster rect{stroke:#F8FAFC}"}}%%
            flowchart TB
              %% Estilos simplificados
              classDef comp fill:transparent,stroke:#F8FAFC,stroke-width:2.5px,color:#F8FAFC
              classDef compCore fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC

              %% Nós externos essenciais
              AUTH["Auth"]:::comp
              CMS["CMS"]:::comp
              OPER["Operador"]:::compCore
              ANALYTICS["Analytics"]:::comp

              %% Cliente com submódulos internos
              subgraph CLI["Cliente"]
                direction TB
                subgraph ROW1[ ]
                  direction LR
                  AUT["Autenticação"]:::comp
                  CAD["Cadastro"]:::comp
                end
                subgraph ROW2[ ]
                  direction LR
                  RANK["Rankings"]:::comp
                  LQUIZ["Lista de Quiz"]:::comp
                end
                subgraph ROW3[ ]
                  direction LR
                  SQUIZ["Sessão de Quiz"]:::comp
                  LTEAM["Lista de Times"]:::comp
                end
                subgraph ROW4[ ]
                  direction LR
                  CPAY["Criação de Pagamento"]:::comp
                  CONF["Confirmação de Pagamento"]:::comp
                end
                subgraph ROW5[ ]
                  direction LR
                  DASH["Dashboard"]:::comp
                end
              end
              style ROW1 fill:transparent,stroke-width:0
              style ROW2 fill:transparent,stroke-width:0
              style ROW3 fill:transparent,stroke-width:0
              style ROW4 fill:transparent,stroke-width:0
              style ROW5 fill:transparent,stroke-width:0
              style CLI fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC

              %% Conexões simplificadas (somente Cliente)
              CLI <--> AUTH
              CLI <--> CMS
              CLI <--> OPER
              CLI <--> ANALYTICS
          `}
              />
          </FlexBox>
      </Slide>

      <Slide>
          <FlexBox height="100%" width="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-start" padding="1em">
              <Heading fontSize="40px" margin="0 0 0.5em 0">Diagrama ( DDD )</Heading>
              <Mermaid
                  className="mermaid-fit-height"
                  style={{ width: '100%', maxWidth: 1100, margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 12, overflow: 'hidden' }}
                  config={{ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { useMaxWidth: true, htmlLabels: false, curve: 'linear' } }}
                  chart={`
            %%{init: {"themeCSS": ".cluster text{fill:#F8FAFC;transform:translateY(4px)} .cluster rect{stroke:#F8FAFC;rx:200;ry:200}"}}%%
            flowchart LR
              %% Estilos
              classDef comp fill:transparent,stroke:#F8FAFC,stroke-width:2.5px,color:#F8FAFC

              %% Dois círculos (clusters com bordas arredondadas) lado a lado
              subgraph PRINCIPAL["Principal"]
                direction TB
                OP{{Operador}}:::comp
                CLI{{Cliente}}:::comp
              end
              subgraph GENERICO["Genérico"]
                direction TB
                CMS{{CMS}}:::comp
                AN{{Analytics}}:::comp
                AU{{Auth}}:::comp
                PAY{{Pagamento}}:::comp
              end
              style PRINCIPAL fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC
              style GENERICO fill:transparent,stroke:#F8FAFC,stroke-width:3px,color:#F8FAFC
          `}
              />
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
