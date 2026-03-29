# 🏋️ ForceTrack — Personal Pro

Sistema de gestão de treinos para personal trainers. Permite cadastrar alunos, montar fichas de treino, acompanhar cargas e evolução física, tudo em uma interface dark/light profissional.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Rodar](#como-rodar)
- [Usuários de Teste](#usuários-de-teste)
- [Páginas e Módulos](#páginas-e-módulos)
- [Contextos e Estado](#contextos-e-estado)
- [Tema e Estilo](#tema-e-estilo)
- [Próximos Passos](#próximos-passos)

---

## Visão Geral

O **ForceTrack** é um sistema frontend desenvolvido em React + TypeScript com dados mockados (sem backend). Cada personal trainer tem sua conta, visualiza apenas seus próprios alunos e pode gerenciar fichas de treino, acompanhar progressão de cargas e evolução de medidas corporais.

---

## Funcionalidades

### Autenticação
- Login com usuário e senha
- Sessão mantida em memória durante o uso
- Logout disponível no sidebar e na página de perfil

### Dashboard
- Saudação dinâmica baseada no horário (Bom dia / Boa tarde / Boa noite)
- Cards de estatísticas: alunos ativos, treinos na semana, total de registros e humor médio
- Lista de alunos do personal logado
- Feed de treinos recentes
- Todos os dados filtrados pelo personal logado

### Alunos (CRUD completo)
- Listagem em cards com objetivo, nível, IMC e último treino
- Cadastro de novo aluno com validação de campos
- Edição de qualquer dado do aluno
- Exclusão com confirmação (remove também fichas associadas)
- Detalhe do aluno com fichas de treino e histórico de cargas
- Toast de feedback em todas as operações

### Fichas de Treino (CRUD completo)
- Seleção de aluno para gerenciar fichas
- Criação de nova ficha com: nome, tipo (A/B/C/D), foco, dias da semana
- Exercícios dinâmicos: adicione quantos quiser
- Cada exercício tem: nome, grupo muscular, séries, repetições, descanso, técnica e observações
- Edição completa da ficha e seus exercícios
- Exclusão com confirmação
- Visualização em tabela com chips de grupo muscular coloridos
- Estimativa de tempo e total de séries calculados automaticamente

### Cargas & Evolução
- Selecione o aluno e o exercício para ver a progressão
- Gráfico de carga máxima e carga média por sessão
- Gráfico de volume total (kg × reps)
- Cards com PR (personal record), última sessão, variação e número de sessões
- Tabela detalhada com séries de cada sessão

### Progresso Físico
- Evolução de peso e gordura corporal em gráfico
- Gráfico de circunferências (peitoral, cintura, quadril, braço, coxa)
- Radar chart com medidas atuais
- Cards de delta (variação entre início e hoje)
- Tabela histórica completa de avaliações

### Perfil do Personal
- Visualização de nome, e-mail, telefone, CREF e bio
- Edição inline de todos os campos
- Contador de alunos ativos
- Botão de logout

### Tema
- Modo escuro e claro com toggle no sidebar
- Preferência salva no `localStorage` (persiste entre sessões)
- Troca de tema afeta toda a aplicação: cards, modais, dropdowns, tabelas

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Framework principal |
| TypeScript | 4.9 | Tipagem estática |
| Material UI (MUI) | 7 | Componentes de UI |
| styled-components | 6 | Estilização com CSS-in-JS |
| Recharts | 3 | Gráficos de linha e radar |
| Emotion | 11 | Peer dependency do MUI |
| Framer Motion | 12 | Animações (disponível para uso) |

### Fontes
- **Bebas Neue** — títulos e headings
- **Barlow Condensed** — labels, botões e destaques
- **Barlow** — corpo de texto

---

## Estrutura do Projeto

```
src/
├── App.tsx                         # Roteamento principal e providers
├── index.tsx                       # Entry point
│
├── types/
│   └── index.ts                    # Interfaces TypeScript (User, Student, WorkoutSheet, etc.)
│
├── data/
│   └── mockData.ts                 # Dados mockados (usuários, alunos, fichas, logs, progresso)
│
├── theme/
│   └── index.ts                    # Temas MUI dark/light + CSS custom properties
│
├── contexts/
│   ├── AuthContext.tsx             # Autenticação (login, logout, updateProfile)
│   ├── DataContext.tsx             # CRUD de alunos e fichas de treino
│   └── ThemeContext.tsx            # Toggle dark/light com persistência
│
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx             # Sidebar colapsável com navegação e toggle de tema
│   ├── students/
│   │   └── StudentForm.tsx         # Modal de criação/edição de aluno
│   └── workout/
│       └── WorkoutSheetForm.tsx    # Modal de criação/edição de ficha de treino
│
└── pages/
    ├── Login.tsx                   # Tela de login
    ├── Dashboard.tsx               # Visão geral do personal
    ├── Students.tsx                # Listagem e detalhe de alunos
    ├── Workout.tsx                 # Fichas de treino
    ├── Loads.tsx                   # Cargas e evolução por exercício
    ├── Progress.tsx                # Progresso físico e medidas
    └── Profile.tsx                 # Perfil do personal logado
```

---

## Como Rodar

### Pré-requisitos

- Node.js 16+
- npm 8+

### Instalação

```bash
# Entre na pasta do projeto
cd personal-trainer-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

A aplicação abre automaticamente em `http://localhost:3000`.

### Build para produção

```bash
npm run build
```

Os arquivos otimizados ficam na pasta `build/`.

---

## Usuários de Teste

Todos os usuários têm a mesma senha: **`123456`**

| Usuário | Nome | CREF | Alunos |
|---|---|---|---|
| `admin` | Admin | 012345-G/MG | Nenhum (pode cadastrar) |
| `gabriel` | Gabriel Teles | 023456-G/MG | Lucas Mendes, Fernanda Costa |
| `bernardo` | Bernardo Lima | 034567-G/MG | Rafael Oliveira, Camila Santos |

> Na tela de login há atalhos clicáveis para preencher cada usuário automaticamente.

---

## Páginas e Módulos

### Login
- Campos de usuário e senha com toggle de visibilidade
- Atalhos rápidos para os 3 usuários de teste
- Validação de credenciais com mensagem de erro

### Dashboard
- Dados sempre filtrados pelo personal logado
- Saudação dinâmica (manhã / tarde / noite)
- Clique em um aluno para ir direto ao detalhe

### Alunos
- Cards clicáveis que abrem o detalhe
- Hover nos cards revela ícones de editar e excluir
- Detalhe do aluno tem abas: Fichas de Treino e Histórico de Treinos

### Fichas de Treino
- Tabs por ficha (A, B, C, D)
- Header da ficha com total de séries, tempo estimado e número de exercícios
- Chips coloridos por grupo muscular
- Ícones de editar/excluir no header da ficha ativa

### Cargas & Evolução
- Dropdown de aluno lista apenas os alunos do personal logado
- Dropdown de exercício lista apenas exercícios com registros
- Gráficos responsivos com tooltip customizado

### Progresso Físico
- Dropdown de aluno filtrado pelo personal logado
- Estado vazio quando há menos de 2 avaliações
- Radar chart aparece apenas quando há circunferências registradas

### Perfil
- Modo leitura e modo edição com toggle
- Salva no contexto (persiste durante a sessão)
- Toast de confirmação ao salvar

---

## Contextos e Estado

### AuthContext
```ts
user            // Usuário logado (User | null)
login()         // Valida credenciais e seta o usuário
logout()        // Limpa o usuário
updateProfile() // Atualiza dados do perfil na sessão
```

### DataContext
```ts
// Alunos
students                // Lista completa
addStudent()            // Cria novo aluno
updateStudent()         // Edita aluno existente
deleteStudent()         // Remove aluno e suas fichas
getStudentsByPersonal() // Filtra por personalId

// Fichas de treino
workoutSheets           // Lista completa
addWorkoutSheet()       // Cria nova ficha
updateWorkoutSheet()    // Edita ficha existente
deleteWorkoutSheet()    // Remove ficha
getSheetsByStudent()    // Filtra por studentId
```

### ThemeContext
```ts
mode         // 'dark' | 'light'
toggleMode() // Alterna e salva no localStorage
```

---

## Tema e Estilo

O sistema usa uma estratégia híbrida:

- **MUI ThemeProvider** — controla cores de componentes nativos (Paper, Dialog, Menu, Input, Button, Chip, Table)
- **CSS Custom Properties** — controlam cores em styled-components e sx props customizados

### CSS vars disponíveis

```css
--bg-default          /* Fundo da página */
--bg-sidebar          /* Fundo do sidebar */
--card-bg             /* Fundo dos cards */
--card-bg-deep        /* Fundo secundário (inputs dentro de cards) */
--card-border         /* Borda padrão */
--card-border-hover   /* Borda em hover */
--card-border-strong  /* Borda destacada */
--text-primary        /* Texto principal */
--text-secondary      /* Texto secundário */
--text-muted          /* Texto desabilitado */
--accent              /* Cor de destaque (verde) */
--accent-contrast     /* Texto sobre o accent */
--divider             /* Linhas divisórias */
--chart-grid          /* Grade dos gráficos */
--tooltip-bg          /* Fundo dos tooltips */
--input-bg            /* Fundo dos inputs */
```

---

## Próximos Passos

Funcionalidades planejadas para as próximas iterações:

- [ ] Registro de treino — aluno registra cargas no dia a dia
- [ ] Backend real — substituir dados mockados por API REST
- [ ] Autenticação com JWT — sessão persistente com token
- [ ] Upload de foto — avatar do aluno e do personal
- [ ] Exportar ficha em PDF — imprimir protocolo de treino
- [ ] Notificações — lembrete de próxima sessão
- [ ] Avaliação física — formulário para registrar novas medidas
- [ ] Multi-tenant — separação real de dados por personal
- [ ] Layout responsivo para mobile

---

## Licença

Projeto desenvolvido para fins de demonstração. Sem licença de uso definida.
