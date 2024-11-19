// Select all individual boxes
let boxes = document.querySelectorAll(".box");
let newgameBtn=document.querySelector(".newgame-Btn");
let resetBtn=document.querySelector("#rst-Btn");
let msg=document.querySelector("#msg");
let msgContainer=document.querySelector(".msg-container")
let turnO=true;
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

const resetGame=()=>{
turnO=true;
enableButtons();
msgContainer.classList.add("hide");
resetBtn.classList.remove("hide")
}

// Add a click event listener to each box
boxes.forEach(box => {
  box.addEventListener("click", () => {
    
    if(box.classList.contains("disabled")||box.innerText!==""){
        return;
    }
    if(turnO){
        box.innerText = "X"; // Insert "X" only in the clicked box
        turnO=false;
        
    }else{
        box.innerText="O"
        turnO=true;
        
    }
    checkWinner();
  });
});

const disableButtons=()=>{
    boxes.forEach(box=>{
        box.classList.add("disabled")
    })
}

const ShowWinner=(winner)=>{
    msg.innerText=`Congratulations the Winner is ${winner}`
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hide");
    newgameBtn.classList.remove("hide")
    disableButtons();
    }

const enableButtons=()=>{
    boxes.forEach(box=>{
        box.classList.remove("disabled")
        box.innerText="";
    })
}

const drawMessage=()=>{
    msg.innerText="The Game Has been Drawed";
    msgContainer.classList.remove("hide");
    disableButtons();
    resetBtn.classList.remove("hide");
    newgameBtn.classList.add("hide");
}


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






newgameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);