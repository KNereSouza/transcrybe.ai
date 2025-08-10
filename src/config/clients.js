import OpenAI from "openai";
import { env } from "./env.js";

import fs from "fs";
import path from "path";
import os from "os";

export class OpenAiClient {
  constructor(client = new OpenAI({ apiKey: env.OPENAI_API_KEY })) {
    this.client = client;
  }

  async transcribe(buffer) {
    const tempFilePath = path.join(os.tmpdir(), "audio.wav");
    fs.writeFileSync(tempFilePath, buffer);

    const response = await this.client.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-1",
    });

    fs.unlinkSync(tempFilePath);

    return response.text;
  }

  async summarize(transcription) {
    const summaryPrompt = `
        Você é um assistente especializado em síntese de informações.
        Receberá uma transcrição de áudio e deve produzir um resumo conciso e bem organizado.

        Regras de formatação:

        1. Estruture a resposta em duas seções:
        - Resumo Geral: um parágrafo com até 5 frases que capture o sentido principal do texto.
        - Pontos-Chave: lista com 3 a 7 bullet points dos fatos ou ideias mais relevantes.
        2. Não invente informações que não estejam no texto original.
        3. Elimine repetições e comentários irrelevantes.
        4. Mantenha nomes próprios, datas, números e termos técnicos citados.
        5. Escreva em português correto e claro.

        Texto para resumir:
        ${transcription}
        `;

    const response = await this.client.responses.create({
      model: "gpt-3.5-turbo",
      input: summaryPrompt,
    });

    return response.output_text;
  }
}
