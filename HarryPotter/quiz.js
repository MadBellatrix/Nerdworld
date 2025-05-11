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
