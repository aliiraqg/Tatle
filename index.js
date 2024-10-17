const { MongoClient } = require('mongodb');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// توكن البوت (تم تضمين التوكن الذي قدمته)
const token = '7891399266:AAEDdHQbEzH42ZAZqxzgrnSnGdU2Lr1L0BI';  
const bot = new TelegramBot(token, { polling: true });

const app = express();
const PORT = process.env.PORT || 3000;

let db;
let usersCollection;

// رابط MongoDB (تم تضمين الرابط الذي قدمته)
const MONGO_URI = 'mongodb+srv://alifakarr:Aliliwaa00@ali.wweyt.mongodb.net/?retryWrites=true&w=majority&appName=Ali';

async function connectDB() {
    try {
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db('telegram_mini_app');
        usersCollection = db.collection('users'); // تعيين مجموعة "users"
        console.log('تم الاتصال بقاعدة البيانات بنجاح');
    } catch (error) {
        console.error('خطأ أثناء الاتصال بقاعدة البيانات:', error);
    }
}

connectDB();

// استقبال البيانات من واجهة الويب عبر Telegram WebAppData
bot.on('web_app_data', async (msg) => {
    const userId = msg.from.id;
    const data = JSON.parse(msg.web_app_data.data);

    if (!usersCollection) {
        console.error('usersCollection غير مهيأ بعد');
        return;
    }

    try {
        await usersCollection.updateOne({ userId: userId }, { $set: { points: data.points } }, { upsert: true });
        console.log(`تم تحديث نقاط المستخدم ${userId}: ${data.points}`);
    } catch (error) {
        console.error('خطأ أثناء تحديث نقاط المستخدم:', error);
    }
});

// نقطة نهاية لجلب نقاط المستخدم
app.get('/getUserPoints', async (req, res) => {
    const userId = req.query.userId;

    try {
        const user = await usersCollection.findOne({ userId: userId });
        res.json({ points: user ? user.points : 0 });
    } catch (error) {
        console.error('خطأ في استرجاع النقاط:', error);
        res.status(500).send('حدث خطأ أثناء استرجاع النقاط.');
    }
});

// تشغيل الخادم على Vercel
app.get('/', (req, res) => {
    res.send('الخادم يعمل بنجاح!');
});

app.listen(PORT, () => {
    console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
