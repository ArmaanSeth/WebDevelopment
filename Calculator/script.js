let str=""
let operandStack=[]
let operatorStack=[]
output=document.querySelector("#output")
document.querySelector("#AC").addEventListener("click",function(){
    str=""
    output.innerText="|"
})

document.querySelector("#Enter").addEventListener("click",calculte)

btn=document.querySelectorAll(".dis")

for(var i=0;i<btn.length;i++){
    btn[i].addEventListener("click",function(){
        var text=this.innerText
        addToString(text)
    })
}

function addToString(k){
    str+=k
    output.innerText=str+"|"
}

function calculte(){
    var digit=""
    for(var i=0;i<str.length;i++){
        if(str[i]=="*" || str[i]=="/" || str[i]=="+" || str[i]=="-"){
            operandStack.push(Number(digit))
            process(str[i])
            digit=""
        }
        else{
            digit+=str[i]
        }
    }
    operandStack.push(digit)
    if(operatorStack.length!=0){
        var i=operatorStack.length-1
        while(i>=0){
            var l=operandStack.length
            l--;
            operandStack[l-1]=cal(operandStack[l-1],operandStack[l],operatorStack[i])
            operatorStack.pop()
            operandStack.pop()
            i--
        }
    }
    str=""+operandStack[0]
    output.innerText=str+"|"
    operatorStack=[]
    operandStack=[]
}

function process(k){
    var i=operatorStack.length-1
    while(i>=0 && precedence(operatorStack[i])<precedence(k)){
        var l=operandStack.length-1
        operandStack[l-1]=cal(operandStack[l-1],operandStack[l],operatorStack[i])
        operatorStack.pop()
        operandStack.pop()
        i--
    }
    operatorStack.push(k)
}

function cal(a,b,c){
    if(c=="+")
        return a+b
    else if(c=="-")
        return a-b
    else if(c=="*")
        return a*b
    else
        return a/b
}

function precedence(k){
    if(k=="+" || k=="-")
        return 0
    else
        return 1
}
