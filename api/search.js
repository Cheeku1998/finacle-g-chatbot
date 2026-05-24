module.exports = async (req, res) => {

    const query = req.query.q;

    const API_KEY =
        "d8e76c549009cf50c134ddefd13834be2359172b31b18be769d290c27bb8ea56";

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
