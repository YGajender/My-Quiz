const questions = [
  {
    q: "What is the capital city of India?",
    a: "New Delhi",
    opt: ["Mumbai", "Kolkata", "New Delhi", "Chennai"]
  },
  {
    q: "Which state is also known as the “Fruit Bowl” of India?",
    a: "Himachal Pradesh",
    opt: ["Jammu and Kashmir", "Himachal Pradesh", "Assam", "Meghalaya"]
  },
  {
    q: "Where is Taj Mahal located in India?",
    a: "Agra",
    opt: ["New Delhi", "Kolkata", "Agra", "Lucknow"]
  },
  {
    q: "Which is the national sport of India?",
    a: "Hockey",
    opt: ["Cricket", "Hockey", "Kabaddi", "Football"]
  }
]
const userAnswers = [];
const randomOder = getRandomOder()
const questionDiv = document.querySelector(".questions")
const timerDiv = document.querySelector(".timer")
const quizDiv = document.querySelector("#quiz")
const scoreDiv = document.querySelector("#score")
const paragraphs = document.querySelectorAll(".option")
const score = document.querySelector("#score span")
const mainusername = document.querySelector("#input-name")
const userName = document.querySelector("#username")
const mygamail = document.querySelector("#gmail")
const quizButton = document.querySelector("button")
const wrapper = document.querySelector("#wrapper")


let timer = 5;
let count = 0;
let id1;
let id2;
let isQusetionAnswers = false

quizButton.addEventListener("click",()=>{

  if(userName.value !=="" && mygamail.value !== "" ){
      wrapper.style="display:block"
     mainusername.style="display:none"
  }
  else{

    alert("Enter your name or Email") 
    return
 
     }
    
  localStorage.setItem("username", userName.value)
  

timerDiv.innerHTML = timer;
//PRINT THE FIRST QUSTION INSTANTLY ON PAGE LOAD
printQuestion()

id2 = setInterval(() => {
  if (timer === 1) {
    timer = 5;
    timerDiv.innerHTML = timer;
  } else timerDiv.innerHTML = --timer
}, 1000)

id1 = setInterval(() => {
  if (count === questions.length - 1) {
    chekUserAnswer()

    clearInterval(id1) //CLEAR THE QUESTION

    clearInterval(id2)  //CLEAR THE TIMER

    quizDiv.classList.add("hidden")

    calculateScore()

    scoreDiv.classList.remove("hidden")

  } else {
    count++;

    chekUserAnswer()

    enbleAllOptions()

    printQuestion()//QUESTION CHANGE
  }
}, 5000)

})
function printQuestion() {
  questionDiv.innerHTML =`Q${count + 1}. ${questions[randomOder[count]].q}`   ;
  paragraphs.forEach((para, index) => {
    para.innerHTML = questions[randomOder[count]].opt[index]
  });
}
paragraphs.forEach((para, index) => {
  para.addEventListener("click", storeUserAnswer)
})

function storeUserAnswer(e) {
  isQusetionAnswers = true
  userAnswers.push(e.target.innerHTML)
  disableAllOption()
  console.log(userAnswers);
}
function chekUserAnswer() {

  if (isQusetionAnswers === false) {
    userAnswers.push(null)
    console.log(userAnswers);
  }

  else {
    isQusetionAnswers = false;
  }
}

function calculateScore() {
  let finalScore = 0
  userAnswers.forEach((userAnswers, index) => {
    if(userAnswers === questions[randomOder[index]].a)finalScore++

  });
  const username = localStorage.getItem("username")
  score.innerHTML = `${username} ${finalScore}  / ${questions.length}`
}

function disableAllOption(){
  paragraphs.forEach((para)=>{
    para.classList.add("pointer-none")
  })
}

function enbleAllOptions(){
paragraphs.forEach((para)=>{
  para.classList.remove("pointer-none")
})
}
function getRandomOder(){
  let temp = [];
  for (let i = 0; i < questions.length; i++)
  {
    const randomValue = Math.floor(Math.random() * questions.length)
    if(temp.includes(randomValue)) return getRandomOder()
      else{
   temp.push(randomValue)
  }
  }
  return temp
}