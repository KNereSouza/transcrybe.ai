import OpenAI from "openai";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

import { env } from "./env.js";

import { saveBufferToTempFile, removeTempFile } from "../utils/tempFile.js";
import { SUMMARY_PROMPT } from "./summaryPrompt.js";
import fs from "fs";

export class OpenAiClient {
  constructor(client = new OpenAI({ apiKey: env.OPENAI_API_KEY })) {
    console.log("OpenAI Client");
    this.client = client;
  }

  async transcribe(buffer) {
    const tempFilePath = saveBufferToTempFile(buffer);
    try {
      const response = await this.client.audio.transcriptions.create({
        file: fs.createReadStream(tempFilePath),
        model: "whisper-1",
      });
      return response.text;
    } finally {
      removeTempFile(tempFilePath);
    }
  }

  async summarize(transcription) {
    const prompt = `${SUMMARY_PROMPT}${transcription}`;
    const response = await this.client.responses.create({
      model: "gpt-5",
      input: prompt,
    });
    return response.output_text;
  }
}

export class GeminiClient {
  constructor(client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })) {
    console.log("Google Gemini Client");
    this.client = client;
  }

  async transcribe(buffer) {
    const tempFilePath = saveBufferToTempFile(buffer);
    try {
      const audio = await this.client.files.upload({
        file: tempFilePath,
        config: { mimeType: "audio/wav" },
      });

      const response = await this.client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: createUserContent([
          createPartFromUri(audio.uri, audio.mimeType),
          "Transcreva este áudio.",
        ]),
      });

      return response.text;
    } finally {
      removeTempFile(tempFilePath);
    }
  }

  async summarize(transcription) {
    const prompt = `${SUMMARY_PROMPT}${transcription}`;

    const response = await this.client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  }
}
