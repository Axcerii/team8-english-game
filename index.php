<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap" rel="stylesheet">
    <title>Sea of Success</title>
</head>
<body>
        <?php
                printPlayer(1);
                printPlayer(2);
                printPlayer(3);
                printPlayer(4);
        ?>
    
    <button onclick='showPopup("changeTurnPopup")' class='next-turn'> Next Turn </button>
    

    <nav>
        <ul>
            <li><button onclick='switchPlayer(1)'><span class="material-symbols-outlined">person</span><span id="player-1-button">Player 1</span></button></li>
            <li><button onclick='switchPlayer(2)'><span class="material-symbols-outlined">person</span><span id="player-2-button">Player 2</span></button></li>
            <li><button onclick='switchPlayer(3)'><span class="material-symbols-outlined">person</span><span id="player-3-button">Player 3</span></button></li>
            <li><button onclick='switchPlayer(4)'><span class="material-symbols-outlined">person</span><span id="player-4-button">Player 4</span></button></li>
        </ul>
    </nav>

    <section class="popup" id="changeTurnPopup">
        <div class="popup-content">
            <h2>Next Turn</h2>
            <p>Are you ready to pass the turn ?</p>

            <div class='yes-no'>
                <button onclick="changeTurn()" class='button-yes'>Yes</button>
                <button onclick="hidePopup('changeTurnPopup')" class='button-no'>No</button>
            </div>
        </div>
    </section>

    <div id='blackscreen'>

    </div>

    <p id="turn-1" style="display:none">1</p>
    <script src='menuing.js'></script>
    <script src='script.js'></script>
</body>
</html>

<?php

function printPlayer($number){
    echo "
        <section class='container' id='section-$number'>
            <div class='players'>
            <div style='width: 100%; height: 100%; display: flex;'>
                <div class='stats'>
                    <div class='div-playerName'>
                        <p>Your name</p>
                        <input type='text' class='playerName' placeholder = 'Player $number' id='playerName-$number'>
                    </div>
                    <div class=' group-stats use-card'>
                        <p> Use Card </p>
                        <input type='number' id='cardId-$number' min='100' max='700' placeholder='404' class='cardId'>
                        <button onclick='globalUseCard(Player$number)' class='button-usecard'>
                            Valid
                        </button>
                    </div>
                    <div class='div-value'>
                        <div class='group-stats'>
                            <p class='label'>Budget</p>
                            <div>
                                <input class='value' type='number' value='0' id='budget-$number'><span class='dollar'>$</span>
                                <p class='add-stats' id='add-budget-$number'>0</p>
                            </div>
                        </div>
                        <div class='group-stats'>
                            <p class='label'>Leads</p>
                            <div>
                                <input class='value' type='number' value='0' id='leads-$number'><span class='material-symbols-outlined'>groups</span>
                                <p class='add-stats' id='add-lead-$number'>0</p>
                            </div>                        
                        </div>
                    </div>
                </div>
                <div class='revenue'>
                    <div class='revenue-bar' id='revenue-bar-$number'>
                        <div class='revenue-value-container'>
                            <input type='number' value='0' class='revenue-value' id='revenue-$number'>
                            <p>Revenue</p>
                            <p class='add-revenue' id='add-revenue-$number'>0</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class='international-container' id='globe-$number'>
                <p> Business <br> International </p>
                <img class='globe' src='images/globe.svg' alt='globe' id='globe-$number'>
                <p class='add-stats' id='add-bi-$number'>0</p>
            </div>
    </section>
    ";
}
?>