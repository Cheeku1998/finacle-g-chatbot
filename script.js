async function searchGoogle(query) {

    try {

        const response = await fetch(
            `/api/search?q=${query}`
        );

        const data = await response.json();

        console.log(data);

        if (
            data.organic_results &&
            data.organic_results.length > 0
        ) {

            const result =
                data.organic_results[0];

            return `
                <b>${result.title}</b>
                <br><br>

                ${result.snippet}

                <br><br>

                <a href="${result.link}"
                   target="_blank">
                    Read More
                </a>
            `;
        }

        return "No results found.";

    } catch(error) {

        console.error(error);

        return "Search failed.";
    }
}
