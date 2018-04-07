
//When you click the start button, this function runs to begin the game.
function startGame(){
    newPuzzle();
}




//Sets variable that chooses from all the different puzzles we have for the game.
    var puzzles = ["Billy the Kid", "Butch Cassidy", "Jesse James", "Buffalo Bill", "Davy Crockett", "Wild Bill Hickok", "Wyatt Earp"];

//Creating variables to be able to reference the game divs.
    var availableBox;
    var puzzleBox;
    var usedBox;

//Shows you how many guesses you have remaining before losing.
    var lives = 6;

//Create variable to be able to 'hide' the puzzle that is generated.
    var puzzle;

//Create variable for alphabet.
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'





//Function is called on load, and simplifies ability to reference our 3 game divs.
function initializeGame(){
    availableBox = document.getElementById('available');
    puzzleBox = document.getElementById('puzzle');
    usedBox = document.getElementById('used')

//Create the available alphabet buttons.
    for(i=0; i < alphabet.length; i++){
        var l = document.createElement('div');
        l.innerHTML = alphabet[i];
        l.className = 'availableAlphabet';
        l.onclick = function(){selectLetter(this); };
        availableBox.appendChild(l);
    }
}

//Changes the HTML of our puzzle div box, randomly chooses a puzzle from our puzzles array.
function newPuzzle(){
    var puzzleID = Math.floor(Math.random()*puzzles.length)
    puzzle = puzzles[puzzleID].toUpperCase();

    //Create a div and assign it a CSS class so that our puzzle turns into blank boxes, so that we can add a letter to it later.
    puzzleBox.innerHTML = '';
    for (i = 0; i < puzzle.length; i++){ 
        
        var box = document.createElement('div');
        box.id = 'letter_' + i;

        if(puzzle[i]==' ') box.className = 'box';
        else box.className = 'box letter';

        puzzleBox.appendChild(box);
    }

} 

//Once the letter it's clicked/used, put it in the 'used' box.
function selectLetter(selected){
    selected.style.visibility = 'hidden';
    var l = document.createElement('div');
    l.innerHTML = selected.innerHTML;
    l.className = 'usedAlphabet';
    usedBox.appendChild(l);

//Puts chosen letters into the randomly generated mystery word, and determines if it's in the word or not.
    var letter = selected.innerHTML;
    var current = '';
    var correct = false;

for(var i = 0; i < puzzle.length; i++){
    if(puzzle[i] == letter){
        document.getElementById('letter_' + i).innerHTML = letter;
        correct = true;
    }   
    if(document.getElementById('letter_' + i).innerHTML == '') current += ' ';
    else current += document.getElementById('letter_' + i).innerHTML;
}
    //You win the game once all the letters are picked correctly.
    if(current == puzzle) alert("You Win!!!");

    //Play right sound if letter is in the word, play wrong sound if it's not in the word.
    if(correct){
        document.getElementById('right').currentTime = 0;
        document.getElementById('right').play();
        l.style.backgroundColor = 'green';
    }
    else{
        document.getElementById('wrong').currentTime = 0;
        document.getElementById('wrong').play();
        l.style.backgroundColor = 'red';
        lives --;
        if(lives == 0) alert("You're out of lives... Sorry! The correct answer was: " + puzzle);
}}
