// Select all individual boxes
let mainContainer=document.querySelector(".mainContainer")
let boxes = document.querySelectorAll(".box");
let newgameBtn=document.querySelector(".newgame-Btn");
let resetBtn=document.querySelector("#rst-Btn");
let msg=document.querySelector("#msg");
let msgContainer=document.querySelector(".msg-container")
let turnO=true;
let optionsContainer=document.querySelector(".optionsContainer")
let xSymbol=document.querySelector(".xSymbol");
let ySymbol=document.querySelector(".ySymbol");

//Here We Initialize the playerSymbol with empty value so we can change it Dynamically
playerSymbol="";
//we Initialize the isSymbolSelected with false so when it is true we can change it's value
isSymbolSelected=false;


//These are the Patterns where a user can win
const winnerPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

//This Function is used to reset a Game
const resetGame=()=>{
isSymbolSelected=false;    
turnO=true;
enableButtons();
msgContainer.classList.add("hide");
resetBtn.classList.remove("hide");
optionsContainer.classList.remove("hide");
mainContainer.classList.add("hide")  

}

//This Function is used to start the game
const GameInitialization=()=>{
    optionsContainer.classList.add("hide"); 
// Add a click event listener to each box
boxes.forEach(box => {
    mainContainer.classList.remove("hide") 
   
  box.addEventListener("click", () => {
    

    if(box.classList.contains("disabled")||box.innerText!==""){
        return;
    }
    if(turnO){
        box.innerText = playerSymbol; // Insert "X" only in the clicked box
        turnO=false;
        
    }else{
        box.innerText=playerSymbol=== "X" ? "O" : "X";
        turnO=true;
        
    }
    checkWinner();
  });
});
}

//This Helps to disable the buttons When the Game is finished or Drawed
const disableButtons=()=>{
    boxes.forEach(box=>{
        box.classList.add("disabled")
    })
}

//This Function shows the winner with it's Symbol
const ShowWinner=(winner)=>{
    msg.innerText=`Congratulations the Winner is ${winner}`
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hide");
    newgameBtn.classList.remove("hide")
    disableButtons();
    }

//This Function helps us to enable the buttons when the Game reset's
const enableButtons=()=>{
    boxes.forEach(box=>{
        box.classList.remove("disabled")
        box.innerText="";
    })
}

//This Function display's the message when a game is drawn
const drawMessage=()=>{
    msg.innerText="The Game Has been Drawed";
    msgContainer.classList.remove("hide");
    disableButtons();
    resetBtn.classList.remove("hide");
    newgameBtn.classList.add("hide");
}

//This Helps to Identify the Winner
const checkWinner=()=>
    
    {
         
        for (let patterns of winnerPatterns) 
        {
        
            let Val1=boxes[patterns[0]].innerText;
            let Val2=boxes[patterns[1]].innerText;
            let Val3=boxes[patterns[2]].innerText;
            // Val1.style.color="green";
            //  Val2.style.color="green"
            //   Val3.style.color="green"
                if(Val1!=="" && Val2!=="" && Val3!=="")
                {

                    if(Val1===Val2 && Val2===Val3)
                        {
                            ShowWinner(Val1); 
                                return;
                        }
                }
            
        }
                let isdraw=true;
        boxes.forEach(box=>{
            if(box.innerText===""){
                isdraw=false;
            }
            
        });
        if(isdraw){
            drawMessage();
        }



    }

//This allows the user to give a chance to the player to select the symbol

xSymbol.addEventListener("click",()=>{
   if(!isSymbolSelected){
    playerSymbol=xSymbol.innerText;
    isSymbolSelected=true;
    optionsContainer.classList.add("hide");
    GameInitialization();
   }
})

//This allows the user to give a chance to the player to select the symbol

ySymbol.addEventListener("click",()=>{
   if(!isSymbolSelected){
    playerSymbol=ySymbol.innerText;
    isSymbolSelected=true;
    optionsContainer.classList.add("hide");
    GameInitialization();
   }
})


//This is the Event Listner When a Click is made on newgame and reset Button
newgameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
