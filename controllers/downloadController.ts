import { Request, Response } from "express";
import { download } from "../util/download";

export const downloadVideo = async (req: Request, res: Response) => {
  try {
    // Extract URL from request body
    const { url } = req.body;

    // Check if URL is provided
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Call download function
    await download(url);

    // Respond with success message
    return res.status(200).json({ message: "Video downloaded successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error occurred during video download:", error);
    return res.status(500).json({ error: "Failed to download video" });
  }
};
