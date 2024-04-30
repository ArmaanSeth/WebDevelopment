$("h1").text("Press a key to Start")
$("h1").on("click",nextSequence)
var colors=["red","blue","green","yellow"]
var gamePattern=[]
var userClickedPattern=[]
var level=0
if (level==0)
    $("body").on("keypress",nextSequence)


$(".box").click(function(event){
    if(level!=0){
        var userChosenColor=event.target.id
        userClickedPattern.push(userChosenColor)
        playSound(userChosenColor)
        animatePress(userChosenColor)
        checkAnswer(userClickedPattern.length-1)
    }
})

function nextSequence(){
    level++
    $("h1").text("Level "+level)
    var randomnumber=Math.floor(Math.random()*4)
    var randomChosenColor=colors[randomnumber]
    gamePattern.push(randomChosenColor)
    var speed=90
    playSound(randomChosenColor)
    $("."+randomChosenColor).fadeOut(speed).fadeIn(speed).fadeOut(speed).fadeIn(speed);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success")
        if(currentLevel==(gamePattern.length-1)){
            userClickedPattern=[]
            setTimeout(nextSequence(),1000)   
            }
        }       
    else{
        console.log("fail")
        $("body").addClass("game_over")
        setTimeout(function(){
            $("body").removeClass("game_over")
        },200)
        playSound("wrong")
        level=0
        gamePattern=[]
        userClickedPattern=[]
        $("h1").text("Game Over, Press any key to restart")
    }
}

function playSound(sound){
    var audio=new Audio("sounds/"+sound+".mp3")
    audio.play()
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed")
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed")
    },100)
}