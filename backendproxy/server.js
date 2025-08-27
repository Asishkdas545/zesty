const express = require('express');
const cors = require('cors');

const app = express();   
const PORT = 5000;

app.use(cors());

// Proxy for fetching restaurant menu by id
app.get('/swiggy-menu', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ error: "Missing restaurant id" });
    }
    const swiggyMenuURL = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

    try {
        const response = await fetch(swiggyMenuURL, {
        headers: {
            'user-agent': 'Mozilla/5.0',
            'accept': 'application/json, text/plain, */*',
            'referer': 'https://www.swiggy.com/',
            'origin': 'https://www.swiggy.com'
        }
        });
        if (!response.ok) throw new Error("Swiggy menu API error");
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Error fetching menu:", err);
        res.status(500).json({ error: err.toString() });
    }
});

// Proxy for fetching restaurant list
app.get('/swiggy-list', async (req, res) => {
    const swiggyListURL = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

    try {
        const response = await fetch(swiggyListURL, {
        headers: {
            'user-agent': 'Mozilla/5.0',
            'accept': 'application/json, text/plain, */*',
            'referer': 'https://www.swiggy.com/',
            'origin': 'https://www.swiggy.com'
        }
        });
        if (!response.ok) {
        const errorBody = await response.text();
        console.error('Swiggy list API error response:', errorBody);
        throw new Error("Swiggy list API error - Status: " + response.status);
        }
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Error fetching list:", err);
        res.status(500).json({ error: err.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});