import { Router } from "express";

const routes = Router();

routes.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World! Everything's okay.",
  });
});

export default routes;
