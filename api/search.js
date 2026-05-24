export default async function handler(req, res) {

    const query = req.query.q;

    const API_KEY =
        "7a0e8749e7217b565797ea67444d3bd8f754675da580079c125431400b034196";

    try {

        const response = await fetch(
            `https://serpapi.com/search.json?q=${query}&api_key=${API_KEY}`
        );

        const data = await response.json();

        res.status(200).json(data);

    } catch(error) {

        res.status(500).json({
            error: "Search failed"
        });
    }
}
