import { Router } from "express";
import VideoController from "../controllers/VideoController.js";

const routes = Router();
const videoController = new VideoController();

routes.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World! Everything's okay.",
  });
});

routes.get("/process", async (req, res) => {
  await videoController.handle(req, res);
});

export default routes;
