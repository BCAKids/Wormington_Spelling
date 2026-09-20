// ======================================================
// WORMINGTON PRACTICE
// UNSCRAMBLE
// ======================================================


// ======================================================
// WORDS
// ======================================================

const masterUnscrambleWords =
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


// Randomize question order.

const unscrambleWords =
    shuffleArray(
        [...masterUnscrambleWords]
    );


// ======================================================
// SESSION VARIABLES
// ======================================================

let currentWordIndex = 0;

let currentAnswer = [];

let currentTiles = [];

let currentWordMissed = false;

let perfectWords = 0;

let missedWords = 0;

let questionLocked = false;


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

const scrambledLetters =
    document.getElementById(
        "scrambledLetters"
    );


const answerDisplay =
    document.getElementById(
        "answerDisplay"
    );


const message =
    document.getElementById(
        "message"
    );


const progress =
    document.getElementById(
        "progress"
    );


const score =
    document.getElementById(
        "score"
    );


const resultsList =
    document.getElementById(
        "resultsList"
    );


const unscrambleCard =
    document.getElementById(
        "unscrambleCard"
    );


const hearWordButton =
    document.getElementById(
        "hearWordButton"
    );


// ======================================================
// NORMALIZE WORD
// ======================================================

function normalizeWord(word) {

    return word
        .toLowerCase()
        .replaceAll(
            " ",
            ""
        );

}


// ======================================================
// CREATE SCRAMBLED LETTERS
// ======================================================

function createScramble(word) {

    const letters =
        normalizeWord(word)
            .split("");


    let scrambled;


    do {

        scrambled =
            shuffleArray(
                [...letters]
            );

    }

    while (
        scrambled.join("")
        ===
        letters.join("")
        &&
        letters.length > 1
    );


    return scrambled;

}


// ======================================================
// PRELOAD CURRENT WORD AUDIO
// ======================================================

function loadCurrentWordAudio() {

    const word =
        unscrambleWords[
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


    currentWordAudio.preload =
        "auto";


    currentWordAudio.load();

}


// ======================================================
// SHOW WORD
// ======================================================

function showWord() {

    const word =
        unscrambleWords[
            currentWordIndex
        ];


    currentAnswer =
        [];


    currentWordMissed =
        false;


    questionLocked =
        false;


    currentTiles =
        createScramble(
            word
        );


    message.textContent =
        "";


    progress.textContent =

        "Word "
        + (currentWordIndex + 1)
        + " of "
        + unscrambleWords.length;


    buildLetterTiles();


    updateAnswerDisplay();


    loadCurrentWordAudio();

}


// ======================================================
// BUILD LETTER TILES
// ======================================================

function buildLetterTiles() {

    scrambledLetters.innerHTML =
        "";


    currentTiles.forEach(
        (letter, index) => {


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "letter-tile";


            button.textContent =
                letter.toUpperCase();


            button.dataset.index =
                index;


            button.addEventListener(

                "click",

                function () {

                    chooseLetter(
                        index
                    );

                }

            );


            scrambledLetters
                .appendChild(
                    button
                );

        }
    );

}


// ======================================================
// CHOOSE LETTER
// ======================================================

function chooseLetter(index) {

    if (
        questionLocked
    ) {

        return;

    }


    const tile =
        document.querySelector(
            '.letter-tile[data-index="'
            + index
            + '"]'
        );


    if (
        !tile
        ||
        tile.disabled
    ) {

        return;

    }


    const letter =
        currentTiles[index];


    currentAnswer.push({

        letter: letter,

        index: index

    });


    tile.disabled =
        true;


    tile.classList.add(
        "letter-tile-used"
    );


    updateAnswerDisplay();


    checkProgress();

}


// ======================================================
// ANSWER DISPLAY
// ======================================================

function updateAnswerDisplay() {

    answerDisplay.innerHTML =
        "";


    const word =
        unscrambleWords[
            currentWordIndex
        ];


    const normalized =
        normalizeWord(word);


    for (
        let i = 0;
        i < normalized.length;
        i++
    ) {

        const slot =
            document.createElement(
                "div"
            );


        slot.className =
            "answer-slot";


        if (
            currentAnswer[i]
        ) {

            slot.textContent =
                currentAnswer[i]
                    .letter
                    .toUpperCase();

        }

        else {

            slot.textContent =
                "";

        }


        answerDisplay.appendChild(
            slot
        );

    }

}


// ======================================================
// CHECK CURRENT ANSWER
// ======================================================

function checkProgress() {

    const word =
        normalizeWord(
            unscrambleWords[
                currentWordIndex
            ]
        );


    const typed =
        currentAnswer
            .map(
                item => item.letter
            )
            .join("")
            .toLowerCase();


    // Mark missed if the current
    // answer no longer matches
    // the beginning of the word.

    if (
        !word.startsWith(
            typed
        )
    ) {

        currentWordMissed =
            true;


        playWrongSound();


        showWrongAnimation();

    }


    // If all letters have been selected,
    // check the final answer.

    if (
        typed.length ===
        word.length
    ) {

        if (
            typed === word
        ) {

            finishWord();

        }

        else {

            currentWordMissed =
                true;


            playWrongSound();


            message.textContent =
                "Not quite — try again!";


            setTimeout(
                resetCurrentWord,
                700
            );

        }

    }

}


// ======================================================
// BACKSPACE
// ======================================================

function removeLastLetter() {

    if (
        questionLocked
        ||
        currentAnswer.length === 0
    ) {

        return;

    }


    const removed =
        currentAnswer.pop();


    const tile =
        document.querySelector(
            '.letter-tile[data-index="'
            + removed.index
            + '"]'
        );


    if (
        tile
    ) {

        tile.disabled =
            false;


        tile.classList.remove(
            "letter-tile-used"
        );

    }


    updateAnswerDisplay();

}


// ======================================================
// RESET
// ======================================================

function resetCurrentWord() {

    if (
        questionLocked
    ) {

        return;

    }


    currentAnswer =
        [];


    buildLetterTiles();


    updateAnswerDisplay();


    message.textContent =
        "";

}


// ======================================================
// HEAR WORD
// ======================================================

function speakWord() {

    if (
        !currentWordAudio
    ) {

        loadCurrentWordAudio();

    }


    currentWordAudio.pause();

    currentWordAudio.currentTime =
        0;


    const playPromise =
        currentWordAudio.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(
            error => {

                console.error(
                    "Word audio could not play:",
                    error
                );


                message.textContent =
                    "Tap Hear Word again 🔊";

            }
        );

    }

}


// ======================================================
// FINISH WORD
// ======================================================

function finishWord() {

    questionLocked =
        true;


    const word =
        unscrambleWords[
            currentWordIndex
        ];


    if (
        currentWordMissed
    ) {

        missedWords++;


        addResult(
            word,
            true
        );


        message.textContent =
            "You got it! 👍";

    }

    else {

        perfectWords++;


        addResult(
            word,
            false
        );


        message.textContent =
            "🎉 Perfect!";


        playCorrectSound();


        showCelebration();

    }


    updateScore();


    disableTiles();


    setTimeout(
        nextWord,
        1600
    );

}


// ======================================================
// DISABLE TILES
// ======================================================

function disableTiles() {

    const tiles =
        document.querySelectorAll(
            ".letter-tile"
        );


    tiles.forEach(
        tile => {

            tile.disabled =
                true;

        }
    );

}


// ======================================================
// AUDIO EFFECTS
// ======================================================

function playCorrectSound() {

    correctSound.pause();

    correctSound.currentTime =
        0;


    correctSound
        .play()
        .catch(
            () => {}
        );

}


function playWrongSound() {

    wrongSound.pause();

    wrongSound.currentTime =
        0;


    wrongSound
        .play()
        .catch(
            () => {}
        );

}


// ======================================================
// WRONG ANIMATION
// ======================================================

function showWrongAnimation() {

    const messages = [

        "Nope! 😜",

        "Almost! 🤪",

        "Try again! 🫣",

        "Not that one! 😂",

        "So close! 😎"

    ];


    message.textContent =

        messages[
            Math.floor(
                Math.random()
                *
                messages.length
            )
        ];


    unscrambleCard
        .classList
        .remove(
            "shake"
        );


    void unscrambleCard.offsetWidth;


    unscrambleCard
        .classList
        .add(
            "shake"
        );


    setTimeout(
        () => {

            unscrambleCard
                .classList
                .remove(
                    "shake"
                );

        },

        400
    );

}


// ======================================================
// CELEBRATION
// ======================================================

function showCelebration() {

    unscrambleCard
        .classList
        .remove(
            "success"
        );


    void unscrambleCard.offsetWidth;


    unscrambleCard
        .classList
        .add(
            "success"
        );


    const emojis = [

        "⭐",
        "🎉",
        "🚀",
        "😎",
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


        unscrambleCard.appendChild(
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

            unscrambleCard
                .classList
                .remove(
                    "success"
                );

        },

        600
    );

}


// ======================================================
// RESULTS
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
        + perfectWords
        +
        "   |   Missed: "
        + missedWords;

}


// ======================================================
// NEXT WORD
// ======================================================

function nextWord() {

    currentWordIndex++;


    if (
        currentWordIndex
        >=
        unscrambleWords.length
    ) {

        finishPractice();

        return;

    }


    showWord();

}


// ======================================================
// FINISH PRACTICE
// ======================================================

function finishPractice() {

    scrambledLetters.innerHTML =
        "";


    answerDisplay.innerHTML =
        "";


    hearWordButton.style.display =
        "none";


    message.textContent =
        "🏆 Unscramble Complete!";


    progress.textContent =

        perfectWords
        +
        " perfect out of "
        +
        unscrambleWords.length;


    showCelebration();

}


// ======================================================
// START
// ======================================================

showWord();

updateScore();
