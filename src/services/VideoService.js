import { getAudioBuffer } from "../utils/getAudioBuffer.js";
import { OpenAiClient } from "../config/clients.js";

export default class VideoService {
  constructor(clientEntity = new OpenAiClient()) {
    this.clientEntity = clientEntity;
  }

  async process(url, summarize = false) {
    try {
      const buffer = await getAudioBuffer(url);

      const transcription = await this.clientEntity.transcribe(buffer);

      const data = {
        transcription,
      };

      if (summarize) {
        const summary = await this.clientEntity.summarize(transcription);

        data.summary = summary;
      }

      return data;
    } catch (error) {
      console.error("Erro no VideoService:", error);
      throw new Error("Falha ao processar o vídeo.");
    }
  }
}
