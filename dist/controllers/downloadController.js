"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadVideo = void 0;
const download_1 = require("../utils/download");
const downloadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract URL from request body
        const { url } = req.body;
        // Check if URL is provided
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        // Call download function
        yield (0, download_1.download)(url);
        // Respond with success message
        return res.status(200).json({ message: "Video downloaded successfully" });
    }
    catch (error) {
        // Handle errors
        console.error("Error occurred during video download:", error);
        return res.status(500).json({ error: "Failed to download video" });
    }
});
exports.downloadVideo = downloadVideo;
