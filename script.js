import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// 🔑 あなたのAPIキー（制限を必ずかけてください）
const API_KEY = AIzaSyD72lc20slLwn3w7xlQG-Mt7qzenoXU1Fo;

// 初期化
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let history = [
  {
    role: "user",
    parts: [
      { text: "あなたは料理アキネーターです。ユーザーに『はい』か『いいえ』で答えられる質問をして、最終的に1つの料理を当ててレシピを出してください。20回以内にお願いします。" }
    ]
  }
];

async function sendMessage() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  appendMessage("👤 あなた: " + input);
  document.getElementById("userInput").value = "";

  history.push({ role: "user", parts: [{ text: input }] });

  const chat = await model.startChat({ history });
  const result = await chat.sendMessage(input);
  const response = result.response.text();

  history.push({ role: "model", parts: [{ text: response }] });
  appendMessage("🤖 AI: " + response);
}

function appendMessage(text) {
  const chat = document.getElementById("chat");
  chat.innerHTML += `<p>${text}</p>`;
  chat.scrollTop = chat.scrollHeight;
}
