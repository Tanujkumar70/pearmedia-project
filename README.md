# 🚀 PearMedia Project

A simple Node.js + Express based media project that serves random images using an API.

---

## 📌 Features

* 🎲 Random image generator API
* ⚡ Fast and lightweight backend using Express
* 🌐 Static frontend (HTML, CSS, JS)
* 🔗 Uses Picsum API for random images

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* HTML, CSS, JavaScript

---

## 📂 Project Structure

```
pearmedia-project/
│── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
│── uploads/
│── server.js
│── package.json
│── .env
```

---

## ▶️ How to Run Locally

1. Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/pearmedia-project.git
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
node server.js
```

4. Open in browser:

```
http://localhost:3000
```

---

## 🌐 API Endpoint

### Get Random Image

```
POST /image-variation
```

Response:

```
{
  "image": "https://picsum.photos/512?random=..."
}
```

---

## 🚀 Live Demo

👉 (Add your Render/Vercel link here)

---

## 👤 Author

* Tanju Kumar

---

## 📜 License

This project is open source and free to use.
