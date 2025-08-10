import ytdl from "@distube/ytdl-core";
import { Buffer } from "node:buffer";

export async function getAudioBuffer(url) {
  try {
    const isValid = ytdl.validateURL(url);
    if (!isValid) {
      throw new Error(
        "URL do YouTube inválida! Por favor, verifique-a e tente novamente."
      );
    }

    const audioStream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  } catch (error) {
    console.error("Erro ao processar o vídeo:", error);
    throw error;
  }
}
