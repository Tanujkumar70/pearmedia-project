import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

// TEXT ENHANCE
app.post("/enhance-text", (req, res) => {
  const { text } = req.body;

  if (!text) return res.json({ enhanced: "Enter text first" });

  res.json({
    enhanced: `Highly detailed, 4k, cinematic lighting, ultra realistic: ${text}`
  });
});

// IMAGE GENERATION (FIXED)
app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    let image = null;

    // 🔥 SAME PROMPT → SAME BASE SEED
    const baseSeed = prompt.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

    for (let i = 0; i < 3; i++) {
      try {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${baseSeed + i}`;

        const response = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0" }
        });

        const buffer = await response.arrayBuffer();

        if (buffer.byteLength > 8000) {
          image = `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;
          break;
        }
      } catch {
        console.log("Retry...");
      }
    }

    if (!image) {
      image = `https://picsum.photos/512?random=${Date.now()}`;
    }

    res.json({ image });

  } catch (err) {
    console.log(err);
    res.json({ image: `https://picsum.photos/512` });
  }
});

// IMAGE ANALYSIS
app.post("/analyze-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.json({ description: "No image uploaded" });
  }

  const description = `A realistic version of ${req.file.originalname}, same subject, same style`;

  fs.unlinkSync(req.file.path);

  res.json({ description });
});

// IMAGE VARIATION (FIXED SAME LOGIC)
app.post("/image-variation", async (req, res) => {
  try {
    const { description } = req.body;

    let image = null;

    const baseSeed = description.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

    for (let i = 0; i < 3; i++) {
      try {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(description)}?width=512&height=512&seed=${baseSeed + i}`;

        const response = await fetch(url);
        const buffer = await response.arrayBuffer();

        if (buffer.byteLength > 8000) {
          image = `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;
          break;
        }
      } catch {}
    }

    if (!image) {
      image = `https://picsum.photos/512?random=${Date.now()}`;
    }

    res.json({ image });

  } catch {
    res.json({ image: `https://picsum.photos/512` });
  }
});

app.listen(3000, () => {
  console.log("🚀 http://localhost:3000");
});