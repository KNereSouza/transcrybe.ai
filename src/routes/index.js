import { Router } from "express";
import VideoController from "../controllers/VideoController.js";
import { GeminiClient, OpenAiClient } from "../config/clients.js";

const clients = {
  gemini: GeminiClient,
  openai: OpenAiClient,
};

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Olá Mundo!",
  });
});

routes.get("/transcribe", (req, res) => {
  const clientKey = (req.query.client ?? "openai").toLowerCase().trim();

  if (!clients[clientKey]) {
    return res.status(400).json({
      success: false,
      message:
        "Cliente de IA inválido. Verifique a documentação e tente novamente.",
    });
  }

  const controller = new VideoController(new clients[clientKey]());
  return controller.handle(req, res);
});

export default routes;
