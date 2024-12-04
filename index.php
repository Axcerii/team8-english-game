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
    <title>Brand and Butter</title>
</head>
<body>
        <?php
                printPlayer(1);
                printPlayer(2);
                printPlayer(3);
                printPlayer(4);
        ?>

    <div class='next-turn'>
        <p>Turn : <span id='turn-1'>1</span></p>
        <button onclick='changeTurn()'> Next Turn </button>
    </div>

    <nav>
        <ul>
            <li><button onclick='switchPlayer(1)'><span class="material-symbols-outlined">person</span><br>Player 1</button></li>
            <li><button onclick='switchPlayer(2)'><span class="material-symbols-outlined">person</span><br>Player 2</button></li>
            <li><button onclick='switchPlayer(3)'><span class="material-symbols-outlined">person</span><br>Player 3</button></li>
            <li><button onclick='switchPlayer(4)'><span class="material-symbols-outlined">person</span><br>Player 4</button></li>
        </ul>
    </nav>

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
                    <input type='text' class='playerName' placeholder = 'Player $number'>
                    <div class='group-stats'>
                        <div class='label'> Budget </div>
                        <input class='value' type='text' value='0' id='budget-$number'><span class='dollar'>$</span><span class='material-symbols-outlined'>payments</span>
                    </div>
                    <div class='group-stats'>
                        <div class='label'>Leads</div>
                        <input class='value' type='text' value='0' id='leads-$number'><span class='material-symbols-outlined'>groups</span>
                    </div>
                    <div class=' group-stats use-card'>
                        <input type='numeric' id='cardId-$number' min='100' max='700' placeholder='404' class='cardId'>
                        <button onclick='globalUseCard(Player$number)' class='button-usecard'>
                            Use Card
                        </button>
                    </div>
                </div>
                <div class='revenue'>
                    <div class='revenue-bar'>
                        <input type='text' value='0' class='revenue-value' id='revenue-$number'>
                    </div>
                </div>
                </div>
            </div>
            <div class='international-container'>
                <span class='material-symbols-outlined'> Globe </span>
                <p> INTERNATIONAL </p>
            </div>
    </section>
    ";
}
?>