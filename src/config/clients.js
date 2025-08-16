import OpenAI from "openai";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

import { env } from "./env.js";
import fs from "fs";
import { saveBufferToTempFile, removeTempFile } from "../utils/tempFile.js";
import { TRANSCRIBE_PROMPT, SUMMARY_PROMPT } from "./prompts.js";

class OpenAiClient {
  constructor(client = new OpenAI({ apiKey: env.OPENAI_API_KEY })) {
    this.client = client;
  }

  async transcribe(buffer) {
    const tempFilePath = saveBufferToTempFile(buffer);

    try {
      const response = await this.client.audio.transcriptions.create({
        model: "whisper-1",
        file: fs.createReadStream(tempFilePath),
        prompt: TRANSCRIBE_PROMPT,
      });
      return response.text;
    } catch (e) {
      console.error("[OpenAI] Erro na transcrição:", e);
    } finally {
      removeTempFile(tempFilePath);
    }
  }

  async summarize(transcription) {
    const prompt = `${SUMMARY_PROMPT}${transcription}`;

    try {
      const response = await this.client.responses.create({
        model: "gpt-5",
        input: prompt,
      });
      return response.output_text;
    } catch (e) {
      console.error("[OpenAI] Erro no resumo:", e);
    }
  }
}

class GeminiClient {
  constructor(client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })) {
    this.client = client;
  }

  async transcribe(buffer) {
    const tempFilePath = saveBufferToTempFile(buffer);

    try {
      const audio = await this.client.files.upload({
        file: tempFilePath,
        config: { mimeType: "audio/mpeg" },
      });

      const response = await this.client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: createUserContent([
          createPartFromUri(audio.uri, audio.mimeType),
          TRANSCRIBE_PROMPT,
        ]),
      });

      return response.text;
    } catch (e) {
      console.error("[Gemini] Erro na transcrição:", e);
    } finally {
      removeTempFile(tempFilePath);
    }
  }

  async summarize(transcription) {
    const prompt = `${SUMMARY_PROMPT}${transcription}`;

    try {
      const response = await this.client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      return response.text;
    } catch (e) {
      console.error("[Gemini] Erro no resumo:", e);
    }
  }
}

export const clients = {
  gemini: GeminiClient,
  openai: OpenAiClient,
};
