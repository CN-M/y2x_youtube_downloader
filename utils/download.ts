import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";

const replaceAll = (str: string, find: string, replace: string) => {
  return str.replace(new RegExp(find, "g"), replace);
};

export const download = async (url: string): Promise<string> => {
  try {
    const downloadsDir = path.join(process.cwd(), "downloads");
    if (!fs.existsSync(downloadsDir)) {
      await fs.promises.mkdir(downloadsDir, { recursive: true });
    }
    const videoInfo = await ytdl.getBasicInfo(url);
    if (!videoInfo) {
      throw new Error("Failed to retrieve video information");
    }
    const originalFilename = `${videoInfo.videoDetails.title}_y2x.mp4`;
    const defaultFilename = replaceAll(originalFilename, " ", "_");
    let downloadPath = path.join(downloadsDir, defaultFilename);

    // Check if the file already exists
    let counter = 1;
    while (fs.existsSync(downloadPath)) {
      const [filenameWithoutExt, ext] = defaultFilename.split(".");
      const newFilename = `${filenameWithoutExt}(${counter}).${ext}`;
      downloadPath = path.join(downloadsDir, newFilename);
      counter++;
    }

    const download = ytdl(url, {
      filter: "videoandaudio",
      quality: "highestvideo",
    });

    // Pipe download stream to file
    const writeStream = fs.createWriteStream(downloadPath);
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
  } catch (err) {
    console.error("Error occurred:", err);
    throw err; // Re-throw error to propagate it
  }
};
