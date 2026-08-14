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


// Get week from URL
const params = new URLSearchParams(window.location.search);
const week = params.get("week") || "1";

const spellingWords = lists[week];


// Current position
let currentWordIndex = 0;
let currentLetterIndex = 0;


// Tracks whether child made a mistake
// on the CURRENT word
let currentWordMissed = false;


// Page elements
const weekTitle =
    document.getElementById("weekTitle");

const wordDisplay =
    document.getElementById("wordDisplay");

const message =
    document.getElementById("message");

const progress =
    document.getElementById("progress");

const hiddenInput =
    document.getElementById("hiddenInput");

const resultsList =
    document.getElementById("resultsList");


weekTitle.textContent = "Week " + week;



// ------------------------------------
// DISPLAY WORD
// ------------------------------------

function showWordBlanks() {

    const word = spellingWords[currentWordIndex];

    let display = "";

    for (let i = 0; i < word.length; i++) {

        if (i < currentLetterIndex) {

            display +=
                word[i].toUpperCase() + " ";

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



// ------------------------------------
// SPEAK WORD
// ------------------------------------

function speakWord() {

    const word =
        spellingWords[currentWordIndex];

    const speech =
        new SpeechSynthesisUtterance(word);

    speech.lang = "en-US";
    speech.rate = 0.7;
    speech.pitch = 1;
    speech.volume = 1;

    const voices =
        speechSynthesis.getVoices();

    const preferredVoice =

        voices.find(v =>
            v.lang === "en-US" &&
            v.name.toLowerCase().includes("samantha")
        )

        ||

        voices.find(v =>
            v.lang === "en-US"
        )

        ||

        voices.find(v =>
            v.lang.startsWith("en")
        );


    if (preferredVoice) {

        speech.voice =
            preferredVoice;

    }


    speechSynthesis.cancel();

    speechSynthesis.speak(speech);

    hiddenInput.focus();
}



// ------------------------------------
// CHECK LETTER
// ------------------------------------

function handleLetter(letter) {

    const word =
        spellingWords[currentWordIndex];

    const correctLetter =
        word[currentLetterIndex].toLowerCase();


    if (
        letter.toLowerCase()
        ===
        correctLetter
    ) {

        currentLetterIndex++;

        message.textContent =
            "✓ Correct";

        showWordBlanks();


        // Word completed
        if (
            currentLetterIndex
            ===
            word.length
        ) {

            finishWord();

        }

    }

    else {

        // Remember that THIS word
        // had at least one mistake

        currentWordMissed = true;

        message.textContent =
            "❌ Try again";

    }

}



// ------------------------------------
// FINISH WORD
// ------------------------------------

function finishWord() {

    const word =
        spellingWords[currentWordIndex];


    addResult(
        word,
        currentWordMissed
    );


    if (currentWordMissed) {

        message.textContent =
            "Good job finishing it!";

    }

    else {

        message.textContent =
            "🎉 Perfect!";

    }


    hiddenInput.disabled = true;


    setTimeout(
        nextWord,
        1500
    );

}



// ------------------------------------
// ADD WORD TO SIDEBAR
// ------------------------------------

function addResult(word, missed) {

    const item =
        document.createElement("li");


    if (missed) {

        item.textContent =
            "❌ " + word;

        item.className =
            "missed";

    }

    else {

        item.textContent =
            "✅ " + word;

        item.className =
            "correct";

    }


    resultsList.appendChild(item);

}



// ------------------------------------
// NEXT WORD
// ------------------------------------

function nextWord() {

    currentWordIndex++;

    currentLetterIndex = 0;

    currentWordMissed = false;

    hiddenInput.disabled = false;


    // Finished entire list
    if (
        currentWordIndex
        >=
        spellingWords.length
    ) {

        wordDisplay.textContent =
            "🎉";

        message.textContent =
            "You finished Week "
            + week +
            "!";

        progress.textContent = "";

        hiddenInput.style.display =
            "none";

        return;

    }


    message.textContent = "";

    showWordBlanks();


    // Automatically say next word
    speakWord();


    hiddenInput.focus();

}



// ------------------------------------
// KEYBOARD INPUT
// ------------------------------------

hiddenInput.addEventListener(
    "input",
    function () {

        const typed =
            hiddenInput.value;


        if (typed.length > 0) {

            const letter =
                typed.charAt(
                    typed.length - 1
                );

            handleLetter(letter);

        }


        // Always empty input field
        hiddenInput.value = "";

    }
);



// ------------------------------------
// START
// ------------------------------------

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


// Get week from URL
const params = new URLSearchParams(window.location.search);
const week = params.get("week") || "1";

const spellingWords = lists[week];


// Current position
let currentWordIndex = 0;
let currentLetterIndex = 0;


// Tracks whether child made a mistake
// on the CURRENT word
let currentWordMissed = false;


// Page elements
const weekTitle =
    document.getElementById("weekTitle");

const wordDisplay =
    document.getElementById("wordDisplay");

const message =
    document.getElementById("message");

const progress =
    document.getElementById("progress");

const hiddenInput =
    document.getElementById("hiddenInput");

const resultsList =
    document.getElementById("resultsList");


weekTitle.textContent = "Week " + week;



// ------------------------------------
// DISPLAY WORD
// ------------------------------------

function showWordBlanks() {

    const word = spellingWords[currentWordIndex];

    let display = "";

    for (let i = 0; i < word.length; i++) {

        if (i < currentLetterIndex) {

            display +=
                word[i].toUpperCase() + " ";

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



// ------------------------------------
// SPEAK WORD
// ------------------------------------

function speakWord() {

    const word =
        spellingWords[currentWordIndex];

    const speech =
        new SpeechSynthesisUtterance(word);

    speech.lang = "en-US";
    speech.rate = 0.7;
    speech.pitch = 1;
    speech.volume = 1;

    const voices =
        speechSynthesis.getVoices();

    const preferredVoice =

        voices.find(v =>
            v.lang === "en-US" &&
            v.name.toLowerCase().includes("samantha")
        )

        ||

        voices.find(v =>
            v.lang === "en-US"
        )

        ||

        voices.find(v =>
            v.lang.startsWith("en")
        );


    if (preferredVoice) {

        speech.voice =
            preferredVoice;

    }


    speechSynthesis.cancel();

    speechSynthesis.speak(speech);

    hiddenInput.focus();
}



// ------------------------------------
// CHECK LETTER
// ------------------------------------

function handleLetter(letter) {

    const word =
        spellingWords[currentWordIndex];

    const correctLetter =
        word[currentLetterIndex].toLowerCase();


    if (
        letter.toLowerCase()
        ===
        correctLetter
    ) {

        currentLetterIndex++;

        message.textContent =
            "✓ Correct";

        showWordBlanks();


        // Word completed
        if (
            currentLetterIndex
            ===
            word.length
        ) {

            finishWord();

        }

    }

    else {

        // Remember that THIS word
        // had at least one mistake

        currentWordMissed = true;

        message.textContent =
            "❌ Try again";

    }

}



// ------------------------------------
// FINISH WORD
// ------------------------------------

function finishWord() {

    const word =
        spellingWords[currentWordIndex];


    addResult(
        word,
        currentWordMissed
    );


    if (currentWordMissed) {

        message.textContent =
            "Good job finishing it!";

    }

    else {

        message.textContent =
            "🎉 Perfect!";

    }


    hiddenInput.disabled = true;


    setTimeout(
        nextWord,
        1500
    );

}



// ------------------------------------
// ADD WORD TO SIDEBAR
// ------------------------------------

function addResult(word, missed) {

    const item =
        document.createElement("li");


    if (missed) {

        item.textContent =
            "❌ " + word;

        item.className =
            "missed";

    }

    else {

        item.textContent =
            "✅ " + word;

        item.className =
            "correct";

    }


    resultsList.appendChild(item);

}



// ------------------------------------
// NEXT WORD
// ------------------------------------

function nextWord() {

    currentWordIndex++;

    currentLetterIndex = 0;

    currentWordMissed = false;

    hiddenInput.disabled = false;


    // Finished entire list
    if (
        currentWordIndex
        >=
        spellingWords.length
    ) {

        wordDisplay.textContent =
            "🎉";

        message.textContent =
            "You finished Week "
            + week +
            "!";

        progress.textContent = "";

        hiddenInput.style.display =
            "none";

        return;

    }


    message.textContent = "";

    showWordBlanks();


    // Automatically say next word
    speakWord();


    hiddenInput.focus();

}



// ------------------------------------
// KEYBOARD INPUT
// ------------------------------------

hiddenInput.addEventListener(
    "input",
    function () {

        const typed =
            hiddenInput.value;


        if (typed.length > 0) {

            const letter =
                typed.charAt(
                    typed.length - 1
                );

            handleLetter(letter);

        }


        // Always empty input field
        hiddenInput.value = "";

    }
);



// ------------------------------------
// START
// ------------------------------------

showWordBlanks();
