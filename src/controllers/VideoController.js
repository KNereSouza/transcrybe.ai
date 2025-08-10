import VideoService from "../services/VideoService.js";

export default class VideoController {
  constructor(videoService = new VideoService()) {
    this.videoService = videoService;
  }

  async handle(req, res) {
    const url = req.query.url;
    const summarize = req.query.summarize === "true";

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Parâmetro 'url' é obrigatório.",
      });
    }

    try {
      const data = await this.videoService.process(url, summarize);

      return res.status(200).json({
        success: true,
        message: summarize
          ? "Vídeo processado e resumido com sucesso."
          : "Vídeo processado com sucesso.",
        data,
      });
    } catch (error) {
      console.error("Erro no VideoController:", error);

      return res.status(500).json({
        success: false,
        message: "Erro interno no servidor ao processar o vídeo.",
        error: error.message,
      });
    }
  }
}
