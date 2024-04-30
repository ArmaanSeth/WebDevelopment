let xp=0;
let health=100;
let gold=50;
let current_weapon=0;
let fighting;
let monster_health=0;
let inventory=["stick"];

const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xp_text=document.querySelector("#xp_text");
const gold_text=document.querySelector("#gold_text");
const health_text=document.querySelector("#health_text");
const monster_stats=document.querySelector("#monster_stats")
const monster_name_text=document.querySelector("#monster_name");
const monster_health_text=document.querySelector("#monster_health");
const weapons=[
    {
        name:"stick",
        power:5
    },
    {
        name:"dagger",
        power:30
    },
    {
        name:"claw hammer",
        power:50
    },
    {
        name:"sword",
        power:100
    }
]
const monsters=[
    {
        name:"slime",
        level:2,
        health:15
    },
    {
        name:"fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:300
    }
]
const argument=[
    {
        name: "town square",
        "button_text": ["Go to store","Go to cave","Fight Dragon"],
        "button_funcs": [gotostore,gotocave,fightdragon],
        text: "You are in Town's square. You see a sign that says \"STORE\""
    },
    {
        name: "store",   
        "button_text": ["Buy 10 Health(10 gold)","Buy Weapon(30 gold)","Go back to town square"],
        "button_funcs": [buyhealth,buyweapon,gototown],
        text: "You are now in store!!!"
    },
    {
        name: "cave",   
        "button_text": ["Fight Slime","Fight The Beast","Go back to town square"],
        "button_funcs": [fightslime,fightbeast,gototown],
        text: "You entered the cave and you see some monsters!!!"
    },
    {
        name: "fight",   
        "button_text": ["Attck","Doge","Run away!"],
        "button_funcs": [attack,doge,gototown],
        text: "You are fighting a monster!!!"
    },
    {
        name: "kill monster",   
        "button_text": ["Go to town square","Go to town square","Go to town square"],
        "button_funcs": [gototown,gototown,easteregg],
        text: "The monster screams \"Arg!\" as it dies. You found gold coins and gained experience points."
    },
    {
        name: "lose",   
        "button_text": ["Replay?","Replay?","Replay?"],
        "button_funcs": [restart,restart,restart],
        text: "You died!!!💀"
    },
    {
        name: "win",   
        "button_text": ["Replay?","Replay?","Replay?"],
        "button_funcs": [restart,restart,restart],
        text: "You defeated the dragon! YOU HAVE WON THE GAME"
    },
    {
        name: "easter egg",   
        "button_text": ["2","8","Go to town square"],
        "button_funcs": [picktwo,pickeight,gototown],
        text: "You have found a secret game. Pick a number above. Ten numbers will be randomly chosen from 1-10 and if the number you choose matches one of the random number then you'll win gold else health will be reduced. "
    }

];
gold_text.innerText=gold;
health_text.innerText=health;
xp_text.innerText=xp;
button1.onclick=gotostore;
button2.onclick=gotocave;
button3.onclick=fightdragon;

function update(args){
    button1.innerText = args["button_text"][0];
    button2.innerText = args["button_text"][1];
    button3.innerText = args["button_text"][2];
    button1.onclick=args["button_funcs"][0];
    button2.onclick=args["button_funcs"][1];
    button3.onclick=args["button_funcs"][2];
    text.innerText=args.text
}   

function gototown(){
    update(argument[0]);
}

function gotostore(){
    update(argument[1]);
}

function gotocave(){
    update(argument[2]);
}

function buyhealth(){
    if(gold<10){
        text.innerText="Not enough gold to buy health!!!";
    }
    else{
        health+=10;
        gold-=10
        gold_text.innerText=gold;
        health_text.innerText=health;   
        text.innerText="Your health is increased by 10. "
    }
}

function buyweapon(){
    if(current_weapon<3){
        if(gold>=30){
            current_weapon+=1;
            gold-=30;
            let newweapon=weapons[current_weapon].name;
            inventory.push(newweapon);
            text.innerText="You now have a "+newweapon+".\nIn your inventory you have now "+inventory+".";
            gold_text.innerText=gold;
        }
        else{
            text.innerText="Not enough gold to buy new weapons!!!";
        }
    }
    else{
        text.innerText="You have the strongest weapon and your inventory is full!!!";
        button2.innerText="Sell weapon for 15 Gold coins";
        button2.onclick=sellweapon;
    }
}
 
function sellweapon(){
    if(current_weapon>=1){
        current_weapon-=1;
        gold+=15
        gold_text.innerText=gold
        let currentweapon=inventory.shift();
        text.innerText="You sold a "+currentweapon+" for 15 Gold coins.\nIn you inventory you have "+inventory+".";
    }
    else{
        text.innerText="Dont sell your only weapon!!!";
    }
}

function fightslime(){
    fighting=0;
    goFight();
}

function fightbeast(){
    fighting=1;
    goFight();
}

function fightdragon(){
    fighting=2;
    goFight();
}

function goFight(){
    update(argument[3]);
    monster_health=monsters[fighting].health
    monster_stats.style.display="block";
    monster_name_text.innerText=monsters[fighting].name
    monster_health_text.innerText=monster_health
}

function attack(){
    text.innerText="The "+monsters[fighting].name+" attacks.";
    text.innerText+="\nYou attack it with your "+weapons[current_weapon].name+".";
    if(ismonsterhit()){
        health-=getmonsterattackvalue(monsters[fighting].level);
        monster_health-=weapons[current_weapon].power+Math.floor(Math.random()*xp)+1;
        health_text.innerText=health;
        monster_health_text.innerText=monster_health;
    }
    else{
        text.innerText="You missed!!!";
    }
    if(health<0){
        lose();
    }   
    else if(monster_health<=0){
        if(fighting==2){
            win();
        }
        else{
        defeatmonster();
        }
    }
    if(Math.random()<=0.1 && inventory.length!==1){
        text.innerText="Your "+inventory.pop()+" broke";
        current_weapon--;
    }
}

function getmonsterattackvalue(level){
    let hit=(level*5)-(Math.floor(Math.random()*xp))*level;
    return hit
}

function ismonsterhit(){
    return Math.random()>0.2 || health<20;
}

function doge(){
    text.innerText="You dodge the attck from the "+monsters[fighting].name+".";
}
function defeatmonster(){
    gold+=Math.floor(monsters[fighting].level*6.7);
    xp+=monsters[fighting].level;
    gold_text.innerText=gold;
    xp_text.innerText=xp;
    update(argument[4]);
}

function lose(){
    update(argument[5]);
}

function win(){
    update(argument[6]);
}

function restart(){
    xp=0;
    gold=50;
    health=100;
    current_weapon=0;
    inventory=["stick"];
    gold_text.innerText=gold;
    health_text.innerText=health;
    xp_text.innerText=xp;
    gototown();
}

function pick(guess){
    let numbers=[];
    while(numbers.length<10){
        numbers.push(Math.floor(Math.random()*11))
    }
    text.innerText="You picked "+guess+". Here are the random numbers:\n";
    for(let i=0;i<10;i++){
        text.innerText+=numbers[i]+", ";
    }
    if(numbers.indexOf(guess)!=-1){
        gold+=20;
        text.innerText+="\nYou won 20 Gold."
        gold_text.innerText=gold;
    }
    else{
        health-=10
        text.innerText+="\nWrong! you lose 10 health."
        health_text.innerText=health;
        if(health<0){
            lose();
        }
    }
}

function picktwo(){
    pick(2);
}

function pickeight(){
    pick(8);
}
function easteregg(){
    update(argument[7]);
}