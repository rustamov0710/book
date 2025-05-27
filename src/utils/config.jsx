// utils/config.jsx
import axios from "axios";
import CryptoJS from "crypto-js";

let key = localStorage.getItem("key") || "";
let secret = localStorage.getItem("secret") || "";

export function setAuthData(userKey, userSecret) {
  key = userKey;
  secret = userSecret;
  localStorage.setItem("key", key);
  localStorage.setItem("secret", secret);
}

function generateSign(method, path, body, secret) {
  let bodyStr = "";
  if (body && (method === "POST" || method === "PATCH")) {
    bodyStr = JSON.stringify(body);
  }
  const signStr = method + path + bodyStr + secret;
  return CryptoJS.MD5(signStr).toString();
}

export const API = axios.create({
  baseURL: "https://lavina.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const method = (config.method || "get").toUpperCase();
  const url = new URL(config.url, API.defaults.baseURL);
  const path = url.pathname;
  const sign = generateSign(method, path, config.data, secret);

  config.headers["Key"] = key;
  config.headers["Sign"] = sign;

  return config;
});

export const API_URL = "https://lavina.onrender.com/";
