const API_KEY =
    "b3389d8ce47c2a473c7820efd50bf5d5b74c05f4699b9e49658520f20204ad9d";

function addMessage(message, className) {

    const chatBox =
        document.getElementById("chat-box");

    const div =
        document.createElement("div");

    div.className = className;

    div.innerHTML = message;

    chatBox.appendChild(div);

    chatBox.scrollTop =
        chatBox.scrollHeight;
}

async function searchGoogle(query) {

    try {

        const response = await fetch(
            `https://serpapi.com/search.json?q=${query}&api_key=${API_KEY}`
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

        return `
            No Finacle-related results found.
        `;

    } catch(error) {

        console.error(error);

        return `
            Error searching Google.
        `;
    }
}

async function sendMessage() {

    const input =
        document.getElementById("message");

    const userMessage =
        input.value.trim();

    if (!userMessage) return;

    addMessage(userMessage, "user");

    input.value = "";

    addMessage(
        "Searching Google...",
        "bot"
    );

    const answer =
        await searchGoogle(
            "Finacle banking " + userMessage
        );

    document
        .querySelector(".bot:last-child")
        .innerHTML = answer;

    speakText(
        answer.replace(/<[^>]*>/g, "")
    );
}

function speakText(text) {

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(speech);
}

function startVoice() {

    if (
        !('webkitSpeechRecognition' in window)
    ) {

        alert(
            "Voice recognition not supported"
        );

        return;
    }

    const recognition =
        new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = (event) => {

        const transcript =
            event.results[0][0].transcript;

        document.getElementById("message").value =
            transcript;

        sendMessage();
    };
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .getElementById("message")
            .addEventListener(
                "keypress",
                function(event) {

                    if (event.key === "Enter") {
                        sendMessage();
                    }
                }
            );
    }
);
