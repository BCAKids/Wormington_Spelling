// ======================================================
// WORMINGTON PRACTICE
// VOCABULARY
// ======================================================


// ======================================================
// VOCABULARY WORDS
// ======================================================

// Pull only items that have definitions
// from weekly-words.js.

const masterVocabWords =
    weeklyWords.filter(
        item => item.definition
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

const vocabWords =
    shuffleArray(
        [...masterVocabWords]
    );


// Randomize word bank independently.

const wordBankWords =
    shuffleArray(
        masterVocabWords.map(
            item => item.word
        )
    );


// ======================================================
// SESSION VARIABLES
// ======================================================

let currentQuestionIndex = 0;

let correctWords = 0;

let missedWords = 0;

let currentQuestionMissed = false;

let questionLocked = false;


// ======================================================
// AUDIO
// ======================================================

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

const definitionText =
    document.getElementById(
        "definitionText"
    );

const wordBank =
    document.getElementById(
        "wordBank"
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

const vocabCard =
    document.getElementById(
        "vocabCard"
    );


// ======================================================
// BUILD WORD BANK
// ======================================================

function buildWordBank() {

    wordBank.innerHTML =
        "";

    wordBankWords.forEach(
        word => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "word-bank-button";

            button.textContent =
                word;

            button.addEventListener(

                "click",

                function () {

                    checkAnswer(
                        word,
                        button
                    );

                }

            );

            wordBank.appendChild(
                button
            );

        }
    );

}


// ======================================================
// SHOW QUESTION
// ======================================================

function showQuestion() {

    const item =
        vocabWords[
            currentQuestionIndex
        ];

    currentQuestionMissed =
        false;

    questionLocked =
        false;

    definitionText.textContent =
        item.definition;

    message.textContent =
        "";

    progress.textContent =

        "Word "
        + (currentQuestionIndex + 1)
        + " of "
        + vocabWords.length;

    enableWordBank();

}


// ======================================================
// CHECK ANSWER
// ======================================================

function checkAnswer(
    selectedWord,
    button
) {

    if (
        questionLocked
    ) {

        return;

    }

    const correctWord =
        vocabWords[
            currentQuestionIndex
        ].word;


    if (
        selectedWord === correctWord
    ) {

        questionLocked =
            true;

        button.classList.add(
            "vocab-correct"
        );


        if (
            currentQuestionMissed
        ) {

            missedWords++;

            addResult(
                correctWord,
                true
            );

            message.textContent =
                "You got it! 👍";

        }

        else {

            correctWords++;

            addResult(
                correctWord,
                false
            );

            message.textContent =
                "🎉 Correct!";

            playCorrectSound();

            showCelebration();

        }


        updateScore();

        disableWordBank();


        setTimeout(
            nextQuestion,
            1600
        );

    }

    else {

        currentQuestionMissed =
            true;

        button.classList.add(
            "vocab-wrong"
        );

        playWrongSound();

        showWrongAnimation();


        setTimeout(
            () => {

                button.classList.remove(
                    "vocab-wrong"
                );

            },

            600
        );

    }

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
// WRONG SOUND
// ======================================================

function playWrongSound() {

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

}


// ======================================================
// WRONG ANSWER
// ======================================================

function showWrongAnimation() {

    const funnyMessages = [

        "Nope! 😜",

        "Try again! 🤪",

        "Not that one! 😂",

        "Almost! 🫣",

        "Nice try! 😎",

        "That word betrayed you. 😆"

    ];


    message.textContent =

        funnyMessages[
            Math.floor(
                Math.random()
                *
                funnyMessages.length
            )
        ];


    vocabCard.classList.remove(
        "shake"
    );

    void vocabCard.offsetWidth;

    vocabCard.classList.add(
        "shake"
    );


    setTimeout(
        () => {

            vocabCard
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

    vocabCard.classList.remove(
        "success"
    );

    void vocabCard.offsetWidth;

    vocabCard.classList.add(
        "success"
    );


    setTimeout(
        () => {

            vocabCard
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

        vocabCard.appendChild(
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
// ENABLE / DISABLE WORD BANK
// ======================================================

function disableWordBank() {

    const buttons =
        document.querySelectorAll(
            ".word-bank-button"
        );

    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );

}


function enableWordBank() {

    const buttons =
        document.querySelectorAll(
            ".word-bank-button"
        );

    buttons.forEach(
        button => {

            button.disabled =
                false;

            button.classList.remove(
                "vocab-correct"
            );

            button.classList.remove(
                "vocab-wrong"
            );

        }
    );

}


// ======================================================
// RESULTS SIDEBAR
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

        "Correct: "
        + correctWords
        +
        "   |   Missed: "
        + missedWords;

}


// ======================================================
// NEXT QUESTION
// ======================================================

function nextQuestion() {

    currentQuestionIndex++;


    if (
        currentQuestionIndex
        >=
        vocabWords.length
    ) {

        finishPractice();

        return;

    }


    showQuestion();

}


// ======================================================
// FINISH
// ======================================================

function finishPractice() {

    disableWordBank();

    definitionText.textContent =
        "🏆 Vocabulary Complete!";

    message.textContent =

        correctWords
        +
        " correct out of "
        +
        vocabWords.length;

    progress.textContent =
        "Great job!";

    showFinalCelebration();

}


// ======================================================
// FINAL CELEBRATION
// ======================================================

function showFinalCelebration() {

    vocabCard
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

        vocabCard.appendChild(
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

            vocabCard
                .classList
                .remove(
                    "success"
                );

        },

        700
    );

}


// ======================================================
// START
// ======================================================

buildWordBank();

showQuestion();

updateScore();
