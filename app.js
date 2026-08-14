const lists = {

    1: [
        "apple",
        "dog",
        "house",
        "yellow",
        "school"
    ],

    2: [
        "because",
        "friend",
        "little",
        "people",
        "pretty"
    ],

    3: [
        "different",
        "important",
        "thought",
        "through",
        "enough"
    ]

};


const params = new URLSearchParams(window.location.search);

const week = params.get("week");

const spellingWords = lists[week];


document.getElementById("weekTitle").textContent =
    "Week " + week;


let currentWordIndex = 0;


function speakWord() {
    const word = spellingWords[currentWordIndex];

    const speech = new SpeechSynthesisUtterance(word);

    speech.lang = "en-US";
    speech.rate = 0.7;
    speech.pitch = 1.0;
    speech.volume = 1.0;

    const voices = speechSynthesis.getVoices();

    const preferredVoice =
        voices.find(v => v.lang === "en-US" && v.name.toLowerCase().includes("samantha")) ||
        voices.find(v => v.lang === "en-US") ||
        voices.find(v => v.lang.startsWith("en"));

    if (preferredVoice) {
        speech.voice = preferredVoice;
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
}
