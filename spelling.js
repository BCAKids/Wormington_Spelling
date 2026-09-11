// ======================================================
// WORMINGTON PRACTICE
// SPELLING
// ======================================================


// ======================================================
// SPELLING WORDS
// ======================================================

// Pull all spelling words from weekly-words.js

const masterSpellingWords =
    weeklyWords.map(
        item => item.word
    );


// ======================================================
// SHUFFLE
// ======================================================

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

    return array;
}


// Randomize spelling order every time the page loads.

const spellingWords =
    shuffleArray(
        [...masterSpellingWords]
    );


// ======================================================
// SESSION VARIABLES
// ======================================================

let currentWordIndex = 0;

let currentLetterIndex = 0;

let currentWordMissed = false;

let correctWords = 0;

let missedWords = 0;


// ======================================================
// AUDIO
// ======================================================

let currentWordAudio = null;

const correctSound =
    new Audio(
        "sounds/correct.mp3"
    );

const wrongSound =
    new Audio(
        "sounds/wrong.mp3"
    );

correctSound.preload =
    "auto";

wrongSound.preload =
    "auto";


// ======================================================
// PAGE ELEMENTS
// ======================================================

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


// ======================================================
// DISPLAY WORD
// ======================================================

function showWord() {

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

        if (
            word[i] === " "
        ) {

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

    progress.textContent =
        "Word "
        + (currentWordIndex + 1)
        + " of "
        + spellingWords.length;

}


// ======================================================
// PLAY SPELLING WORD
// ======================================================

function speakWord() {

    const word =
        spellingWords[
            currentWordIndex
        ];

    const filename =

        word
            .toLowerCase()
            .replaceAll(
                " ",
                "_"
            )

        + ".mp3";


    if (
        currentWordAudio
    ) {

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
        .catch(
            error => {

                console.error(
                    "Word audio could not play:",
                    error
                );

            }
        );


    letterInput.focus();

}


// ======================================================
// CHECK LETTER
// ======================================================

function handleLetter(letter) {

    const word =
        spellingWords[
            currentWordIndex
        ];


    // Ignore non-letter characters.

    if (
        !/^[a-zA-Z]$/.test(letter)
    ) {

        return;

    }


    // Skip spaces automatically.

    while (
        word[currentLetterIndex]
        === " "
    ) {

        currentLetterIndex++;

    }


    if (
        currentLetterIndex
        >=
        word.length
    ) {

        return;

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


        while (
            word[currentLetterIndex]
            === " "
        ) {

            currentLetterIndex++;

        }


        showWord();


        message.textContent =
            "✓";


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


// ======================================================
// WRONG LETTER
// ======================================================

function showWrongAnimation() {

    wrongSound.pause();

    wrongSound.currentTime =
        0;


    wrongSound
        .play()
        .catch(
            error => {

                console.error(
                    "Wrong sound could not play:",
                    error
                );

            }
        );


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


    message.textContent =

        funnyMessages[
            Math.floor(
                Math.random()
                *
                funnyMessages.length
            )
        ];


    practiceCard.classList.remove(
        "shake"
    );


    void practiceCard.offsetWidth;


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


// ======================================================
// FINISH WORD
// ======================================================

function finishWord() {

    const word =
        spellingWords[
            currentWordIndex
        ];


    addResult(
        word,
        currentWordMissed
    );


    letterInput.disabled =
        true;


    if (
        currentWordMissed
    ) {

        missedWords++;

        updateScore();

        message.textContent =
            "You got it! 👍";

    }

    else {

        correctWords++;

        updateScore();

        playCorrectSound();

        showCelebration();

    }


    setTimeout(
        nextWord,
        1700
    );

}


// ======================================================
// CORRECT SOUND
// ======================================================

function playCorrectSound() {

    correctSound.pause();

    correctSound.currentTime =
        0;


    correctSound
        .play()
        .catch(
            error => {

                console.error(
                    "Correct sound could not play:",
                    error
                );

            }
        );

}


// ======================================================
// CELEBRATION
// ======================================================

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


    message.textContent =

        messages[
            Math.floor(
                Math.random()
                *
                messages.length
            )
        ];


    practiceCard.classList.remove(
        "success"
    );


    void practiceCard.offsetWidth;


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


        practiceCard.appendChild(
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


// ======================================================
// SESSION RESULT SIDEBAR
// ======================================================

function addResult(
    word,
    missed
) {

    const item =
        document.createElement(
            "li"
        );


    if (
        missed
    ) {

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


// ======================================================
// SCORE
// ======================================================

function updateScore() {

    score.textContent =

        "Perfect: "
        + correctWords
        +
        "   |   Missed: "
        + missedWords;

}


// ======================================================
// NEXT WORD
// ======================================================

function nextWord() {

    currentWordIndex++;

    currentLetterIndex =
        0;

    currentWordMissed =
        false;


    if (
        currentWordIndex
        >=
        spellingWords.length
    ) {

        finishPractice();

        return;

    }


    letterInput.disabled =
        false;

    letterInput.value =
        "";

    message.textContent =
        "";


    showWord();


    // Automatically announce
    // every word after the first.

    speakWord();


    letterInput.focus();

}


// ======================================================
// FINISH PRACTICE
// ======================================================

function finishPractice() {

    if (
        currentWordAudio
    ) {

        currentWordAudio.pause();

    }


    wordDisplay.textContent =
        "🏆";


    message.textContent =
        "Practice Complete!";


    progress.textContent =

        correctWords
        +
        " perfect out of "
        +
        spellingWords.length;


    letterInput.style.display =
        "none";


    speakButton.style.display =
        "none";


    showFinalCelebration();

}


// ======================================================
// FINAL CELEBRATION
// ======================================================

function showFinalCelebration() {

    practiceCard
        .classList
        .add(
            "success"
        );


    const emojis = [

        "🏆",
        "⭐",
        "🎉",
        "🚀",
        "🔥",
        "💯"

    ];


    for (
        let i = 0;
        i < 14;
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
                5
                +
                Math.random() * 90
            )

            + "%";


        emoji.style.bottom =
            "25px";


        practiceCard.appendChild(
            emoji
        );


        setTimeout(
            () => {

                emoji.remove();

            },

            1300
        );

    }


    setTimeout(
        () => {

            practiceCard
                .classList
                .remove(
                    "success"
                );

        },

        700
    );

}


// ======================================================
// KEYBOARD INPUT
// ======================================================

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


        letterInput.value =
            "";

    }

);


// ======================================================
// START
// ======================================================

showWord();

updateScore();

letterInput.focus();
