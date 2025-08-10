# 🎙️ Transcrybe.ai

O **Transcrybe.ai** é uma API que processa **vídeos do YouTube** para **transcrever automaticamente o áudio** e, opcionalmente, gerar um **resumo inteligente** usando a API da OpenAI.

## 🚀 Funcionalidades

- Busca e processa vídeos **diretamente do YouTube** a partir de uma URL.
- Extrai o áudio do vídeo e realiza a transcrição utilizando **OpenAI Whisper**.
- Gera resumos estruturados e concisos usando **GPT-3.5**.
- API REST simples, retornando dados no formato **JSON**.
- Otimizado para integrar com aplicações web, mobile e bots.

---

## 📦 Tecnologias Utilizadas

- **Node.js** + **Express** — Backend.
- **OpenAI API** — Transcrição (Whisper) e Resumo (GPT).
- **JavaScript ES Modules**.
- **ytdl-core** — Download de áudio do YouTube.

---

## 📂 Estrutura do Projeto

```
/
├─ src/
│ ├─ config/
│ │ ├─ clients.js
│ │ └─ env.js
│ ├─ controllers/
│ │ └─ VideoController.js
│ ├─ services/
│ │ └─ VideoService.js
│ ├─ utils/
│ │ └─ getAudioBuffer.js
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

Para rodar o projeto sem bibliotecas externas para carregar `.env`, é necessário usar **Node.js v20.6.0 ou superior** (recomendado: v21 ou superior).  
Se estiver usando uma versão mais antiga, instale e configure a biblioteca [`dotenv`](https://www.npmjs.com/package/dotenv).

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

- Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
OPENAI_API_KEY=<sua_chave_api_aqui>
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
     "message": "Hello World! Everything's okay."
   }
   ```

2. Processar vídeo do YouTube

   `GET api/v1/process?url=<URL_YOUTUBE>&summarize=<true|false>`

   - Parâmetros:
     - `url` (obrigatório) — URL do vídeo no YouTube.
     - `summarize` (opcional) — true para também gerar um resumo.

   **Response**

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

1. Cliente envia uma URL de vídeo do YouTube para a API.
2. API baixa o áudio usando ytdl-core.
3. Áudio é processado pelo OpenAI Whisper para gerar a transcrição.
4. (Opcional) GPT-3.5 processa a transcrição e gera um resumo.
5. API retorna JSON com transcrição e/ou resumo.

## 📌 Observações

- A URL deve ser de um vídeo público ou não listado no YouTube.
- O tempo de processamento depende da duração do vídeo.
- É necessário ter uma chave válida da API OpenAI.

## 📜 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
