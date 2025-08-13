import VideoService from "../services/VideoService.js";

export default class VideoController {
  constructor(client, videoService) {
    this.videoService = videoService || new VideoService(client);
  }

  async handle(req, res) {
    const { url, summarize } = req.query;
    const shouldSummarize = summarize === "true";

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Parâmetro 'url' é obrigatório.",
      });
    }

    try {
      const data = await this.videoService.process(url, shouldSummarize);

      return res.status(200).json({
        success: true,
        message: shouldSummarize
          ? "Vídeo processado e resumido com sucesso."
          : "Vídeo processado com sucesso.",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro interno no servidor ao processar o vídeo.",
        error: error.message,
      });
    }
  }
}
