const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// الاتصال بقاعدة بيانات MongoDB
mongoose.connect('mongodb+srv://alifakarr:Aliliw>
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('تم الاتصال بقاعدة البيانات Mong>
}).catch((err) => {
    console.error('خطأ في الاتصال بقاعدة البيانا>
});

// إنشاء مخطط المستخدم
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, uniq>
    points: { type: Number, default: 0 }
});

// إنشاء نموذج المستخدم
const User = mongoose.model('User', userSchema);

// API لحفظ النقاط
app.post('/updatePoints', async (req, res) => {
    const { userId, points } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { userId: userId },
            { points: points },
            { upsert: true, new: true }
        );
        res.json({ success: true, points: user.p>
    } catch (err) {
        console.error('خطأ في تحديث النقاط:', er>
        res.status(500).json({ error: 'خطأ في ال>
    }
});

// API لاسترجاع النقاط
app.get('/getUserPoints', async (req, res) => {


// API لاسترجاع النقاط
app.get('/getUserPoints', async (req, res) => {
    const { userId } = req.query;

    try {
        const user = await User.findOne({ userId>
        if (user) {
            res.json({ points: user.points });
        } else {
            res.json({ points: 0 });
        }
    } catch (err) {
        console.error('خطأ في استرجاع النقاط:', >
        res.status(500).json({ error: 'خطأ في ال>
    }
});

app.listen(port, () => {
    console.log(`الخادم يعمل على http://localhos>
});
