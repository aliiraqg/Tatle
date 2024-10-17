const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// تفعيل CORS للسماح بالطلبات من الواجهة الأمامية
app.use(cors());

// رابط الاتصال بقاعدة البيانات MongoDB
const MONGO_URI = 'mongodb+srv://yxxxcv5:Aliliwaa00@ali.wweyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// إعداد الاتصال بقاعدة البيانات
let db, usersCollection;
async function connectDB() {
    try {
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db('myFirstDatabase');
        usersCollection = db.collection('users');
        console.log('تم الاتصال بقاعدة البيانات MongoDB بنجاح');
    } catch (error) {
        console.error('فشل الاتصال بقاعدة البيانات:', error);
    }
}

connectDB();

// تمكين استقبال البيانات من الواجهة الأمامية بصيغة JSON
app.use(express.json());

// API لحفظ تقدم المستخدم
app.post('/saveProgress', async (req, res) => {
    const { userId, points } = req.body;

    if (!userId || !points) {
        return res.status(400).json({ message: 'يرجى إرسال userId و points' });
    }

    try {
        // تحديث أو إضافة بيانات المستخدم
        const result = await usersCollection.updateOne(
            { userId: userId },
            { $set: { points: points } },
            { upsert: true }  // إضافة المستخدم إذا لم يكن موجودًا
        );

        res.status(200).json({ message: 'تم حفظ التقدم بنجاح', result });
    } catch (error) {
        console.error('خطأ أثناء حفظ التقدم:', error);
        res.status(500).json({ message: 'فشل في حفظ التقدم' });
    }
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
