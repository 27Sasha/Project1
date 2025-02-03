let questionNo = 0
const questionAsked = []
let answers = []
let wrongQuestion = []
let rightQuestions = []
const questionList = []

async function getData() {
    
    const url = "https://opentdb.com/api.php?amount=10";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json.results
    } catch (error) {
      console.error(error.message);
    }}

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Get a random index
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}
  async function renderData(){
    const data = await getData()

    data.forEach((item) => {
        questionList.push({
            question : item.question,
            correct_solution: item.correct_answer, 
            incorrect_solutions: item.incorrect_answers,
            all_solutions: shuffleArray([item.correct_answer, ...item.incorrect_answers])
        })
    });
    shuffleArray(questionList)
    renderQuestion()
  } 

function renderQuestion(){
    const container = document.querySelector('.container')
    container.innerHTML = ""
    const questionDiv = document.createElement("div");

    questionDiv.innerHTML = `
    <h1>Question ${questionNo+1}</h1>
    <h2>${questionList[questionNo].question}</h2>
        `
    container.appendChild(questionDiv);

    const optionsDiv = document.createElement("div");
    questionList[questionNo].all_solutions.forEach((sol, index) => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.dataset.index = index
        btn.textContent = sol;

        btn.addEventListener("click", handleAnswer)
        optionsDiv.appendChild(btn);
        container.appendChild(optionsDiv)
    });

    if (questionNo > 0) {
        const prevBtn = document.createElement("button");
        prevBtn.classList.add("prevBtn")
        prevBtn.textContent = "Prev";
        prevBtn.addEventListener("click", prev);
        container.appendChild(prevBtn);
    }

    // Next button (Only if NOT last question)
    if (questionNo < questionList.length - 1) {
        const nextBtn = document.createElement("button");
        nextBtn.classList.add("nextBtn")
        nextBtn.textContent = "Next";
        nextBtn.addEventListener("click", next);
        container.appendChild(nextBtn);
    } else {
        // Submit button (Only appears on last question)
        const submitDiv = document.createElement("div");
        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.classList.add("submitBtn")
        submitBtn.addEventListener("click", renderResult);
        submitDiv.appendChild(submitBtn);
        container.appendChild(submitDiv);
        
    }
}
function handleAnswer(e){
    document.querySelectorAll(".answer-btn").forEach(btn => {
        btn.style.backgroundColor = "";  // Unhighlight all buttons
    });

    e.target.style.backgroundColor = "lightpink";
    answers[questionNo] = e.target.textContent
}  
function next(){
    questionNo++
    renderQuestion()
}
function prev(){
    if (questionNo > 0){
        questionNo--
        renderQuestion()
    }
}   

function renderResult(){
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("questions", JSON.stringify(questionList));
    window.location.href='result.html'

    
}

document.addEventListener("DOMContentLoaded", renderData);
