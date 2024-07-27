var color = ['green','red','yellow','blue'];
var computerPattern = [];
var userPattern = [];
var level = 1;
var started = false;

//this code is for the next sequence
$(document).keypress(function()
{
    if(!started)
    {   $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
})
$('#start-button').click(function()
{
    if(!started)
    {   $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
})


function nextSequence(){

    userPattern = []
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomColour = color[randomNumber];
    computerPattern.push(randomColour);
    

    var button = $('#'+randomColour);
   button.fadeIn(100).fadeOut(100).fadeIn(100);

   var audio = new Audio('sounds/'+randomColour+'.mp3');
   audio.play();
   $('h1').text('level '+level);
   level +=1;
  
}


//for the click by the user

$('.btn').click(function(){
    var userChoosenColor = this.id;
    userPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animation(userChoosenColor);
    checkAnswer(userPattern.length-1);
});

//function to play sound

function playSound(soundId)
{
    var sound = new Audio('sounds/'+soundId+'.mp3');
    sound.play();
}

//function for animating button when user clicks on it
function animation(animateColour)
{
  var anim = $('#'+animateColour).addClass('pressed');

  setTimeout(function()
{
    anim.removeClass('pressed')
},100);
};

function checkAnswer(currentLevel)
{
//  

     if(computerPattern[currentLevel] === userPattern[currentLevel])
     {
        console.log('success');
        if (userPattern.length === computerPattern.length){

          
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
     }

     else if(computerPattern[currentLevel] !== userPattern[currentLevel]){
        $('h1').text('Game over, press any key to restart').css('color','red');
      
        $('body').addClass('game-over');
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
       
        setTimeout(function()
    {
        $('body').removeClass('game-over');
        $('h1').text('Game over, press any key to restart').css('color','white');
      
    },100);
  
         
        $(document).keypress(function()
{
    computerPattern = [];
    userPattern = [];
    level = 1; 
   
        nextSequence();
})
   
$('#start-button').click(function()
{
    computerPattern = [];
    userPattern = [];
    level = 1; 
   
        nextSequence();
})
     }
}
