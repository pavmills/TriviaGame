$(document).ready(function() {
  //Function that creates the start button and initial screen
  
  function initialScreen() {
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".mainArea").html(startScreen);
  }
  
  initialScreen();
  
  //Function to generate HTML
  
  $("body").on("click", ".start-button", function(event){
    event.preventDefault(); 
    clickSound.play();
    generateHTML();
  
    timerWrapper();
  
  }); 
  
  $("body").on("click", ".answer", function(event){
    //answeredQuestion = true;
    clickSound.play();
    selectedAnswer = $(this).text();
    if(selectedAnswer === correctAnswers[questionCounter]) {
      //alert("correct");
  
      clearInterval(theClock);
      generateWin();
    }
    else {
      //alert("wrong answer!");
      clearInterval(theClock);
      generateLoss();
    }
  }); 
  
  $("body").on("click", ".reset-button", function(event){
    clickSound.play();
    resetGame();
  });
  
  });  
  
  function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = newFunction() + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/incorrect.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);  


    function newFunction() {
      return "<p class='text-center timer-p'>Time Remaining: <span class='timer'>";
    }
  }
  
  function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);  
  }
  
  function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>That is incorrect! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/incorrect.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000); 
  }
  
  function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
    $(".mainArea").html(gameHTML);
  }
  
  function wait() {
    if (questionCounter < 7) {
    questionCounter++;
    generateHTML();
    counter = 20;
    timerWrapper();
    }
    else {
      finalScreen();
    }
  }
  
  function timerWrapper() {
    theClock = setInterval(twentySeconds, 1000);
    function twentySeconds() {
      if (counter === 0) {
        clearInterval(theClock);
        generateLossDueToTimeOut();
      }
      if (counter > 0) {
        counter--;
      }
      $(".timer").html(counter);
    }
  }
  
  function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
  }
  
  function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 20;
    generateHTML();
    timerWrapper();
  }
  
  var startScreen;
  var gameHTML;
  var counter = 20;
  //Trivia Questions in order
  var questionArray = ["Who was known as the “Queen of Gospel” and described by Harry Belafonte as the “the single most powerful back woman in the U.S.?", "Modern gospel music began in 1930 when which church denomination publicly endorsed the genre?", "The Gospel Music Association sponsors annual awards for outstanding achievement in Christian Music.  What is the name of those awards?", "Who is the only solo performer to be inducted into the Rock and Roll, Country and Gospel Halls of Fame?", "What is the title of the number one best-selling black gospel song of all time?", "Which inspirational gospel singer sang at President Barak Obama’s 1st Presidential Inauguration?", "Which gospel duet recorded the hit The Prayer in 2003?", "'I sing because I’m happy', is the partial refrain from which gospel song?"];
  //Trivia Answers
  var answerArray = [["Mahalia Jackson", "Yolanda Adams", "Shirley Caesar", "Tasha Cobbs"], ["Catholic","Lutheran","Methodist","Baptist"], ["Dove Awards", "Spirit Awards", "GMA Awards", "Tony Awards"], ["Michael Smith","Elvis Presley","Kenny Rogers","Amy Grant"], ["Amazing Grace", "Oh Happy Day", "We Shall Overcame", "Thank You Lord"], ["Aretha Franklin","Whitney Houston","Janet Jackson","Tina Turner"], ["Bebe and Cece Winans ", "Tina and Jack Turner", "Yolanda Adams and Donnie McClurkin", "Kirk Franklin and Tasha Cobbs"], ["Sacred Silence","Amazing Grace","The Choir Rejoices","His Eye is on the Sparrow"]];
  //Images associated with correct answers
  var imageArray = ["<img class='center-block img-right' src='assets/images/Mahalia.jpg'>", "<img class='center-block img-right' src='assets/images/Baptist.png'>", "<img class='center-block img-right' src='assets/images/Dove.jpg'>", "<img class='center-block img-right' src='assets/images/Elvis.jpg'>", "<img class='center-block img-right' src='assets/images/Happy.png'>", "<img class='center-block img-right' src='assets/images/Aretha.jpg'>", "<img class='center-block img-right' src='assets/images/Prayer.jpg'>", "<img class='center-block img-right' src='assets/images/sparrow.jpg'>"];
  //Correct Answers
  var correctAnswers = ["A. Mahalia Jackson", "D. Baptist", "A. Dove Awards", "B. Elvis Presley", "B. Oh Happy Day", "A. Aretha Franklin", "C. Yolanda Adams and Donnie McClurkin", "D. His Eye is on the Sparrow"];
  var questionCounter = 0;
  var selecterAnswer;
  var theClock;
  var correctTally = 0;
  var incorrectTally = 0;
  var unansweredTally = 0;
  var clickSound = new Audio("assets/buttonsound.mp3");