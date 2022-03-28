let timer = document.querySelector(".timer");
let typingBoxContainer = document.querySelector(".typing-box-container");
let autoPara = document.querySelector(".auto-para");
let paragraph = document.querySelector("#paragraph");
let textArea = document.querySelector("#textarea");

const quoteRandom = "https://api.quotable.io/random";

function getRandomQuote() {
  return fetch(quoteRandom).then((response) =>
    response.json().then((data) => data.content)
  );
}

textArea.addEventListener("input", () => {
  const arrayCharacter = paragraph.querySelectorAll("span");
  const arrayInputValue = textArea.value.split("");
  let correctlyCompleted = true;
  arrayCharacter.forEach((CharacterSpan, index) => {
    if (arrayInputValue[index] == null) {
      CharacterSpan.classList.remove("correct");
      CharacterSpan.classList.remove("incorrect");
      correctlyCompleted = false;
    } else if (arrayInputValue[index] === CharacterSpan.innerText) {
      CharacterSpan.classList.add("correct");
      CharacterSpan.classList.remove("incorrect");
    } else {
      CharacterSpan.classList.add("incorrect");
      CharacterSpan.classList.remove("correct");
      correctlyCompleted = false;
    }
  });
  if (correctlyCompleted) {
    randomQuoteGenerator();
  }
});

async function randomQuoteGenerator() {
  const quote = await getRandomQuote();
  paragraph.innerText = "";
  quote.split("").forEach((Character) => {
    const CharacterSpan = document.createElement("span");
    CharacterSpan.setAttribute("class", "default");
    CharacterSpan.innerText = Character;
    paragraph.appendChild(CharacterSpan);
  });
  textArea.value = null;
  startTimer();
}
let startTime;
function startTimer() {
  timer.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTime();
  }, 1000);
}
function getTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

window.addEventListener("load", () => {
  randomQuoteGenerator();
});
