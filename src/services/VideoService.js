import { getAudioBuffer } from "../utils/getAudioBuffer.js";
import { OpenAiClient } from "../config/clients.js";

export default class VideoService {
  constructor(clientEntity = new OpenAiClient()) {
    this.clientEntity = clientEntity;
  }

  async process(url, shouldSummarize = false) {
    try {
      const buffer = await getAudioBuffer(url);
      const transcription = await this.clientEntity.transcribe(buffer);

      const result = { transcription };

      if (shouldSummarize) {
        result.summary = await this.clientEntity.summarize(transcription);
      }

      return result;
    } catch (error) {
      throw new Error(`Falha ao processar o vídeo: ${error.message}`);
    }
  }
}
