// ======================================================
// WORMINGTON SPELLING
// Main App
// ======================================================


// ------------------------------------------------------
// CURRENT SPELLING LIST
// Replace these words each week.
// ------------------------------------------------------

const spellingWords = [

    "confer",
    "deferential",
    "infer",
    "reference",
    "suffer",
    "vociferous",
    "monolith",
    "monotone",
    "monotony",
    "activated",
    "adorned",
    "announced",
    "confessed",
    "deposited",
    "disguised",
    "fastened",
    "guided",
    "imagined",
    "interrupted",
    "whispered",
    "conifer",
    "defer",
    "fertile",
    "referendum",
    "transfer",
    "carbon monoxide",
    "monarchy",
    "monochrome",
    "monogram",
    "monologue",
    "monotheism",
    "attempted",
    "celebrated",
    "persuaded",
    "unresolved"

];


// ------------------------------------------------------
// PROFILES
// ------------------------------------------------------

const profiles = {

    raccoon: {
        name: "Raccoon",
        image: "images/raccoon.png"
    },

    potato: {
        name: "Potato",
        image: "images/potato.png"
    },

    bird: {
        name: "Bird",
        image: "images/bird.png"
    }

};


// Whichever profile was selected on the start screen.
// Until we modify index.html, Raccoon will be the default.

const selectedProfileId =
    localStorage.getItem("wormingtonSelectedProfile")
    || "raccoon";

const selectedProfile =
    profiles[selectedProfileId];


// ------------------------------------------------------
// HISTORY DATABASE
// ------------------------------------------------------

const HISTORY_KEY =
    "wormingtonSpellingHistory";


function loadHistory() {

    const saved =
        localStorage.getItem(HISTORY_KEY);

    if (!saved) {

        return {
            raccoon: createEmptyProfileHistory(),
            potato: createEmptyProfileHistory(),
            bird: createEmptyProfileHistory()
        };

    }

    try {

        const history =
            JSON.parse(saved);

        // Make sure all three profiles exist
        for (const id of Object.keys(profiles)) {

            if (!history[id]) {

                history[id] =
                    createEmptyProfileHistory();

            }

        }

        return history;

    }

    catch (error) {

        console.error(
            "Could not load spelling history:",
            error
        );

        return {
            raccoon: createEmptyProfileHistory(),
            potato: createEmptyProfileHistory(),
            bird: createEmptyProfileHistory()
        };

    }

}


function createEmptyProfileHistory() {

    return {

        sessions: [],
        wordsPracticed: 0,
        perfectWords: 0,
        missedWords: 0,
        wordStats: {}

    };

}


function saveHistory() {

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );

}


let history =
    loadHistory();


// ------------------------------------------------------
// CURRENT SESSION
// ------------------------------------------------------

let currentWordIndex = 0;

let currentLetterIndex = 0;

let currentWordMissed = false;

let correctWords = 0;

let missedWords = 0;


// Results from THIS practice session.

let sessionResults = [];


// ------------------------------------------------------
// PAGE ELEMENTS
// ------------------------------------------------------

const wordDisplay =
    document.getElementById("wordDisplay");

const message =
    document.getElementById("message");

const progress =
    document.getElementById("progress");

const letterInput =
    document.getElementById("letterInput");

const resultsList =
    document.getElementById("resultsList");

const score =
    document.getElementById("score");

const practiceCard =
    document.getElementById("practiceCard");

const speakButton =
    document.getElementById("speakButton");


// These won't exist until we update practice.html.
// That's okay — the code safely ignores them for now.

const profileName =
    document.getElementById("profileName");

const profileImage =
    document.getElementById("profileImage");


// ------------------------------------------------------
// SHOW SELECTED PROFILE
// ------------------------------------------------------

if (profileName) {

    profileName.textContent =
        selectedProfile.name;

}


if (profileImage) {

    profileImage.src =
        selectedProfile.image;

    profileImage.alt =
        selectedProfile.name;

}


// ------------------------------------------------------
// DISPLAY WORD
// ------------------------------------------------------

function showWord() {

    if (!wordDisplay) {
        return;
    }


    const word =
        spellingWords[currentWordIndex];


    let display = "";


    for (
        let i = 0;
        i < word.length;
        i++
    ) {

        // Spaces appear automatically
        // so the student doesn't have to type them.

        if (word[i] === " ") {

            display += "   ";

            continue;

        }


        if (i < currentLetterIndex) {

            display +=
                word[i].toUpperCase()
                + " ";

        }

        else {

            display += "_ ";

        }

    }


    wordDisplay.textContent =
        display;


    if (progress) {

        progress.textContent =

            "Word "
            + (currentWordIndex + 1)
            + " of "
            + spellingWords.length;

    }

}


// ------------------------------------------------------
// SPEAK CURRENT WORD
// ------------------------------------------------------

function speakWord() {

    const word =
        spellingWords[currentWordIndex];


    const speech =
        new SpeechSynthesisUtterance(
            word
        );


    speech.lang =
        "en-US";

    speech.rate =
        0.72;

    speech.pitch =
        1;

    speech.volume =
        1;


    speechSynthesis.cancel();

    speechSynthesis.speak(
        speech
    );


    if (letterInput) {

        letterInput.focus();

    }

}


// ------------------------------------------------------
// CHECK LETTER
// ------------------------------------------------------

function handleLetter(letter) {

    const word =
        spellingWords[currentWordIndex];


    // Automatically skip spaces.

    while (
        word[currentLetterIndex]
        === " "
    ) {

        currentLetterIndex++;

    }


    const correctLetter =

        word[
            currentLetterIndex
        ].toLowerCase();


    if (
        letter.toLowerCase()
        ===
        correctLetter
    ) {

        currentLetterIndex++;


        // Skip space after a correct letter.

        while (
            word[currentLetterIndex]
            === " "
        ) {

            currentLetterIndex++;

        }


        showWord();


        if (message) {

            message.textContent =
                "✓";

        }


        if (
            currentLetterIndex
            >=
            word.length
        ) {

            finishWord();

        }

    }

    else {

        currentWordMissed =
            true;

        showWrongAnimation();

    }

}


// ------------------------------------------------------
// WRONG LETTER ANIMATION
// ------------------------------------------------------

function showWrongAnimation() {

    const funnyMessages = [

        "Nope! 😜",
        "Almost! 🤪",
        "Try that again! 🫣",
        "Oops! 🙃",
        "Not that one! 😂",
        "Nice try! 😎",
        "Bruh. 😂",
        "That letter betrayed you. 😆"

    ];


    const randomMessage =

        funnyMessages[
            Math.floor(
                Math.random()
                *
                funnyMessages.length
            )
        ];


    if (message) {

        message.textContent =
            randomMessage;

    }


    if (practiceCard) {

        practiceCard.classList.add(
            "shake"
        );


        setTimeout(
            () => {

                practiceCard
                    .classList
                    .remove("shake");

            },

            400
        );

    }

}


// ------------------------------------------------------
// FINISH CURRENT WORD
// ------------------------------------------------------

function finishWord() {

    const word =
        spellingWords[currentWordIndex];


    // Add result to sidebar.

    addResult(
        word,
        currentWordMissed
    );


    // Save permanent history.

    recordWordHistory(
        word,
        currentWordMissed
    );


    // Save result for this session.

    sessionResults.push({

        word: word,

        missed:
            currentWordMissed

    });


    if (letterInput) {

        letterInput.disabled =
            true;

    }


    if (currentWordMissed) {

        missedWords++;


        if (message) {

            message.textContent =
                "You got it! 👍";

        }

    }

    else {

        correctWords++;

        updateScore();

        showCelebration();

    }


    setTimeout(
        nextWord,
        1700
    );

}


// ------------------------------------------------------
// RECORD PERMANENT WORD HISTORY
// ------------------------------------------------------

function recordWordHistory(
    word,
    missed
) {

    const profileHistory =
        history[selectedProfileId];


    profileHistory.wordsPracticed++;


    if (
        !profileHistory.wordStats[word]
    ) {

        profileHistory.wordStats[word] = {

            attempts: 0,
            perfect: 0,
            missed: 0,

            lastPracticed:
                null

        };

    }


    const stats =
        profileHistory.wordStats[word];


    stats.attempts++;


    stats.lastPracticed =
        new Date().toISOString();


    if (missed) {

        stats.missed++;

        profileHistory
            .missedWords++;

    }

    else {

        stats.perfect++;

        profileHistory
            .perfectWords++;

    }


    saveHistory();

}


// ------------------------------------------------------
// PERFECT WORD ANIMATION
// ------------------------------------------------------

function showCelebration() {

    const messages = [

        "🎉 AWESOME!",
        "⭐ NAILED IT!",
        "🔥 PERFECT!",
        "😎 NICE!",
        "🚀 GREAT JOB!",
        "💯 TOO EASY!",
        "🏆 LET'S GO!"

    ];


    if (message) {

        message.textContent =

            messages[
                Math.floor(
                    Math.random()
                    *
                    messages.length
                )
            ];

    }


    if (!practiceCard) {
        return;
    }


    practiceCard.classList.add(
        "success"
    );


    setTimeout(
        () => {

            practiceCard
                .classList
                .remove("success");

        },

        600
    );


    const emojis = [

        "⭐",
        "🎉",
        "🚀",
        "😎",
        "✨",
        "🔥",
        "💯"

    ];


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const emoji =
            document.createElement(
                "div"
            );


        emoji.className =
            "celebration";


        emoji.textContent =

            emojis[
                Math.floor(
                    Math.random()
                    *
                    emojis.length
                )
            ];


        emoji.style.left =

            (
                20
                +
                Math.random() * 60
            )
            + "%";


        emoji.style.bottom =
            "50px";


        practiceCard.appendChild(
            emoji
        );


        setTimeout(
            () =>
                emoji.remove(),

            1300
        );

    }

}


// ------------------------------------------------------
// ADD RESULT TO TODAY'S SIDEBAR
// ------------------------------------------------------

function addResult(
    word,
    missed
) {

    if (!resultsList) {
        return;
    }


    const item =
        document.createElement(
            "li"
        );


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


    resultsList.appendChild(
        item
    );

}


// ------------------------------------------------------
// UPDATE SCORE
// ------------------------------------------------------

function updateScore() {

    if (!score) {
        return;
    }


    score.textContent =

        "Perfect: "
        + correctWords
        +
        "   |   Missed: "
        + missedWords;

}


// ------------------------------------------------------
// NEXT WORD
// ------------------------------------------------------

function nextWord() {

    currentWordIndex++;

    currentLetterIndex =
        0;

    currentWordMissed =
        false;


    if (letterInput) {

        letterInput.disabled =
            false;

    }


    if (
        currentWordIndex
        >=
        spellingWords.length
    ) {

        finishPractice();

        return;

    }


    if (message) {

        message.textContent =
            "";

    }


    showWord();


    // Automatically says every word
    // after the first one.

    speakWord();


    if (letterInput) {

        letterInput.focus();

    }

}


// ------------------------------------------------------
// FINISH ENTIRE PRACTICE SESSION
// ------------------------------------------------------

function finishPractice() {

    saveSessionHistory();


    if (wordDisplay) {

        wordDisplay.textContent =
            "🏆";

    }


    if (message) {

        message.textContent =
            "Practice Complete!";

    }


    if (progress) {

        progress.textContent =

            correctWords
            +
            " perfect out of "
            +
            spellingWords.length;

    }


    if (letterInput) {

        letterInput.style.display =
            "none";

    }


    if (speakButton) {

        speakButton.style.display =
            "none";

    }


    showCelebration();

}


// ------------------------------------------------------
// SAVE SESSION HISTORY
// ------------------------------------------------------

function saveSessionHistory() {

    const profileHistory =
        history[selectedProfileId];


    const session = {

        date:
            new Date().toISOString(),

        totalWords:
            spellingWords.length,

        perfect:
            correctWords,

        missed:
            missedWords,

        results:
            sessionResults

    };


    profileHistory.sessions.unshift(
        session
    );


    // Keep the latest 100 sessions.

    if (
        profileHistory.sessions.length
        > 100
    ) {

        profileHistory.sessions =
            profileHistory.sessions.slice(
                0,
                100
            );

    }


    saveHistory();

}


// ------------------------------------------------------
// KEYBOARD INPUT
// ------------------------------------------------------

if (letterInput) {

    letterInput.addEventListener(

        "input",

        function () {

            const typed =
                letterInput.value;


            if (
                typed.length > 0
            ) {

                const letter =

                    typed.charAt(
                        typed.length - 1
                    );


                handleLetter(
                    letter
                );

            }


            // Clear input after each key.

            letterInput.value =
                "";

        }

    );

}


// ------------------------------------------------------
// START PAGE
// ------------------------------------------------------

showWord();

updateScore();
