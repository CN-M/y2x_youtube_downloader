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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, "g"), replace);
};
const download = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const downloadsDir = path_1.default.join(process.cwd(), "downloads");
        if (!fs_1.default.existsSync(downloadsDir)) {
            yield fs_1.default.promises.mkdir(downloadsDir, { recursive: true });
        }
        const videoInfo = yield ytdl_core_1.default.getBasicInfo(url);
        if (!videoInfo) {
            throw new Error("Failed to retrieve video information");
        }
        const originalFilename = `${videoInfo.videoDetails.title}_y2x.mp4`;
        const defaultFilename = replaceAll(originalFilename, " ", "_");
        let downloadPath = path_1.default.join(downloadsDir, defaultFilename);
        // Check if the file already exists
        let counter = 1;
        while (fs_1.default.existsSync(downloadPath)) {
            const [filenameWithoutExt, ext] = defaultFilename.split(".");
            const newFilename = `${filenameWithoutExt}(${counter}).${ext}`;
            downloadPath = path_1.default.join(downloadsDir, newFilename);
            counter++;
        }
        const download = (0, ytdl_core_1.default)(url, {
            filter: "videoandaudio",
            quality: "highestvideo",
        });
        // Pipe download stream to file
        const writeStream = fs_1.default.createWriteStream(downloadPath);
        download.pipe(writeStream);
        // Return promise that resolves when download completes
        return new Promise((resolve, reject) => {
            download.on("end", () => {
                console.log(`Downloaded ${defaultFilename} successfully!`);
                resolve(`Downloaded ${defaultFilename} successfully!`);
            });
            // Handling errors
            download.on("error", (err) => {
                console.error("Error occurred during download:", err);
                reject(err);
            });
            writeStream.on("error", (err) => {
                console.error("Error occurred while writing file:", err);
                reject(err);
            });
        });
    }
    catch (err) {
        console.error("Error occurred:", err);
        throw err; // Re-throw error to propagate it
    }
});
exports.download = download;
