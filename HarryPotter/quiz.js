const canvas = document.getElementById("quizCanvas");
const ctx = canvas.getContext("2d");

const questions = [
    {question: "Wie heißt Harry Potters Eule?", options: ["Hedwig", "Errol", "Fawkes", "Buckbeak"], correct: 0},
    {question: "Was ist der Name von Harry Potters Onkel?", options: ["Vernon", "Dudley", "Harry", "Arthur"], correct: 0},
    {question: "Welches Haus wird Harry zugeteilt?", options: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"], correct: 0},
    /*{question: "Wie heißt der Lehrer für Zaubertränke in Harrys erstem Jahr?", options: ["Snape", "McGonagall", "Flitwick", "Dumbledore"], correct: 0},
    {question: "Welches Tier ist Hermines Haustier?", options: ["Katze", "Eule", "Ratte", "Hund"], correct: 0},
    {question: "Wer ist der beste Freund von Harry Potter?", options: ["Ron Weasley", "Neville Longbottom", "Draco Malfoy", "Cedric Diggory"], correct: 0},
    {question: "Wer ist der Schulleiter von Hogwarts zu Beginn der Reihe?", options: ["Dumbledore", "Snape", "Flitwick", "McGonagall"], correct: 0},
    {question: "Wie heißt das Zauberbuch, das Harry in seiner ersten Klasse bekommt?", options: ["Zaubersprüche für Anfänger", "Die magische Welt", "Zauberschule in London", "Zaubertränke für Anfänger"], correct: 0},
    {question: "Welcher Lehrer unterrichtet Zaubertränke?", options: ["Snape", "Flitwick", "McGonagall", "Sprout"], correct: 0},
    {question: "Was ist das Schutzschild, das Harry von Dumbledore erhält?", options: ["Elder Wand", "Phoenix Feather", "Fawkes", "Invisibility Cloak"], correct: 3},
    {question: "Was ist der Name von Harry Potters Mutter?", options: ["Lily Potter", "Molly Weasley", "Tonks", "Bellatrix Lestrange"], correct: 0},
    {question: "Wer ist der erste Mensch, der im Zaubereiministerium stirbt?", options: ["Cedric Diggory", "Fudge", "Sirius Black", "Emmeline Vance"], correct: 2},
    {question: "Wie heißt der Zauber, mit dem man die unsichtbaren Dementoren vertreibt?", options: ["Expecto Patronum", "Avada Kedavra", "Expelliarmus", "Lumos"], correct: 0},
    {question: "Welches Tier ist der Patronus von Harry Potter?", options: ["Hirsch", "Wolf", "Hund", "Pferd"], correct: 0},
    {question: "Welcher Charakter verwandelt sich in eine Animagus?", options: ["Sirius Black", "Peter Pettigrew", "James Potter", "Alle oben genannten"], correct: 3},
    {question: "Wer ist der wahre Besitzer von 'Der Elderstab'?", options: ["Dumbledore", "Harry Potter", "Draco Malfoy", "Voldemort"], correct: 1},
    {question: "Was war das Geschenk von Sirius Black für Harry zu Weihnachten im ersten Jahr?", options: ["Elder Wand", "Fliegender Besen", "Magisches Buch", "Tarnumhang"], correct: 3},
    {question: "Wie lautet der vollständige Name von Tom Riddle?", options: ["Tom Marvolo Riddle", "Thomas Riddle", "Tom Marvolo Malfoy", "Tom Alexander Riddle"], correct: 0},
    {question: "Was ist der wahre Name von Nagini, der Schlange von Voldemort?", options: ["Nagini", "Katrina", "Lavinia", "Patricia"], correct: 2},
    {question: "Wie viele Horcruxe hat Voldemort erschaffen?", options: ["6", "7", "8", "9"], correct: 1} */
  ];

let currentQuestion = 0;
let score = 0;
let optionBoxes = [];
let resetButton = null;
let backButton = null;

function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lines = [];

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  for (let j = 0; j < lines.length; j++) {
    ctx.fillText(lines[j], x, y + (j * lineHeight));
  }
}

function drawQuestion() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const q = questions[currentQuestion];

  ctx.font = "28px Arial";
  ctx.fillStyle = "black";
  wrapText(`Frage ${currentQuestion + 1}: ${q.question}`, 50, 80, canvas.width - 100, 35);

  optionBoxes.length = 0;

  q.options.forEach((opt, i) => {
    const x = 50;
    const y = 150 + i * 70;
    const width = canvas.width - 100;
    const height = 50;

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = "black";
    ctx.font = "22px Arial";
    wrapText(opt, x + 20, y + 32, width - 40, 30);

    optionBoxes.push({ x, y, width, height, index: i });
  });
}

function handleClick(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = 0; i < optionBoxes.length; i++) {
    const box = optionBoxes[i];
    if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
      const isCorrect = i === questions[currentQuestion].correct;

      if (isCorrect) {
        score++;
      }

      ctx.fillStyle = isCorrect ? "green" : "red";
      ctx.fillText(isCorrect ? "Richtig!" : "Falsch!", 50, 450);
    }
  }

  setTimeout(() => {
    nextQuestion();
  }, 1000);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    drawQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Quiz beendet!", 50, 100);
  ctx.fillText(`Du hast ${score} von ${questions.length} Punkten erreicht.`, 50, 160);

  let resultText = "";
  if (score === questions.length) {
    resultText = "Perfekt! Du bist ein wahrer Potter-Fan!";
  } else if (score >= 15) {
    resultText = "Schnell zum Bücherregal, da geht noch mehr!";
  } else if (score >= 10) {
    resultText = "Na das wird doch! Du bist auf dem richtigen Weg!";
  } else if (score >= 5) {
    resultText = "Oh oh, Mugglealarm! Du musst noch üben!";
  } else {
    resultText = "Schnell ins St. Mungos mit dir! Scheinbar hat dich jemand mit einem Vergessenszauber belegt!";
  }

  ctx.fillText(resultText, 50, 220);

  showResetButton();
}

function showResetButton() {
  if (resetButton) {
    resetButton.style.display = "block";
  }
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  drawQuestion();
  resetButton.style.display = "none";
}

function goToStartPage() {
  window.location.href = '/'; 
}

function setupPage() {
  document.body.style.height = "100%";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.fontFamily = "Arial, sans-serif";
  document.body.style.background = "#f0f4ff";
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";
  document.body.style.flexDirection = "column";
  document.body.style.backgroundImage = "url('/assets/Biblothek.jpeg')";

  const quizContainer = document.createElement('div');
  quizContainer.id = "quizContainer";
  quizContainer.style.display = "flex";
  quizContainer.style.flexDirection = "column";
  quizContainer.style.alignItems = "center";
  document.body.appendChild(quizContainer);

  const canvasWidth = Math.min(window.innerWidth * 0.8, 800);
  const canvasHeight = (canvasWidth * 3) / 4;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  canvas.style.border = "2px solid #ccc";
  canvas.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
  canvas.style.background = "white";
  quizContainer.appendChild(canvas);

  backButton = document.createElement('button');
  backButton.textContent = "Zurück zur Startseite";
  backButton.style.position = "absolute";
  backButton.style.top = "20px";
  backButton.style.left = "20px";
  backButton.style.padding = "10px 20px";
  backButton.style.fontSize = "16px";
  backButton.style.backgroundColor = "#4CAF50";
  backButton.style.color = "white";
  backButton.style.border = "none";
  backButton.style.borderRadius = "8px";
  backButton.style.cursor = "pointer";
  backButton.style.transition = "background-color 0.3s ease";
  backButton.onclick = goToStartPage;

  document.body.appendChild(backButton);

  resetButton = document.createElement('button');
  resetButton.textContent = "Quiz Zurücksetzen";
  resetButton.style.marginTop = "20px";
  resetButton.style.padding = "10px 20px";
  resetButton.style.fontSize = "16px";
  resetButton.style.backgroundColor = "#4CAF50";
  resetButton.style.color = "white";
  resetButton.style.border = "none";
  resetButton.style.borderRadius = "8px";
  resetButton.style.cursor = "pointer";
  resetButton.style.transition = "background-color 0.3s ease";
  resetButton.style.display = "none";

  resetButton.onmouseover = () => {
    resetButton.style.backgroundColor = "#45a049";
  };
  resetButton.onmouseout = () => {
    resetButton.style.backgroundColor = "#4CAF50";
  };

  resetButton.onclick = resetQuiz;

  quizContainer.appendChild(resetButton);
}

setupPage();
canvas.addEventListener("click", handleClick);
drawQuestion();
