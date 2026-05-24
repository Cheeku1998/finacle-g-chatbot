const API_KEY = "AIzaSyCez8s-50rKNPSxTUsdET6Sot4Lolj7xkI";

const SEARCH_ENGINE_ID =
    "f78ddbc8ecc9f416d";

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
            `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
        );

        const data = await response.json();

        console.log(data);

        if (
            data.items &&
            data.items.length > 0
        ) {

            return `
                <b>${data.items[0].title}</b>
                <br><br>

                ${data.items[0].snippet}

                <br><br>

                <a href="${data.items[0].link}"
                   target="_blank">
                    Read More
                </a>
            `;
        }

        return "No Finacle-related results found.";

    } catch(error) {

        console.error(error);

        return "Error fetching Google results.";
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

    addMessage("Searching Google...", "bot");

    const answer =
        await searchGoogle(
            "Finacle " + userMessage
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
