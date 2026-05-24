module.exports = async (req, res) => {

    const query = req.query.q;

    const API_KEY =
        "d0c732a14f863355259116aeede43b413a0bad66709f879b3b23994cf6bc8a9c";

    try {

        const response = await fetch(
            `https://serpapi.com/search.json?q=${query}&api_key=${API_KEY}`
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
