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
let restartButton = null;
let feedback = null;
let feedbackTimer = null;
const optionBoxes = [];

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

  drawQuestion();

  canvas.addEventListener("click", handleClick);

function handleClick(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = 0; i < optionBoxes.length; i++) {
    const box = optionBoxes[i];
    if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
      const isCorrect = i === questions[0].correct;
      ctx.fillStyle = isCorrect ? "green" : "red";
      ctx.fillText(isCorrect ? "Richtig!" : "Falsch!", 50, 450);
    }
  }
}

function drawQuestion() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const q = questions[0];

  ctx.font = "28px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Frage 1: ${q.question}`, 50, 80);

  optionBoxes.length = 0;
  q.options.forEach((opt, i) => {
    const x = 50;
    const y = 150 + i * 70;
    const width = 700;
    const height = 50;
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = "black";
    ctx.fillText(opt, x + 20, y + 32);
    optionBoxes.push({ x, y, width, height });
  });
}