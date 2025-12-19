const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/hashtag', async (req, res) => {
    const { tag, apikey } = req.query;
    if (apikey !== "ZYNC-PRM-123") return res.status(401).json({ status: false, msg: "AUTH_FAILED" });
    if (!tag) return res.status(400).json({ status: false, msg: "TAG_REQUIRED" });

    try {
        const { data } = await axios.get(`https://www.tiktok.com/api/challenge/detail/?challengeName=${encodeURIComponent(tag)}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });

        const info = data.challengeInfo;
        // Hanya ambil data esensial (ID, Title, Stats)
        const cleanData = {
            id: info.challenge.id,
            title: info.challenge.title,
            stats: {
                videoCount: info.stats.videoCount,
                viewCount: info.stats.viewCount
            },
            published: info.challenge.createTime
        };

        res.json({ status: true, brand: "Zync Edge", result: cleanData });
    } catch (e) {
        res.status(502).json({ status: false, msg: "UPSTREAM_ERROR" });
    }
});

module.exports = app;
