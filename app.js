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


const selectedProfileId =
    localStorage.getItem(
        "wormingtonSelectedProfile"
    ) || "raccoon";


const selectedProfile =
    profiles[selectedProfileId];


// ------------------------------------------------------
// HISTORY DATABASE
// ------------------------------------------------------

const HISTORY_KEY =
    "wormingtonSpellingHistory";


function createEmptyProfileHistory() {

    return {

        sessions: [],
        wordsPracticed: 0,
        perfectWords: 0,
        missedWords: 0,
        wordStats: {}

    };

}


function loadHistory() {

    const saved =
        localStorage.getItem(
            HISTORY_KEY
        );


    if (!saved) {

        return {
            raccoon: createEmptyProfileHistory(),
            potato: createEmptyProfileHistory(),
            bird: createEmptyProfileHistory()
        };

    }


    try {

        const loadedHistory =
            JSON.parse(saved);


        for (
            const id
            of Object.keys(profiles)
        ) {

            if (!loadedHistory[id]) {

                loadedHistory[id] =
                    createEmptyProfileHistory();

            }

        }


        return loadedHistory;

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


let history =
    loadHistory();


function saveHistory() {

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );

}


// ------------------------------------------------------
// CURRENT SESSION
// ------------------------------------------------------

let currentWordIndex = 0;

let currentLetterIndex = 0;

let currentWordMissed = false;

let correctWords = 0;

let missedWords = 0;

let sessionResults = [];


// ------------------------------------------------------
// AUDIO
// ------------------------------------------------------

let currentWordAudio = null;


const correctSound =
    new Audio(
        "sounds/correct.mp3"
    );


const wrongSound =
    new Audio(
        "sounds/wrong.mp3"
    );


// ------------------------------------------------------
// PAGE ELEMENTS
// ------------------------------------------------------

const wordDisplay =
    document.getElementById(
        "wordDisplay"
    );


const message =
    document.getElementById(
        "message"
    );


const progress =
    document.getElementById(
        "progress"
    );


const letterInput =
    document.getElementById(
        "letterInput"
    );


const resultsList =
    document.getElementById(
        "resultsList"
    );


const score =
    document.getElementById(
        "score"
    );


const practiceCard =
    document.getElementById(
        "practiceCard"
    );


const speakButton =
    document.getElementById(
        "speakButton"
    );


const profileName =
    document.getElementById(
        "profileName"
    );


const profileImage =
    document.getElementById(
        "profileImage"
    );


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
// DISPLAY CURRENT WORD
// ------------------------------------------------------

function showWord() {

    if (!wordDisplay) {
        return;
    }


    const word =
        spellingWords[
            currentWordIndex
        ];


    let display = "";


    for (
        let i = 0;
        i < word.length;
        i++
    ) {

        if (word[i] === " ") {

            display += "   ";

            continue;

        }


        if (
            i < currentLetterIndex
        ) {

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
// PLAY CURRENT WORD MP3
// ------------------------------------------------------

function speakWord() {

    const word =
        spellingWords[
            currentWordIndex
        ];


    const filename =
        word
            .toLowerCase()
            .replaceAll(" ", "_")
        + ".mp3";


    if (currentWordAudio) {

        currentWordAudio.pause();

        currentWordAudio.currentTime =
            0;

    }


    currentWordAudio =
        new Audio(
            "sounds/" + filename
        );


    currentWordAudio
        .play()
        .catch(error => {

            console.error(
                "Word audio could not play:",
                error
            );

        });


    if (letterInput) {

        letterInput.focus();

    }

}


// ------------------------------------------------------
// CHECK TYPED LETTER
// ------------------------------------------------------

function handleLetter(letter) {

    const word =
        spellingWords[
            currentWordIndex
        ];


    // Automatically skip spaces
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


        // Automatically skip spaces
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
// WRONG LETTER
// ------------------------------------------------------

function showWrongAnimation() {

    // Play wrong sound
    wrongSound.currentTime =
        0;


    wrongSound
        .play()
        .catch(error => {

            console.error(
                "Wrong sound could not play:",
                error
            );

        });


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
                    .remove(
                        "shake"
                    );

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
        spellingWords[
            currentWordIndex
        ];


    addResult(
        word,
        currentWordMissed
    );


    recordWordHistory(
        word,
        currentWordMissed
    );


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


        updateScore();


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
// RECORD WORD HISTORY
// ------------------------------------------------------

function recordWordHistory(
    word,
    missed
) {

    const profileHistory =
        history[
            selectedProfileId
        ];


    profileHistory
        .wordsPracticed++;


    if (
        !profileHistory
            .wordStats[word]
    ) {

        profileHistory
            .wordStats[word] = {

                attempts: 0,
                perfect: 0,
                missed: 0,
                lastPracticed: null

            };

    }


    const stats =
        profileHistory
            .wordStats[word];


    stats.attempts++;


    stats.lastPracticed =
        new Date()
            .toISOString();


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
// PERFECT WORD CELEBRATION
// ------------------------------------------------------

function showCelebration() {

    // Play correct sound
    correctSound.currentTime =
        0;


    correctSound
        .play()
        .catch(error => {

            console.error(
                "Correct sound could not play:",
                error
            );

        });


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
                .remove(
                    "success"
                );

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


        practiceCard
            .appendChild(
                emoji
            );


        setTimeout(
            () => {

                emoji.remove();

            },

            1300
        );

    }

}


// ------------------------------------------------------
// ADD RESULT TO SIDEBAR
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


    resultsList
        .appendChild(
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


    // Automatically play the next word
    speakWord();


    if (letterInput) {

        letterInput.focus();

    }

}


// ------------------------------------------------------
// FINISH PRACTICE SESSION
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
// SAVE COMPLETED SESSION
// ------------------------------------------------------

function saveSessionHistory() {

    const profileHistory =
        history[
            selectedProfileId
        ];


    const session = {

        date:
            new Date()
                .toISOString(),

        totalWords:
            spellingWords.length,

        perfect:
            correctWords,

        missed:
            missedWords,

        results:
            sessionResults

    };


    profileHistory
        .sessions
        .unshift(
            session
        );


    // Keep most recent 100 sessions
    if (
        profileHistory
            .sessions
            .length > 100
    ) {

        profileHistory.sessions =

            profileHistory
                .sessions
                .slice(
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


            // Clear input after every keypress
            letterInput.value =
                "";

        }

    );

}


// ------------------------------------------------------
// START
// ------------------------------------------------------

showWord();

updateScore();
