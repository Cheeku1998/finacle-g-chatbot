module.exports = async (req, res) => {

    const query = req.query.q;

    const API_KEY =
        "YOUR_NEW_SERPAPI_KEY";

    try {

        const response = await fetch(
            `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${API_KEY}`
        );

        const data = await response.json();

        res.status(200).json(data);

    } catch(error) {

        console.error(error);

        res.status(500).json({
            error: "Search failed"
        });
    }
};
