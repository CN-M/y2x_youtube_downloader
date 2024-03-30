import express from "express";

const router = express.Router();

import { downloadVideo } from "../controllers/downloadController";

router.route("/").post(downloadVideo);

export default router;
