# ⚡ VolectroSheets – Frontend

*Your AI-powered electronics learning companion.*

VolectroSheets is a smart web app that helps electronics students and enthusiasts understand and explore components like resistors, capacitors, transistors, and ICs using generative AI (Gemini). Simply ask your question and get instant insights—tailored to what you’re learning.

---

## 🚀 Features

- 🎙 *AI-Powered Chat* – Ask questions like "What is a Zener Diode?"
- 🔍 *Component Explorer* – Click to learn about electronic components.
- 🤖 *Google Gemini API Integration* – Smart, concise AI responses.
- 💬 *User-Friendly UI* – Clean, mobile-friendly interface.
- 🧠 *Educational Focus* – Especially designed for ECE & Electrical students.

---

## 🛠 Tech Stack

| Frontend     | APIs               | Other Tools             |
|--------------|--------------------|--------------------------|
| React.js     | Google Gemini API  | Firebase (Auth & Firestore) |
| Tailwind CSS | TypeScript         | Ngrok (for backend tunneling), Dotenv |

## testing :
ngrok
postman

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/volectrosheets-frontend.git
cd volectrosheets-frontend 

2. Install Dependencies
npm install

3. Set Up Environment Variables

Create a .env file in the root:
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...

