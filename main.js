/* User Stories!!! Woohoo
User will Interact with Intro Slide that introduces quiz. 
Upon init Submit, quiz will start.
Each question will have four answers.
Each question will present what number question they are on.
Upon correct selection of the answer, They will be prompted with "Nailed it!"
Upon incorrect selection, they will be prompted with the "That's a miss. The answer is (answer)."
The end of the quiz will provide them with the final score. */

let score = 0;
let questionNumber = 0;



function questionGen() {
    console.log('question gen working');
    if(questionNumber < STORE.length) {
        return `
        <div class = 'question-${questionNumber}'}>
            <form>
            <h2> ${STORE[questionNumber].question} </h2>
                <fieldset> 
                <ul>
                <li>
                <input type ='radio' id ='a' name='question' value ='${STORE[questionNumber].answer[0]}'>
                <label for ='answer1'> ${STORE[questionNumber].answer[0]}</label>
                </li>
                <li>
                <input type ='radio' id ='b' name='question' value =' ${STORE[questionNumber].answer[1]}'>
                <label for ='answer2'> ${STORE[questionNumber].answer[1]} </label>
                </li>
                <li>
                <input type ='radio' id ='c' name='question' value ='${STORE[questionNumber].answer[2]}'>
                <label for ='answer3'> ${STORE[questionNumber].answer[2]} </label>
                </li>
                <li>
                <input type ='radio' id ='d' name='question' value ='${STORE[questionNumber].answer[3]}'>
                <label for ='answer4'> ${STORE[questionNumber].answer[3]} </label>
                </li>
                </ul>
                <button type='submit' class='submit'>submit</button>
                </fieldset>
            </form>
        </div>`;
        
        
    } else {
        alert('quiz end!');
        // placeholder for quiz end
    }
};


function renderQuestion() {
    $('.questionAnswerForm').html(questionGen());
    console.log('render question');
}


 function questionCounter(){
    $('.submit').on('click',function(event){
        questionNumber++;
        $('.questionNumber').text(questionNumber)
    });
    console.log('question counter working') 
}

function countScore(){
    score++;
    console.log('count score working')
};



function quizStart(){
    // init, should return HTML that retains submit button and has welcoming text to quiz
    // next button gives guestion 1 
    //INIT HTML EXISTS IN INDEX
    //on click, hide .start
    //needs to create question form
    $('.submit').on('click', function(event) { 
    $('.start').remove();
    $('.questionAnswerForm').css('display','block');
    });
};


function userAnswer(){
     // if user selects the correct answer, send to correct and vice versa
   $('form').on('submit', function(event){
       event:preventDefault();
       let selected = $('input:checked');
       let answer = selected.val();
       let correctAnswer = STORE[questionNumber].correct;
       if (answer === correctAnswer){
            selected.parent().addClass('correct');
           isCorrect();
       } else{
           selected.parent().addClass('incorrect');
           isIncorrect();
       }
    })
};

function isCorrect(){
    console.log('is correct');
    $('.questionAnswerForm').html(`
    <div class ='correct'>
    <p>correct!</p>
    <button class='nextButton'>next</button>
    </div>`);
    countScore();
    //returns HTML that tells user answer is correct, points to countScore
    // renders next button
};
function isIncorrect(){
    console.log('is incorrect')
    $('.questionAnswerForm').html(`
    <div class ='incorrect'>
    <p>incorrect!</p>
    <button class='nextButton'>next</button>
    </div>`)
    //returns HTML that tells user the answer is incorrect
    //renders next button
};

function renderNext(){
    //takes click, adds to question counter, and renders next question 
    console.log('render next running')
    $('main').on('click','.nextButton', function (event) {
        questionCounter();
        renderQuestion();
        userAnswer();
    })
};

function quizEnd(){
    //returns feedback html
    // if score > 8 you did great!
    // if not, try again
};


function callQuiz(){
    quizStart();
    questionCounter();
    renderQuestion();
    userAnswer();
};

$(callQuiz);


//add breakpoints whenever you want data to render
//quiz start 