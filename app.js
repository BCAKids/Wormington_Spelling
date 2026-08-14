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



let currentWordIndex = 0;

let currentLetterIndex = 0;

let currentWordMissed = false;

let correctWords = 0;



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



// ------------------------------------
// DISPLAY WORD
// ------------------------------------

function showWord() {

    const word =
        spellingWords[currentWordIndex];

    let display = "";


    for (
        let i = 0;
        i < word.length;
        i++
    ) {

        // Spaces appear automatically

        if (word[i] === " ") {

            display += "   ";

            continue;

        }


        if (i < currentLetterIndex) {

            display +=
                word[i].toUpperCase() + " ";

        }

        else {

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

    speech.rate = 0.72;

    speech.pitch = 1;

    speech.volume = 1;


    speechSynthesis.cancel();

    speechSynthesis.speak(speech);


    letterInput.focus();

}



// ------------------------------------
// HANDLE TYPED LETTER
// ------------------------------------

function handleLetter(letter) {

    const word =
        spellingWords[currentWordIndex];


    // Skip spaces automatically

    while (
        word[currentLetterIndex] === " "
    ) {

        currentLetterIndex++;

    }


    const correctLetter =
        word[currentLetterIndex].toLowerCase();


    if (
        letter.toLowerCase() ===
        correctLetter
    ) {

        currentLetterIndex++;


        // Skip space after correct letter

        while (
            word[currentLetterIndex] === " "
        ) {

            currentLetterIndex++;

        }


        showWord();


        message.textContent = "✓";


        if (
            currentLetterIndex >=
            word.length
        ) {

            finishWord();

        }

    }

    else {

        currentWordMissed = true;

        showWrongAnimation();

    }

}



// ------------------------------------
// WRONG LETTER
// ------------------------------------

function showWrongAnimation() {

    const funnyMessages = [

        "Nope! 😜",
        "Almost! 🤪",
        "Try that again! 🫣",
        "Oops! 🙃",
        "Not that one! 😂",
        "Nice try! 😎"

    ];


    const randomMessage =

        funnyMessages[
            Math.floor(
                Math.random() *
                funnyMessages.length
            )
        ];


    message.textContent =
        randomMessage;


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


    letterInput.disabled = true;


    if (currentWordMissed) {

        message.textContent =
            "You got it! 👍";

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



// ------------------------------------
// PERFECT WORD ANIMATION
// ------------------------------------

function showCelebration() {

    const messages = [

        "🎉 AWESOME!",
        "⭐ NAILED IT!",
        "🔥 PERFECT!",
        "😎 NICE!",
        "🚀 GREAT JOB!"

    ];


    message.textContent =

        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];


    practiceCard
        .classList
        .add("success");


    setTimeout(
        () => {

            practiceCard
                .classList
                .remove("success");

        },

        600
    );


    const emojis =
        ["⭐", "🎉", "🚀", "😎", "✨"];


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const emoji =
            document.createElement("div");


        emoji.className =
            "celebration";


        emoji.textContent =

            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        emoji.style.left =
            (20 + Math.random() * 60)
            + "%";


        emoji.style.bottom =
            "50px";


        practiceCard
            .appendChild(emoji);


        setTimeout(
            () => emoji.remove(),
            1300
        );

    }

}



// ------------------------------------
// RESULTS SIDEBAR
// ------------------------------------

function addResult(
    word,
    missed
) {

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
// SCORE
// ------------------------------------

function updateScore() {

    score.textContent =

        "Correct: " +
        correctWords;

}



// ------------------------------------
// NEXT WORD
// ------------------------------------

function nextWord() {

    currentWordIndex++;

    currentLetterIndex = 0;

    currentWordMissed = false;

    letterInput.disabled =
        false;


    if (
        currentWordIndex >=
        spellingWords.length
    ) {

        finishPractice();

        return;

    }


    message.textContent = "";


    showWord();


    speakWord();


    letterInput.focus();

}



// ------------------------------------
// FINISH LIST
// ------------------------------------

function finishPractice() {

    wordDisplay.textContent =
        "🏆";

    message.textContent =
        "Practice Complete!";

    progress.textContent =

        correctWords +
        " perfect out of " +
        spellingWords.length;


    letterInput.style.display =
        "none";


    document
        .getElementById(
            "speakButton"
        )
        .style
        .display =
        "none";


    showCelebration();

}



// ------------------------------------
// KEYBOARD INPUT
// ------------------------------------

letterInput.addEventListener(

    "input",

    function () {

        const typed =
            letterInput.value;


        if (typed.length > 0) {

            const letter =

                typed.charAt(
                    typed.length - 1
                );


            handleLetter(letter);

        }


        letterInput.value = "";

    }

);



// ------------------------------------
// START DISPLAY
// ------------------------------------

showWord();
