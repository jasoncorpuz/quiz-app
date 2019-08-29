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
                <input type ='radio' id ='b' name='question' value ='${STORE[questionNumber].answer[1]}'>
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
        $('.questionAnswerForm').html(quizEnd());
        // placeholder for quiz end
    }
};

function renderQuestion() {
    $('.questionAnswerForm').html(questionGen());
    console.log('render question');
    //alters dom, renders question
}


 function questionCounter(){
        questionNumber++;
        $('.questionNumber').text(questionNumber+1);
    console.log('question counter working') 
    // if store.length > 0
}

function countScore(){
    score++;
    $('.score').text(score);
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
    $('.questionNumber').text(1);
    });
};


function userAnswer(){
     // if user selects the correct answer, send to correct and vice versa
   $('form').on('submit', function(event){
       event.preventDefault();
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
    <img src="https://media.giphy.com/media/ZHhllFqfIdXDG/giphy.gif" alt="walking mario"/>
    <button class='nextButton'>next</button>
    </div>`);
    countScore();
    renderNext();
    //returns HTML that tells user answer is correct, points to countScore
    // renders next button
};
function isIncorrect(){
    console.log('is incorrect')
    $('.questionAnswerForm').html(`
    <div class ='incorrect'>
    <p>Incorrect! The correct answer is ${STORE[questionNumber].correct}.</p>
    <img src="https://thumbs.gfycat.com/ShortSingleCob-small.gif" alt="dead mario"/>
    <button class='nextButton'>next</button>
    </div>`)
    renderNext();
    //returns HTML that tells user the answer is incorrect
    //renders next button
};

function renderNext(){
    //takes click, adds to question counter, and renders next question 
    console.log('render next running')
    $('.nextButton').on('click', function (event) {
        questionCounter();
        renderQuestion();
        userAnswer();
    })
};

function quizEnd(){
    //returns feedback html
    // if score > 8 you did great!
    // if not, try again
    // replay button
    $('.questionNumber').text(10);
    if (score >= 8) {
        return `
        <div class='results'>
        <img src="https://66.media.tumblr.com/1af2a4c8ac1b301d56445bf4a54f86d3/tumblr_oa8zylGhMm1rpr7vvo1_500.gif" alt="high score"/>
        <h2>CONGRATULATIONS</h2>
        <h3>You scored ${score}/10!</h3> 
        <p class='userFeedback'>You are in a league of your own! Welcome to the <span class='elite'>l33t g4m3r squad</span>!!</p>
        </div> `
    } else {
        return `
        <div class='results'>
        <h2>Epic failure....</h2>
        <img src="https://media2.giphy.com/media/dkuZHIQsslFfy/giphy.gif?cid=790b7611338dadcac813860eac7832adcba9241989ca6d88&rid=giphy.gif" alt="game over"/>
        <h3>You scored ${score}/10!</h3> 
        
        <p class='userFeedback'>NOOB? <span class='elite'>Try again</span>!!</p>
        <button value="Refresh Page" onClick="window.location.reload();" class='submit'>PLAY AGAIN</button>
        </div> `
    };
};


function callQuiz(){
    quizStart();
    renderQuestion();
    userAnswer();
};

$(callQuiz);


//add breakpoints whenever you want data to render
//quiz start 