# 🎙️ Transcrybe.ai

O **Transcrybe.ai** é uma API que processa vídeos do YouTube **para transcrever automaticamente o áudio** e, opcionalmente, gerar um **resumo inteligente**.

Agora, você pode escolher entre **OpenAI** e **Google Gemini** como provedor de IA, tornando a API mais flexível e escalável.

## 🚀 Novidades e Melhorias

- Novo suporte a múltiplos provedores de IA: escolha entre **OpenAI** ou **Google Gemini**.

- **Código refatorado** para melhor legibilidade e escalabilidade.

- **Prompt de resumo centralizado** para fácil manutenção.

- **Manipulação de arquivos temporários extraída para utilitário dedicado**.

- **Validação de cliente** no endpoint para evitar erros de requisição.

- **Parâmetro** `client` adicionado para selecionar o provedor de IA.

## 📦 Funcionalidades

- Busca e processa **vídeos diretamente do YouTube** a partir de uma URL.

- Extrai o áudio do vídeo e realiza a transcrição com:

  - **OpenAI Whisper**
  - **Google Gemini 2.5 Flash**

- Gera resumos estruturados e concisos.

- API REST simples, retornando dados no formato **JSON**.

- Ideal para integração com aplicações web, mobile e bots.

## 📦 Tecnologias

O **Transcrybe.ai** foi desenvolvido com foco em performance, escalabilidade e flexibilidade, utilizando as seguintes tecnologias:

| Categoria                               | Tecnologia                                 | Descrição                                                              |
| --------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| **Linguagem**                           | **Node.js** (ES Modules)                   | Plataforma JavaScript no servidor com suporte a módulos ES nativos.    |
| **Framework Web**                       | **Express.js**                             | Framework rápido e minimalista para criação da API REST.               |
| **Provedores de IA**                    | **OpenAI**                                 | Utilizado para transcrição via Whisper e resumo via GPT.               |
|                                         | **Google Gemini**                          | Alternativa para transcrição e resumo com IA da Google.                |
| **Extração de Áudio**                   | **ytdl-core**                              | Biblioteca para download e extração de áudio de vídeos do YouTube.     |
| **Manipulação de Arquivos Temporários** | **fs**, **path**, **os** (nativos do Node) | Criar, ler e remover arquivos temporários durante o processamento.     |
| **Variáveis de Ambiente**               | **dotenv** _(opcional)_                    | Carregamento de variáveis de ambiente para versões antigas do Node.js. |

## 📂 Estrutura do Projeto

```
/
├─ src/
│ ├─ config/
│ │ ├─ clients.js
│ │ ├─ env.js
│ │ └─ summaryPrompt.js
│ ├─ controllers/
│ │ └─ VideoController.js
│ ├─ services/
│ │ └─ VideoService.js
│ ├─ utils/
│ │ ├─ getAudioBuffer.js
│ │ └─ tempFile.js
│ ├─ routes/
│ │ └─ index.js
│ ├─ server.js
│ └─ app.js
├─ .env
├─ .gitignore
├─ package-lock.json
├─ package.json
└─ README.md
```

## ⚙️ Configuração

### 🔍 Requisito de versão do Node.js

- **Node.js v20.6.0 ou superior (recomendado: v21+)**
- Se usar versão anterior, instale `dotenv` para carregar variáveis de ambiente.

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/KNereSouza/transcrybe.ai.git
cd transcrybe.ai
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

- Crie um arquivo `.env` na raiz do projeto:

```env
OPENAI_API_KEY=<sua_chave_openai>
GEMINI_API_KEY=<sua_chave_gemini>
PORT=3000
```

## ▶️ Executando o Projeto

- Modo de Desenvolvimento:

```bash
npm run dev
```

## 🔌 Endpoints

1. Rota de Teste

   `GET api/v1/`

   **Response:**

   ```json
   {
     "success": true,
     "message": "Olá Mundo!"
   }
   ```

2. Transcrever vídeo do YouTube

   `GET api/v1/transcribe?url=<URL_YOUTUBE>&summarize=<true|false>&client=<openai|gemini>`

   - **Parâmetros:**

     - `url` (obrigatório) — URL do vídeo no YouTube.
     - `summarize` (opcional, default: `false`) — `true` para gerar resumo.
     - `client` (opcional, default: `openai`) — Provedor de IA: `openai` ou `gemini`.

   - **Exemplo de Request:**

   ```bash
   curl "http://localhost:3000/api/v1/transcribe?url=https://youtube.com/watch?v=xyz&summarize=true&client=gemini"
   ```

   **Exemplo de Response:**

   ```json
   {
     "success": true,
     "message": "Vídeo processado e resumido com sucesso.",
     "data": {
       "transcription": "Texto transcrito do áudio...",
       "summary": "Texto resumido da transcrição..."
     }
   }
   ```

## 🧠 Fluxo de Funcionamento

1. Cliente envia uma URL de vídeo do YouTube para a API, informando opcionalmente o provedor de IA.

2. API baixa o áudio usando **ytdl-core**.

3. Áudio é processado para gerar a transcrição:

   - **OpenAI Whisper**
   - **Google Gemini**

4. (Opcional) O provedor de IA gera um resumo usando prompt centralizado.

5. API retorna JSON com transcrição e/ou resumo.

## 📌 Observações

- Vídeos precisam estar públicos ou não listados no YouTube..
- O tempo de processamento depende da duração do vídeo.
- Necessário ter chave válida da API para o provedor escolhido.

## 📜 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
