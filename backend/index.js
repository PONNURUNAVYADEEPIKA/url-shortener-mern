import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Url from './models/Url.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

// Helper function to generate short code
function genCode(len = 6) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < len; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// POST /api/shorten
app.post('/api/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    let shortCode = genCode();
    while (await Url.findOne({ shortCode })) {
      shortCode = genCode();
    }

    const newUrl = await Url.create({ originalUrl: url, shortCode });
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /:shortcode -> redirect
app.get('/:shortcode', async (req, res) => {
  try {
    const found = await Url.findOne({ shortCode: req.params.shortcode });
    if (!found) {
      return res.status(404).send('Not found');
    }
    found.visits += 1;
    await found.save();
    return res.redirect(found.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Bonus: Admin list
app.get('/api/admin/list', async (req, res) => {
  try {
    const urls = await Url.find().sort({ visits: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
