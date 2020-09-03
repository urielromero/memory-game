document.addEventListener('DOMContentLoaded' , () => {

//card options
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: "fries",
        img: 'images/fries.png'
    },
    {
        name: "cheeseburger",
        img: 'images/cheeseburger.png'
    },
    {
        name: "cheeseburger",
        img: 'images/cheeseburger.png'
    },
    {
        name: "hotdog",
        img: 'images/hotdog.png'
    },
    {
        name: "hotdog",
        img: 'images/hotdog.png'
    },
    {
        name: "ice-cream",
        img: 'images/ice-cream.png'
    },
    {
        name: "ice-cream",
        img: 'images/ice-cream.png'
    },
    {
        name: "milkshake",
        img: 'images/milkshake.png'
    },
    {
        name: "milkshake",
        img: 'images/milkshake.png'
    },
    {
        name: "pizza",
        img: 'images/pizza.png'
    },
    {
        name: "pizza",
        img: 'images/pizza.png'
    }
];


//randomize cards
cardArray.sort(() => 0.5 - Math.random());

//Select html element with class name "grid"
const grid = document.querySelector(".grid");

//Score counter
const resultDisplay = document.querySelector('#result');

//Track cards
var cardsChosen = [];
var cardsChosenId = [];
var cardsWon = [];

var card;
//Create board
function createBoard (){

    
    for (let i = 0; i < cardArray.length ; i++){
        
        //create img element to be added to DOM
        card = document.createElement ('img');

        //setting attributes to new element
        card.setAttribute('src', 'images/pattern.png');
        card.setAttribute('data-id', i);
        
        //each card calls function flipCard when clicked
        card.addEventListener('click', flipCard);
        
        //adding element to html/DOM
        grid.appendChild(card);
         
    }   

}

//Check for matching cards
function checkForMatch (){
    
    //test = [];

    //Select all img elements 
    var cards = document.querySelectorAll("img");
    
    
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    

    //if ids match then alert MATCH FOUND
        if  (cardsChosen[0] === cardsChosen[1]){
      
        alert("You Found a Match");
        
        //update board spaces to white space
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
            
        //remove event listener to matched cards. *fixes bug 
        cards[optionOneId].removeEventListener("click", flipCard);
        cards[optionTwoId].removeEventListener("click", flipCard);
        
        //add cards matched to cardsWon Array
        //contains 1 card per pair
        cardsWon.push(cardsChosen);
    }else{
        // if no match then cover cards again and alert user
        cards[optionOneId].setAttribute('src', 'images/pattern.png');
        cards[optionTwoId].setAttribute('src', 'images/pattern.png');
        alert("Sorry Try Again");
    }

    
    //clear arrays
    cardsChosen = [];
    cardsChosenId = [];
    //update score
    resultDisplay.textContent = cardsWon.length;

    //alert user once all pairs have been found
    if (cardsWon.length === cardArray.length/2){
        resultDisplay.textContent="Congrats! You found them All";
    }
    
}


//flip chosen card
function flipCard (){
    
    //get card by id
    var cardId =this.getAttribute('data-id');
    
    //add chosen card's name to cardsChosen Array
    cardsChosen.push(cardArray[cardId].name);
    
    // add chosen card's id to cardsChosenId Array
    // you can now access same card by name and id
    cardsChosenId.push(cardId);
    
    // set current cards src to its source value to display real image
    // we use the index number assigned to img  in createBoard function to access its 'img' src/value
    
    this.setAttribute("src", cardArray[cardId].img);
    
    
    //add if/else to fix same card selection match bug
    if(cardsChosenId[0] === cardsChosenId[1]){
        
        //do not add to arrays if card selected is the same card and not its pair
        cardsChosenId.pop();
        cardsChosen.pop();
        return;
        
    }else{
        //once we have picked two cards, check for a match
        if (cardsChosen.length  == 2){
   
            //allows system to display second img before cheking for a match
            setTimeout (checkForMatch, 500);
            
        }
    }
}

//run function  
createBoard ();
    

})