const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, "g"), replace);
};

const Download = async (url) => {
  try {
    const downloadsDir = path.join(process.cwd(), "downloads");
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    const videoInfo = await ytdl.getBasicInfo(url);
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

    download.pipe(fs.createWriteStream(downloadPath));

    // Handling download completion event
    download.on("end", () => {
      console.log(`Downloaded ${defaultFilename} successfully!`);
    });

    // Handling errors
    download.on("error", (err) => {
      console.error("Error occurred during download:", err);
    });
  } catch (err) {
    console.error("Error occurred:", err);
  }
};

// Pass null or undefined as filename to use the default filename
Download("https://youtu.be/T5ESLdk8iTA?si=0airdJnWbt8enzis");
