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

let currentWordIndex = 0;
let currentLetterIndex = 0;

const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const progress = document.getElementById("progress");
const hiddenInput = document.getElementById("hiddenInput");

document.getElementById("weekTitle").textContent = "Week " + week;


function showWordBlanks() {

    const word = spellingWords[currentWordIndex];

    let display = "";

    for (let i = 0; i < word.length; i++) {

        if (i < currentLetterIndex) {
            display += word[i].toUpperCase() + " ";
        } else {
            display += "_ ";
        }

    }

    wordDisplay.textContent = display;

    progress.textContent =
        "Word " + (currentWordIndex + 1) +
        " of " + spellingWords.length;
}


function speakWord() {

    const word = spellingWords[currentWordIndex];

    const speech = new SpeechSynthesisUtterance(word);

    speech.lang = "en-US";
    speech.rate = 0.7;
    speech.pitch = 1.0;
    speech.volume = 1.0;

    const voices = speechSynthesis.getVoices();

    const preferredVoice =
        voices.find(v =>
            v.lang === "en-US" &&
            v.name.toLowerCase().includes("samantha")
        ) ||
        voices.find(v => v.lang === "en-US") ||
        voices.find(v => v.lang.startsWith("en"));

    if (preferredVoice) {
        speech.voice = preferredVoice;
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);

    hiddenInput.focus();
}


function handleLetter(letter) {

    const word = spellingWords[currentWordIndex];

    const correctLetter =
        word[currentLetterIndex].toLowerCase();

    if (letter.toLowerCase() === correctLetter) {

        currentLetterIndex++;

        message.textContent = "✓";
        showWordBlanks();

        if (currentLetterIndex === word.length) {

            message.textContent = "🎉 Great job!";

            setTimeout(nextWord, 1200);
        }

    } else {

        message.textContent = "Try again";

    }
}


function nextWord() {

    currentWordIndex++;
    currentLetterIndex = 0;

    if (currentWordIndex >= spellingWords.length) {

        wordDisplay.textContent = "🎉";
        message.textContent = "You finished the list!";
        progress.textContent = "";

        return;
    }

    message.textContent = "";

    showWordBlanks();

    speakWord();
}


hiddenInput.addEventListener("input", function () {

    const typed = hiddenInput.value;

    if (typed.length > 0) {

        const letter =
            typed.charAt(typed.length - 1);

        handleLetter(letter);

    }

    hiddenInput.value = "";

});


document.body.addEventListener("click", function () {

    hiddenInput.focus();

});


showWordBlanks();const lists = {

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
