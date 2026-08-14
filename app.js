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

    speech.rate = 0.8;

    speechSynthesis.speak(speech);

}
