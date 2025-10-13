import express from "express";
import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import { getPositions,getData } from "./moyskladApi.js";

const token = "7956623814:AAH_7h2nIVLG9TGsq4CaweY1yBui_CGiWCk";


const bot = new TelegramBot(token, { polling: true });


const app = express();
const PORT = 3000;

const USERS_FILE = "./users.json";


if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));



bot.setMyCommands([
  { command: "/start", description: "Botni ishga tushirish 🚀" },
  { command: "/help", description: "Yordam olish ℹ️" },
  { command: "/stop", description: "Botni to‘xtatish 🛑" },
]);

bot.onText("/help", (msg) => {
  bot.sendMessage(msg.chat.id, "nima yordam kerak ?");
});


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;


  bot.sendMessage(chatId, "Здравствуйте, добро пожаловать в МойСклад Info бот \n\n\nОтправьте мне свой номер телефона для получения информации. 📞", {
    reply_markup: {
      keyboard: [
       
        [
          { text: "📞 Отправить номер телефона", request_contact: true },
          //{ text: "ℹ️ Haqida" }

        ],
        
      ],
       
      resize_keyboard: true, // Tugmani ekranga moslashtiradi
      one_time_keyboard: true, // 👈 Shu qator tugmani bosgandan keyin yo‘q qilad
    },
  });
});

// 📲 Foydalanuvchi kontakt yuborganda
bot.on("contact", (msg) => {
  const chatId = msg.chat.id;
  const phoneNumber = msg.contact.phone_number;
  const name = msg.contact.first_name;

   // Faylni o‘qish
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  }

  // Foydalanuvchi mavjudligini tekshirish
  const mavjud = users.find((u) => u.chatId === chatId);

  // Agar mavjud bo‘lmasa, qo‘shamiz
  if (!mavjud) {
    users.push({ chatId, first_name: name ,phoneNumber});
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log(`📥 Yangi foydalanuvchi qo‘shildi: ${name} (${chatId})`);
    
  }
  
  bot.sendMessage(chatId,`✅ Спасибо ${name}, я сейчас отправлю вам информацию ${chatId}`,{
    reply_markup: {
      remove_keyboard: true, // 👈 Shu joy klaviaturani butunlay yo‘q qiladi
    }
  });
  bot.sendMessage(6080018622,`👏 Добавлен новый пользователь \n\n🙋🏻‍♂️${name} \n✍🏼${msg.chat.username} \n📞${phoneNumber}`,{
    reply_markup: {
      remove_keyboard: true, // 👈 Shu joy klaviaturani butunlay yo‘q qiladi
    }
  });
});

// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;

//   bot.sendMessage(chatId, `Salom, ${msg.from.first_name}! Siz yozdingiz: ${text}`);
// });




function myJob() {
  getData();
  console.log("Har 5 sekundda ishlayapti (funksiya alohida)");
}

setInterval(myJob, 5000);

app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`);
});


export default bot;
