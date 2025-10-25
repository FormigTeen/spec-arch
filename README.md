# Sistema de Quizzes e Compras — Arquitetura e Componentes

## Principais Características

### Disponibilidade
O sistema deve permanecer online de forma contínua para permitir que os usuários participem de quizzes e realizem compras. Como a interação de resposta ao quiz pode concentrar grande volume de acessos em janelas curtas, a disponibilidade torna-se crítica para evitar interrupções na experiência (principalmente em quiz com um tempo breve para encerramento) e perda de receita.

**Táticas:**
- Cadastro de health check em endpoints críticos para monitorar latência e disponibilidade.
- Cadastro de alertas para latências elevadas em endpoints críticos.

### Elasticidade
O envio de notificações pode provocar picos de tráfego. A arquitetura precisa escalar automaticamente (para cima e para baixo) a fim de absorver fluxos intensos de usuários em curtos períodos.

**Táticas:**
- Dados de analytics para rastrear e analisar o uso do usuário no sistema para identificar pontos críticos.
- Gráficos de observabilidade para ter visibilidade do uso dos recursos em momentos de pico.
- Camadas de cache nos recursos com maior potencial de uso para conteúdos com baixa taxa de modificação (CDN ou Redis).
- Desacoplamento de serviços críticos para hospedagem na nuvem que ofereçam escalabilidade horizontal (Google Functions, AWS Lambda, DO Functions, etc.).

### Manutenção
É essencial que a solução seja fácil de operar, mantendo baixo o custo de suporte ao longo do tempo e maximizando o ROI por meio de transações dos usuários. A adoção de módulos com responsabilidades claras, padronização de contratos e observabilidade aceleram correções e o suporte por ecossistema.

**Táticas:**
- Priorização de uso de contratos estáveis para implementação de serviços de domínio genéricos, como autenticação e gerenciamento de conteúdo (CMS), minimizando a carga de manutenção e o desenvolvimento de módulos genéricos.
- Uso de monitoramento de erros para alertas de falhas e, quando aplicável, registro de logs e captura de tracing para investigação (ex.: Sentry).
- Rotinas de CI/CD claras, simples e semi-automáticas para implantação eficiente de atualizações e reversões, suportadas por comandos ou ferramentas padronizadas do mercado.
- Criação de documentação suficiente para delimitar os módulos principais e indicar os passos necessários para verificar com eficiência a origem das falhas.

### Autenticação e Autorização
O sistema deve autenticar usuários e aplicar regras de autorização com perfis (por exemplo, usuário e administrador), atendendo aos requisitos explícitos de gestão de contas e acesso a informações gerenciais.

**Táticas:**
- Provedor gerenciado de autenticação para usuários finais a fim de reduzir manutenção e favorecer a escala; quando necessário, suportar outros tipos de login e provedores via OAuth2.
- Modularização por autorização para utilizar contextos de autenticação independentes, aplicando controle de ações pela localidade dos dados e seus escopos conforme os requisitos do sistema.

## Componentes Principais

### 1) CMS Administrativo — Strapi ou FireCMS
- Tipo: Serviço monolítico para gestão de conteúdo e administração. Centraliza CRUD de times, perguntas, respostas, quizzes e configurações.
- Autenticação de administradores: Módulo próprio do CMS para usuários administradores.
- Dados que possui: Catálogos (times/perguntas/respostas/quizzes) e metadados editoriais.
- Integrações: Expor API somente para o Sistema de Operações consumir conteúdo publicado; não atende usuários finais diretamente.
- Observação: Banco de dados acoplado ao CMS.

### 2) Notificações & Analytics — Firebase (Cloud Messaging + Analytics)
- Tipo: Serviço dedicado a envio de notificações e rastreamento de eventos de dispositivos/usuários.
- Responsabilidades: Notificações push (ex.: início de quiz), coleta de eventos (jogou, respondeu, finalizou), funis e públicos.
- Integrações: Sincroniza com a base de usuários finais do Provedor de Autenticação; recebe gatilhos do Sistema de Operações e do CMS.
- Dados que possui: Tokens de push, eventos de uso e atribuições de campanha.

### 3) Provedor de Autenticação (usuários finais) — Firebase Authentication
- Tipo: Módulo independente para autenticação e gestão de contas de usuários não administrativos.
- Responsabilidades: Cadastro/login, recuperação de senha, tokens de ID e perfis básicos.
- Integrações: FrontEnd (login), Sistema de Operações (autorização via ID), Notificações (tokens de push).
- Dados que possui: Credenciais, identificadores e atributos mínimos de perfil.

### 4) Provedor de Pagamentos — Abacate, Strip, Mercado Pago
- Tipo: Serviço especializado para criar, validar e conciliar transações (ex.: PIX), inclusive repasse de 30% ao vencedor.
- Responsabilidades: Ordens de pagamento, webhooks de confirmação, carteiras/saldo e relatórios financeiros.
- Integrações: Sistema de Operações (orquestra o fluxo), Analytics (eventos), CMS (parâmetros e regras comerciais, se necessário).
- Dados que possui: Transações, comprovantes e reconciliações.

### 5) Sistema de Operações (BFF/API & Core) — REST (ou Supabase como backend de dados)
- Tipo: Serviço monolítico de negócio que expõe a API ao FrontEnd e orquestra regras do domínio.
- Responsabilidades: Sessões de quiz (criar, responder, encerrar), ranking (geral/por time), convites por e-mail, agendamento de encerramento e agregação de dados para dashboards.
- Integrações: Lê conteúdo do CMS, autentica via Firebase Auth, chama Pagamentos e dispara Notificações.
- Dados que possui: Estado transacional do domínio (partidas, respostas, pontuações, rankings materializados).

### 6) FrontEnd — Ionic ou React Web (PWA)
- Tipo: Aplicação Web (PWA) para usuários e admins (áreas separadas).
- Responsabilidades: Jogar quiz, ver ranking, comprar créditos e receber notificações.
- Integrações: Consome Sistema de Operações (APIs), Firebase Auth (login), Pagamentos (checkout) e recebe push.
