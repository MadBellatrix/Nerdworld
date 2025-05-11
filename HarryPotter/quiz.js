const canvas = document.getElementById("quizCanvas");
const ctx = canvas.getContext("2d");

const questions = [
    {question: "Wie heißt die Schule, die Harry Potter besucht?", options: ["Beauxbatons", "Durmstrang", "Hogwarts", "Ilvermorny"], correct: 2},
    {question: "Wie lautet Harry Potters vollständiger Name?", options: ["Harry Sirius Potter", "Harry James Potter", "Harry Albus Potter", "Harry Remus Potter"], correct: 1},
    {question: "Welches Haus wird Harry zugeteilt?", options: ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"], correct: 2},
    {question: "Wer ist der Schulleiter in Harrys erstem Schuljahr?", options: ["Snape", "Dumbledore", "McGonagall", "Flitwick"], correct: 1}
];

let currentQuestion = 0;
let score = 0;
let allowClick = true;
const optionBoxes = [];

drawQuestion();
canvas.addEventListener("click", handleClick);

function drawQuestion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const q = questions[currentQuestion];

    ctx.font = "28px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Frage ${currentQuestion + 1}: ${q.question}`, 50, 80);

    optionBoxes.length = 0;

    q.options.forEach((opt, i) => {
        const x = 50;
        const y = 150 + i * 70;
        const width = 700;
        const height = 50;

        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = "black";
        ctx.font = "22px Arial";
        ctx.fillText(opt, x + 20, y + 32);

        optionBoxes.push({ x, y, width, height, index: i });
    });
}

function handleClick(e) {
    if (!allowClick) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < optionBoxes.length; i++) {
        const box = optionBoxes[i];
        if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
            const isCorrect = box.index === questions[currentQuestion].correct;
            if (isCorrect) score++;

            allowClick = false;
            highlightAnswers(isCorrect, box.index);

            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    allowClick = true;
                    drawQuestion();
                } else {
                    showResult();
                }
            }, 1000);
            break;
        }
    }
}

function highlightAnswers(isCorrect, selectedIndex) {
    const q = questions[currentQuestion];

    optionBoxes.forEach((box, i) => {
        if (i === q.correct) {
            ctx.fillStyle = "#b6f7b0";
        } else if (i === selectedIndex) {
            ctx.fillStyle = isCorrect ? "#b6f7b0" : "#f7b0b0";
        } else {
            ctx.fillStyle = "#f0f0f0";
        }
        ctx.fillRect(box.x, box.y, box.width, box.height);

        ctx.fillStyle = "black";
        ctx.font = "22px Arial";
        ctx.fillText(q.options[i], box.x + 20, box.y + 32);
    });
}

function showResult() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Quiz beendet!", 50, 100);
    ctx.fillText(`Du hast ${score} von ${questions.length} Punkten erreicht.`, 50, 160);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    allowClick = true;
    drawQuestion();
}
