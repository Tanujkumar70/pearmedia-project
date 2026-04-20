const BASE = "http://localhost:3000";

let enhanced = "";
let description = "";

// enhance
async function enhanceText() {
  const text = document.getElementById("text").value;

  const res = await fetch(`${BASE}/enhance-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const data = await res.json();

  enhanced = `same subject, same composition, ultra realistic, 4k: ${data.enhanced}`;

  document.getElementById("enhanced").innerText = enhanced;
}

// generate image
async function generateImage() {
  const img = document.getElementById("img");
  const loader = document.getElementById("loader1");

  if (!enhanced) return alert("Enhance first");

  loader.style.display = "block";
  img.style.display = "none";

  const res = await fetch(`${BASE}/generate-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: enhanced })
  });

  const data = await res.json();

  loader.style.display = "none";
  img.style.display = "block";
  img.src = data.image;
}

// analyze
async function analyze() {
  const file = document.getElementById("file").files[0];

  if (!file) return alert("Upload image");

  const fd = new FormData();
  fd.append("image", file);

  const res = await fetch(`${BASE}/analyze-image`, {
    method: "POST",
    body: fd
  });

  const data = await res.json();

  description = `Highly detailed, ultra realistic, 4k: ${data.description}`;

  document.getElementById("desc").innerText = description;
}

// variation
async function variation() {
  const img = document.getElementById("img2");
  const loader = document.getElementById("loader2");

  if (!description) return alert("Analyze first");

  loader.style.display = "block";
  img.style.display = "none";

  const res = await fetch(`${BASE}/image-variation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description })
  });

  const data = await res.json();

  loader.style.display = "none";
  img.style.display = "block";
  img.src = data.image;
}

// download
function downloadImage(id) {
  const img = document.getElementById(id);

  const a = document.createElement("a");
  a.href = img.src;
  a.download = "ai-image-" + Date.now() + ".png";
  a.click();
}