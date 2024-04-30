let btns=document.querySelectorAll(".drum")
var l=btns.length
for(var i=0;i<l;i++){
    btns[i].addEventListener("click", function (){
        let type=this.innerHTML;
        make_sound(type);
        run_anim(type);
    });
}

document.addEventListener("keypress",function(event){
    make_sound(event.key.toUpperCase());
    run_anim(event.key);
})

function make_sound(type){
    switch(type){
        case "W":
            playSound("tom-1");
            break;
        case "A":
            playSound("tom-2");
            break;
        case "S":
            playSound("tom-3");
            break;
        case "D":
            playSound("tom-4");
            break;
        case "J":
            playSound("crash");
            break;
        case "K":
            playSound("kick-bass");
            break;
        case "L":
            playSound("snare");
            break;
        default:
            break;
    }
}

function playSound(sound){
    var audio=new Audio("sounds/"+sound+".mp3");
    audio.play();
}

function run_anim(btn_name){
    let btn=document.querySelector("."+btn_name.toLowerCase())
    btn.classList.add("pressed")
    setTimeout(function(){
        btn.classList.remove("pressed")
    },150)
}