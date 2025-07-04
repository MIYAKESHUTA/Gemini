import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// あなたの APIキーをここに記入（漏洩前提でクォータ制限して使ってください）
const API_KEY = AIzaSyD72lc20slLwn3w7xlQG-Mt7qzenoXU1Fo;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let chat;
let history = [];

async function initChat() {
  // 初期プロンプトを作成
  const systemPrompt = `あなたは料理アキネーターです。
ユーザーに「はい」か「いいえ」で答えられる質問を出して、料理を1つに絞り込み、最終的にそのレシピを提示してください。
出す質問は1回に1つ、なるべく分かりやすくしてください。`;

  // チャット開始
  chat = await model.startChat({ history: [] });

  const result = await chat.sendMessage(systemPrompt);
  const response = result.response.text();
  appendMessage("🤖 AI: " + response);
}

async function sendMessage() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  appendMessage("👤 あなた: " + input);
  document.getElementById("userInput").value = "";

  const result = await chat.sendMessage(input);
  const response = result.response.text();
  appendMessage("🤖 AI: " + response);
}

function appendMessage(text) {
  const chatDiv = document.getElementById("chat");
  chatDiv.innerHTML += `<p>${text}</p>`;
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

// ページ読み込み時に初期化
window.onload = initChat;
