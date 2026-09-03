/* =========================================================
   DIGITAL SHIELD
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("🛡️ Digital Shield loaded!");

    /* =====================================================
       LIGHT / DARK MODE
    ===================================================== */

    const themeButton = document.getElementById("themeButton");

    function applyTheme(theme) {

        document.documentElement.setAttribute("data-theme", theme);

        try {
            localStorage.setItem("digitalShieldTheme", theme);
        } catch (error) {
            console.log("Theme could not be saved.");
        }

        if (themeButton) {

            if (theme === "light") {
                themeButton.textContent = "☀️";
                themeButton.title = "Switch to dark mode";
                themeButton.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );
            } else {
                themeButton.textContent = "☾";
                themeButton.title = "Switch to light mode";
                themeButton.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );
            }
        }
    }

    let savedTheme = "dark";

    try {
        const storedTheme =
            localStorage.getItem("digitalShieldTheme");

        if (
            storedTheme === "light" ||
            storedTheme === "dark"
        ) {
            savedTheme = storedTheme;
        }
    } catch (error) {
        console.log("Could not read saved theme.");
    }

    applyTheme(savedTheme);

    if (themeButton) {

        themeButton.addEventListener("click", function () {

            const currentTheme =
                document.documentElement.getAttribute("data-theme");

            const newTheme =
                currentTheme === "light"
                    ? "dark"
                    : "light";

            applyTheme(newTheme);

            console.log("Theme:", newTheme);
        });
    }


    /* =====================================================
       QUIZ
    ===================================================== */

    const quizCards =
        document.querySelectorAll(".quiz-card");

    const quizButtons =
        document.querySelectorAll(".quiz-answer");

    const scoreElement =
        document.getElementById("quizScore");

    const quizResult =
        document.getElementById("quizResult");

    const resultIcon =
        document.getElementById("resultIcon");

    const resultTitle =
        document.getElementById("resultTitle");

    const quizMessage =
        document.getElementById("quizMessage");

    const restartButton =
        document.getElementById("restartQuiz");

    let score = 0;
    let answered = 0;

    console.log("Quiz questions:", quizCards.length);
    console.log("Quiz buttons:", quizButtons.length);


    /* =====================================================
       INITIAL SCORE
    ===================================================== */

    if (scoreElement) {
        scoreElement.textContent = "0";
    }

    if (quizResult) {
        quizResult.style.display = "none";
    }


    /* =====================================================
       ANSWER BUTTONS
    ===================================================== */

    quizButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card =
                button.closest(".quiz-card");

            if (!card) return;

            if (card.dataset.answered === "true") {
                return;
            }

            card.dataset.answered = "true";

            answered++;

            const correct =
                button.dataset.correct === "true";

            if (correct) {

                score++;

                button.classList.add("correct");

            } else {

                button.classList.add("wrong");

                const correctButton =
                    card.querySelector(
                        '.quiz-answer[data-correct="true"]'
                    );

                if (correctButton) {
                    correctButton.classList.add("correct");
                }
            }


            /* Disable all answers in this question */

            const buttons =
                card.querySelectorAll(".quiz-answer");

            buttons.forEach(function (answer) {
                answer.disabled = true;
            });


            /* Update score immediately */

            if (scoreElement) {
                scoreElement.textContent = score;
            }


            /* Finish when all 5 questions are answered */

            if (answered === quizCards.length) {
                showQuizResult();
            }

        });

    });


    /* =====================================================
       SHOW RESULT
    ===================================================== */

    function showQuizResult() {

        if (!quizResult) return;

        if (score === quizCards.length) {

            resultIcon.textContent = "🏆";

            resultTitle.textContent =
                "Perfect Score!";

            quizMessage.textContent =
                "Amazing! You got every question correct!";

        } else if (score >= 3) {

            resultIcon.textContent = "🛡️";

            resultTitle.textContent =
                "Great Job!";

            quizMessage.textContent =
                "You have a strong understanding of online safety.";

        } else {

            resultIcon.textContent = "📚";

            resultTitle.textContent =
                "Keep Learning!";

            quizMessage.textContent =
                "Review the safety tips and try the quiz again.";
        }


        quizResult.style.display = "block";
        quizResult.style.visibility = "visible";
        quizResult.style.opacity = "1";

        quizResult.classList.add("show");

        setTimeout(function () {

            quizResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 200);
    }


    /* =====================================================
       RESTART QUIZ
    ===================================================== */

    if (restartButton) {

        restartButton.addEventListener("click", function () {

            score = 0;
            answered = 0;


            quizCards.forEach(function (card) {

                card.dataset.answered = "false";

            });


            quizButtons.forEach(function (button) {

                button.disabled = false;

                button.classList.remove(
                    "correct",
                    "wrong"
                );

            });


            if (scoreElement) {
                scoreElement.textContent = "0";
            }


            if (quizResult) {

                quizResult.classList.remove("show");

                quizResult.style.display = "none";
                quizResult.style.visibility = "hidden";
                quizResult.style.opacity = "0";

            }


            if (resultIcon) {
                resultIcon.textContent = "🛡️";
            }

            if (resultTitle) {
                resultTitle.textContent =
                    "Quiz Complete!";
            }

            if (quizMessage) {
                quizMessage.textContent =
                    "Great job!";
            }

        });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(
        function (link) {

            link.addEventListener("click", function (event) {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetID);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        }
    );


    console.log("✅ Digital Shield ready!");

});
