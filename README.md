# 📊 Teste de Progresso - Plataforma de Gestão de Provas e Questões

## 👥 Integrantes da Equipe
* **Lucas Teixeira Xavier** - RA/Matrícula: 06016899

---

## 🎯 Situação-Problema
A gestão e elaboração de exames de Teste de Progresso acadêmico demandam uma organização estruturada de banco de questões, categorização por áreas de conhecimento e monitoramento do desempenho dos estudantes. Muitas instituições enfrentam dificuldades para centralizar o cadastro de questões, montar provas personalizadas e visualizar estatísticas e indicadores de desempenho de forma clara e acessível.

---

## 📌 Descrição Sucinta do MVP
O **Teste de Progresso** é uma aplicação web modular para gerenciamento completo do ciclo de vida de avaliações acadêmicas. O MVP permite que professores e gestores cadastrem e editem questões em um banco de dados centralizado, gerem novas provas/exames automaticamente, e acompanhem métricas e resultados através de um Dashboard intuitivo.

---

## 🎨 Prototipação de Telas

Abaixo apresentam-se as interfaces principais desenvolvidas para a validação da experiência do utilizador e fluxo do MVP:

### 1. Painel Geral (Dashboard)
Painel com indicadores, gráficos e estatísticas consolidadas sobre o progresso e o acervo do sistema.
![Painel Geral](assets/Painel.png)

### 2. Banco de Questões
Interface dedicada à listagem, consulta e filtragem do acervo de questões cadastradas.
![Banco de Questões](assets/Bancodequestoes.png)

### 3. Gerador de Provas
Módulo responsável pela montagem, seleção e geração automatizada de exames.
![Gerador de Provas](assets/Gerarprova.png)

---

## 📑 Requisitos do Sistema

### 🛠️ Requisitos Funcionais (RF)
| ID | Descrição |
| :---: | :--- |
| **RF-01** | **Gerenciamento de Banco de Questões:** O sistema deve permitir visualizar, buscar e filtrar o acervo de questões cadastradas. |
| **RF-02** | **Editor de Questões:** O sistema deve disponibilizar um editor para criação e alteração de itens/questões com suporte a opções e gabarito. |
| **RF-03** | **Gerador de Provas (Generator):** O sistema deve permitir a montagem e geração de exames/provas com base nos parâmetros configurados pelo usuário. |
| **RF-04** | **Visualização de Exames (Exams):** O sistema deve listar e permitir a consulta de provas geradas e seus respectivos históricos. |
| **RF-05** | **Dashboard de Indicadores:** O sistema deve apresentar um painel com dados consolidados, gráficos e estatísticas sobre o progresso e o banco de questões. |
| **RF-06** | **Persistência Local de Dados:** O sistema deve armazenar e sincronizar as informações (questões e provas) através do gerenciador de estado e armazenamento local (`Store`). |

### 🔒 Requisitos Não-Funcionais (RNF)
| ID | Descrição |
| :---: | :--- |
| **RNF-01** | **Arquitetura Client-side:** O sistema deve funcionar inteiramente no navegador (Vanilla JS/SPA), sem necessidade de instalação de dependências ou servidores de backend complexos. |
| **RNF-02** | **Usabilidade e Interface:** A interface gráfica deve ser organizada em módulos/visões de fácil navegação (Dashboard, Banco, Editor, Gerador e Exames). |
| **RNF-03** | **Modularidade e Manutenibilidade:** O código-fonte deve ser organizado com separação clara de responsabilidades (`store`, `views`, `components`, `constants`, `utils`). |
| **RNF-04** | **Desempenho:** As transições entre visões e a filtragem de dados devem ocorrer instantaneamente na página. |

---

## 💻 Instruções para Executar o MVP Localmente

### Pré-requisitos
* Um navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari).
* Extensão **Live Server** (recomendada para Visual Studio Code) ou qualquer servidor HTTP estático local.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/LucasXavi00/Teste-progresso.MVP