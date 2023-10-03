document.addEventListener("DOMContentLoaded", function () {
 
const gameContainer = document.getElementById("game")


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let firstCard = null;
// TODO: Implement this function!
let canClick = true;
function handleCardClick(event) {
  if(!canClick) return;
 
  // you can use event.target to see which element was clicked
  let currentCard = event.target;

  if (currentCard === firstCard || currentCard.classList.contains("flipped")){
    return;
  }
  currentCard.style.backgroundColor = currentCard.classList[0];
  currentCard.classList.add("flipped")
  
  if(firstCard === null) {
    firstCard = currentCard;
  } else {
        let firstClass = firstCard.classList;
        let currentCardClasses = currentCard.classList;
        let match = true;
        
        if (firstClass.length !== currentCardClasses.length){
          match = false;
        } else {
          for (let i = 0; i < firstClass.length; i++) {
            if (!currentCardClasses.contains(firstClass[i])){
              match = false;
              break;
            }
          }
        }
        canClick = false;
        if(match){
          firstCard = null;
          canClick = true;
        } else {
          setTimeout(function(){
            firstCard.style.backgroundColor = "";
            firstCard.classList.remove("flipped");
            currentCard.style.backgroundColor = "";
            currentCard.classList.remove("flipped");
            firstCard = null
            canClick = true;
          },1000)
        }
}
}


// when the DOM loads
createDivsForColors(shuffledColors);



});

