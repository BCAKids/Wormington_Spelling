
// ======================================================
// WORMINGTON PRACTICE
// SPELLING
// ======================================================


// ------------------------------------------------------
// WEEKLY SPELLING WORDS
//
// Replace this list when the spelling list changes.
// Audio files should use lowercase names.
//
// Example:
// carbon monoxide
// becomes:
// sounds/carbon_monoxide.mp3
// ------------------------------------------------------

const masterSpellingWords = [

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



// ======================================================
// RANDOMIZE WORD ORDER
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



// Make a copy so the master list stays unchanged.

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

let sessionResults = [];



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
// DISPLAY CURRENT WORD
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


        // Automatically show spaces
        // between words.

        if (
            word[i] === " "
        ) {

            display += "   ";

            continue;

        }



        // Show letters that have
        // already been entered correctly.

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
// PLAY WORD AUDIO
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



    // Stop the previous pronunciation
    // if it is still playing.

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



    if (
        letterInput
    ) {

        letterInput.focus();

    }

}



// ======================================================
// CHECK TYPED LETTER
// ======================================================

function handleLetter(letter) {

    const word =
        spellingWords[
            currentWordIndex
        ];



    // Ignore anything that isn't
    // a letter.

    if (
        !/^[a-zA-Z]$/.test(letter)
    ) {

        return;

    }



    // Skip over spaces automatically.

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



        // Skip any space after
        // the correct letter.

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


        // Once a wrong letter has
        // been entered, this word
        // counts as missed.

        currentWordMissed =
            true;


        showWrongAnimation();

    }

}



// ======================================================
// WRONG LETTER
// ======================================================

function showWrongAnimation() {


    // Play wrong.mp3

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



    const randomMessage =

        funnyMessages[
            Math.floor(
                Math.random()
                *
                funnyMessages.length
            )
        ];



    message.textContent =
        randomMessage;



    practiceCard.classList.remove(
        "shake"
    );


    // Forces the animation to restart
    // even if wrong letters are typed
    // quickly.

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
// FINISH CURRENT WORD
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



    sessionResults.push({

        word: word,

        missed:
            currentWordMissed

    });



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
// PERFECT WORD CELEBRATION
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



    practiceCard
        .classList
        .remove(
            "success"
        );


    void practiceCard.offsetWidth;


    practiceCard
        .classList
        .add(
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



// ======================================================
// ADD WORD TO SESSION SIDEBAR
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



    resultsList
        .appendChild(
            item
        );

}



// ======================================================
// UPDATE SCORE
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
// MOVE TO NEXT WORD
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



    // The first word requires the
    // Hear Word button.
    //
    // Every word after that is
    // automatically announced.

    speakWord();



    letterInput.focus();

}



// ======================================================
// FINISH PRACTICE
// ======================================================

function finishPractice() {


    // Stop word audio if needed.

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


            // Only evaluate the most
            // recently entered character.

            const letter =

                typed.charAt(
                    typed.length - 1
                );


            handleLetter(
                letter
            );

        }



        // Clear the invisible text box
        // after every keystroke.

        letterInput.value =
            "";

    }

);



// ======================================================
// START SPELLING PRACTICE
// ======================================================

showWord();

updateScore();

letterInput.focus();
