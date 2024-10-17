const { MongoClient } = require('mongodb');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = '7891399266:AAEDdHQbEzH42ZAZqxzgrnSnGdU2Lr1L0BI';
const bot = new TelegramBot(token, { polling: true });

const app = express();
const PORT = process.env.PORT || 3000;

let db;
let usersCollection;

// رابط MongoDB
const MONGO_URI = 'mongodb+srv://alifakarr:Aliliwaa00@ali.wweyt.mongodb.net/?retryWrites=true&w=majority&appName=Ali';

async function connectDB() {
    try {
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db('telegram_mini_app');
        usersCollection = db.collection('users');  // تعيين مجموعة "users"
        console.log('تم الاتصال بقاعدة البيانات بنجاح');
    } catch (error) {
        console.error('خطأ أثناء الاتصال بقاعدة البيانات:', error);
    }
}

// الاتصال بقاعدة البيانات
connectDB();

// استقبال أوامر البوت
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
        // التحقق من الاتصال بقاعدة البيانات قبل متابعة العملية
        if (!usersCollection) {
            console.error('usersCollection غير مهيأ بعد');
            bot.sendMessage(chatId, 'حدث خطأ: لا يمكن الاتصال بقاعدة البيانات.');
            return;
        }

        // البحث عن المستخدم في قاعدة البيانات
        let user = await usersCollection.findOne({ userId: userId });

        if (!user) {
            // إذا لم يكن المستخدم موجودًا، قم بإنشاء مستخدم جديد
            await usersCollection.insertOne({ userId: userId, points: 0 });
            user = { points: 0 };
        }

        // إرسال رسالة الترحيب مع النقاط الحالية
        bot.sendMessage(chatId, `مرحبًا! لديك ${user.points} نقاط.`, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'افتح التطبيق',
                            web_app: { url: `https://tatle-alis-projects-e389fa47.vercel.app/?userId=${userId}` }
                        }
                    ]
                ]
            }
        });
    } catch (error) {
        console.error('خطأ أثناء استرجاع بيانات المستخدم:', error);
        bot.sendMessage(chatId, 'حدث خطأ أثناء استرجاع بياناتك.');
    }
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
