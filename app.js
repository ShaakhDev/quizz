//https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple
//https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple


/*<<<<<<<<<<<<<<<<<This section is designed to retrieve information from the api >>>>>>>>>>>>>>>>>>>


//Getting quiz datas from quiz API
getDataAPI();
async function getDataAPI() {
    const baseURL = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple';
    const response = await fetch(baseURL);
    var data = await response.json();
    var results;
    results = data.results;
    editDataToObject(results)
}




//Collecting the obtained data on the object
function editDataToObject(results) {
    results.forEach(element => {
        var quizObject = {};
        quizObject.question = element.question;
        quizObject.a = element.incorrect_answers[0];
        quizObject.b = element.incorrect_answers[1];
        quizObject.c = element.incorrect_answers[2];
        quizObject.d = element.correct_answer;
        quizObject.correct = element.correct_answer;
        quizdata.push(quizObject); //adding an object to the array of 'quizdata'
    })
    console.log(quizdata)
}
*/


const quizdata = [
    {
        question: 'Orkestr necha turga bo\'linadi?', 
        a: '5 turga',
        b: '2 turga',
        c: '3 turga',
        d: '4 turga',
        correct: '5 turga'
    },
    {
        question:'Birinchi xalq cholg\'ulari orkestri nechanchi yili tuzilgan?', 
        a: '1930',
        b: '1936',
        c: '1938',
        d: '1932',
        correct: '1936'
    },
    {
        question: 'O\'zbekiston Respublikasi Davlat Madhiyasi qachon tasdiqlangan?', 
        a: '1992-yil 10-dekabr',
        b: '1991-yil 18-noyabr',
        c: '1992-yil 2-iyul',
        d: '1992-yil 8-dekabr',
        correct: '1992-yil 10-dekabr'
    },
    {
        question: 'Tovushlar necha xil bo\'ladi?', 
        a: '3 xil',
        b: '4 xil',
        c: '5 xil',
        d: '2 xil',
        correct:'2 xil'
    },
    {
        question:'Musiqada nechta kalit bor?', 
        a: '10 ta',
        b: '3 ta',
        c: '4 ta',
        d: '5 ta',
        correct:'10 ta'
    },
    {
        question: 'Doira, nog\'ora, qayroq, safoyil o\'zbek xalq cholg\'ulari orasida qaysi  cholg\'u guruhiga kiradi?', 
        a: 'damli cholg\'ular',
        b: 'zarbli',
        c: 'torli urma',
        d: 'puflama',
        correct: 'zarbli'
    },
    {
        question: '« Aziz ustozlar » qo\'shig\'ini qaysi shoir yozgan?', 
        a: 'To\'lqin Ibragimov',
        b: 'P.Mo\'min',
        c: 'I.Mirzo',
        d: 'I.Muslim',
        correct:'To\'lqin Ibragimov'
    },
    {
        question: 'Xorda necha xil ovoz bor?', 
        a: '2 xil',
        b: '4 xil',
        c: '3 xil',
        d: '5 xil',
        correct:'4 xil'
    },
    {
        question: 'Musiqa yozuvchi kishini kim diymiz?', 
        a: 'shoir',
        b: 'qo\'shiqchi ',
        c: 'ijrochi',
        d: 'bastakor',
        correct:'bastakor'
    },
    {
        question: 'M.Burxonov nechanchi yil tug\'ilgan?', 
        a: '1938-yil 5-mart',
        b: '1941-yil 10-may',
        c: '1936-yil 2-aprel',
        d: '1916-yil 5-may',
        correct: '1916-yil 5-may'
    }
];
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');
const btnNext = document.getElementById('btn');
const answerEls = document.querySelectorAll('.answer');
const answerElsTxt = document.querySelectorAll('.answer');
const score = document.querySelector('#point');
const scoreTag = document.querySelector('#score');
const startButton = document.querySelector('#start');
const quizBox = document.querySelector('.quiz-box');
const quiz = document.querySelector('#quiz');
const container = document.querySelector('.container');
let currentQuiz = 0;
let point = 0;



// button for start quiz
startButton.addEventListener('click', () => {
    startButton.classList.add('display-none');
    scoreTag.classList.remove('display-none');
    quizBox.classList.remove('display-none');
    container.classList.remove('container-flex');
    loadQuizData();
})


// Write the data in 'quizdata' to an html page
function loadQuizData() {

    const currentQuizData = quizdata[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}


//Move on to the next question.
btnNext.addEventListener('click', () => {
    currentQuiz++
    if (currentQuiz < quizdata.length) {
        loadQuizData();
    } else {
       quiz.innerHTML = `<h3>Siz 10 ta savoldan ${score.textContent} tasiga to'g'ri javob berdingiz!</h3>`
    }
    loadQuizData();
})



//check whether the selected answer is correct or incorrect.
//Green if the selected answer is correct, red if incorrect
checkAnswer();
function checkAnswer() {

    for (let i = 0; i < answerEls.length; i++) {
        answerEls[i].addEventListener('click', () => {
            var chosenAnswer = answerEls[i].textContent;
            const correctQuizData = quizdata[currentQuiz].correct;

            if (chosenAnswer === correctQuizData) {
                answerEls[i].classList.add('correct-answer');
                enableNextBtn();
                point++
            } else {
                answerEls[i].classList.add('incorrect-answer');
                enableNextBtn();
                answerEls.forEach(element => {
                    if (element.textContent === correctQuizData) {
                        element.classList.add('correct-answer');
                    }
                });
            }
        });
    }
}



//The ‘next’ button will not work until the answer is selected.
//Enabling the 'next' button when selecting an answer
function enableNextBtn() {
    btnNext.removeAttribute('disabled');
    btnNext.addEventListener('click', () => {
        deSelectAnswer();
        btnNext.setAttribute('disabled', 'disabled');
        enableAnswer();
    });
    disableAnswer();
}

//Remove the colors in the answer as you move on to the next question.
function deSelectAnswer() {
    answerEls.forEach(answerEl => {
        answerEl.classList.remove('class', 'correct-answer');
        answerEl.classList.remove('class', 'incorrect-answer');

    });
    score.innerHTML = point;
}



//Once the option is selected, make other one unclickable.
function disableAnswer() {
    answerEls.forEach(answerEl => {
        answerEl.style.pointerEvents = "none"
    });
}

// Enabling unclickable options.
function enableAnswer() {
    answerEls.forEach(answerEl => {
        answerEl.style.pointerEvents = "auto"
    });
}