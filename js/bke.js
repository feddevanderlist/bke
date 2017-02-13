/************************************************
 Hieronder staan alle globale variabelen
 ************************************************/

// CONSTANTEN
var GAME_BUTTON_ELEMENT = document.getElementsByClassName('game-button')[0];
var GAME_FIELD_ELEMENT = document.getElementById('speelveld').getElementsByTagName('img');
var SCORE_PLAYER1_ELEMENT = document.getElementsByClassName('rounds-info')[0]
    .getElementsByTagName('td')[1];
var SCORE_PLAYER2_ELEMENT = document.getElementsByClassName('rounds-info')[0]
    .getElementsByTagName('td')[3];
var CURRENT_ROUND_ELEMENT = document.getElementsByClassName('rounds-info')[0]
    .getElementsByTagName('td')[5];
var TURN_PLAYERIMAGE_ELEMENT = document.getElementsByClassName('players-turn')[0]
    .getElementsByTagName('img')[0];
var TURN_PLAYERNUMBER_ELEMENT = document.getElementsByClassName('players-turn')[0]
    .getElementsByTagName('td')[2];
var PLAYER_IMAGES = [ 'img/empty.jpg', 'img/cross.jpg', 'img/circle.jpg'  ];
//                       index 0           index 1          index 2

// VARIABLES
var score_player1 = 0;          // Score van speler 1
var score_player2 = 0;          // Score van speler 2
var current_round = 0;          // In welke ronde zitten we nu
var player_turn = 0;            // Welke speler is aan de beurt, 1 of 2

/************************************************************
 Hieronder begint de code van het spel
 ************************************************************/

/*
 window.onload
 -------------
 Dit is het gedeelte waar we, als de pagina net klaar is met laden in de browser,
 ons programma initialiseren. Oftewel klaar maken voor eerste gebruik.
 */
window.onload = test;

function test() {
    // 1. Button klikbaar maken
    GAME_BUTTON_ELEMENT.onclick = buttonClickHandler;

    // 2. Scores resetten
    score_player1 = 0;
    score_player2 = 0;
    current_round = 0;

    // 3. Beurt bepalen en tonen
    player_turn = Math.round( Math.random() + 1);
    TURN_PLAYERIMAGE_ELEMENT.src = PLAYER_IMAGES[player_turn];
    TURN_PLAYERNUMBER_ELEMENT.innerHTML = player_turn;

    // 4. Speelveld leegmaken
    clearGameField();

}   // EINDE FUNCTION window.onload



/*
 clearGameField
 --------------
 Deze functie maakt het speelveld helemaal leeg door
 alle img-tags te vullen met empty.jpg.
 */
function clearGameField() {
    for(var celnum = 0; celnum < 9; celnum++) {
        GAME_FIELD_ELEMENT[celnum].src = PLAYER_IMAGES[0];
    }
}   // EINDE FUNCTION clearGameField



/*
 buttonClickHandler
 ------------------
 Deze functie wordt steeds gestart/aangeroepen op het moment
 dat er op de button geklikt wordt en handelt alles af wat
 nodig is na een klik.
 */
function buttonClickHandler() {
    // a) Tekst op de button veranderen
  if(GAME_BUTTON_ELEMENT.innerText == 'Start spel')
  {

      GAME_BUTTON_ELEMENT.innerHTML = 'Reset spel';

    //b) Speelveld (cellen) klikbaar maken
    for(var celnum = 0; celnum < 9; celnum++) {
        GAME_FIELD_ELEMENT[celnum].onclick = cellClickHandler;
    }

    // c) Ronde verhogen en tonen
    current_round = current_round + 1;
    CURRENT_ROUND_ELEMENT.innerHTML = current_round;
  }
    //bij reset spel
  else
  {
      test();
      GAME_BUTTON_ELEMENT.innerHTML = 'Start spel';
      SCORE_PLAYER1_ELEMENT.innerHTML = score_player1;
      SCORE_PLAYER2_ELEMENT.innerHTML = score_player2;
  }

}   // EINDE FUNCTION buttonClickHandler


function cellClickHandler(event_info) {
    if(event_info.target.src.search('empty') > -1) {

        // 1. Plaatje van de huidige speler tonen
        event_info.target.src = PLAYER_IMAGES[player_turn];

        // 2. Checken of iemand gewonnen heeft
        if(checkwinner(1))
        {
            alert ("speler 1 heeft gewonnen");
            score_player1++;
            clearGameField();
            current_round = current_round + 1;
            CURRENT_ROUND_ELEMENT.innerHTML = current_round;
            SCORE_PLAYER1_ELEMENT.innerHTML = score_player1;

        }
        else if(checkwinner(2)) {
            alert("speler 2 heeft gewonnen");
            score_player2++;
            clearGameField();
            current_round = current_round + 1;
            CURRENT_ROUND_ELEMENT.innerHTML = current_round;
            SCORE_PLAYER2_ELEMENT.innerHTML = score_player2;
        }
        //checken voor gelijk spel
       else if(draw()){
            alert("draw");
            clearGameField();

        }


        // 3. Beurt doorgeven
        if(player_turn == 1)
            player_turn = 2;
        else
            player_turn = 1;

        TURN_PLAYERNUMBER_ELEMENT.innerHTML = player_turn;
        TURN_PLAYERIMAGE_ELEMENT.src = PLAYER_IMAGES[player_turn];
    }
}

function checkwinner(speler_nummer){
    //RIJ 1 Horizontaal
    if(GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[speler_nummer]) >-1
        &&
        GAME_FIELD_ELEMENT[1].src.search(PLAYER_IMAGES[speler_nummer]) >-1
            &&
            GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[speler_nummer]) >-1)
        return true;


    //rij 2 horizontaal
    if(GAME_FIELD_ELEMENT[3].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[5].src.search(PLAYER_IMAGES[speler_nummer]) >-1)
    return true;


    //rij 3 horizontaal
if(GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[7].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[speler_nummer]) >-1)
    return true;


    //rij 1 boven naar beneden
if(GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[3].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[speler_nummer]) >-1)
    return true;

    //rij 2 boven naar beneden
if(GAME_FIELD_ELEMENT[1].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[7].src.search(PLAYER_IMAGES[speler_nummer]) >-1)
    return true;

    //rij 3 boven naar beneden
if(GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[5].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[speler_nummer]) >-1)
    return true;


//kruis linksboven rechts onder
if(GAME_FIELD_ELEMENT[0].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[8].src.search(PLAYER_IMAGES[speler_nummer]) >-1)
    return true;

//kruis linkonder rechts boven
if(GAME_FIELD_ELEMENT[2].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[4].src.search(PLAYER_IMAGES[speler_nummer]) >-1
    &&
    GAME_FIELD_ELEMENT[6].src.search(PLAYER_IMAGES[speler_nummer]) >-1)
    return true;


return false;



}

function draw() {
    var return_value = true;

    for (celnum = 0; celnum < 9; celnum++) {
        if (GAME_FIELD_ELEMENT[celnum].src.search(PLAYER_IMAGES[0]) > -1) {
            return_value = false;
            break;
        }

    }

return return_value;
}
