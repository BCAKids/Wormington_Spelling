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


// Get week number from URL
const params = new URLSearchParams(window.location.search);
const week = params.get("week") || "1";

const spellingWords = lists[week];

let currentWordIndex = 0;
let currentLetterIndex = 0;


// Get page elements
const weekTitle = document.getElementById("weekTitle");
const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const progress = document.getElementById("progress");
const hiddenInput = document.getElementById("hiddenInput");


// Show current week
weekTitle.textContent = "Week " + week;


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
        "Word " +
        (currentWordIndex + 1) +
        " of " +
        spellingWords.length;
}


function speakWord() {

    const word = spellingWords[currentWordIndex];

    const speech = new SpeechSynthesisUtterance(word);

    speech.lang = "en-US";
    speech.rate = 0.7;
    speech.pitch = 1;
    speech.volume = 1;

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

        message.textContent = "✓ Correct";

        showWordBlanks();

        if (currentLetterIndex === word.length) {

            message.textContent = "🎉 Great job!";

            hiddenInput.disabled = true;

            setTimeout(nextWord, 1500);
        }

    } else {

        message.textContent = "❌ Try again";

    }
}


function nextWord() {

    currentWordIndex++;
    currentLetterIndex = 0;

    hiddenInput.disabled = false;

    if (currentWordIndex >= spellingWords.length) {

        wordDisplay.textContent = "🎉";
        message.textContent = "You finished Week " + week + "!";
        progress.textContent = "";
        hiddenInput.style.display = "none";

        return;
    }

    message.textContent = "";

    showWordBlanks();

    speakWord();

    hiddenInput.focus();
}


hiddenInput.addEventListener("input", function () {

    const typed = hiddenInput.value;

    if (typed.length > 0) {

        const letter = typed.charAt(typed.length - 1);

        handleLetter(letter);

    }

    // Always clear the box after each keypress
    hiddenInput.value = "";
});


showWordBlanks();
