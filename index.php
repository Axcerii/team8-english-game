<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
    <title>Brand and Butter</title>
</head>
<body>
<!--     <section class='beta'>
        <?php
/*             for($i = 1; $i <= 4; $i++){
                printPlayer($i);
            } */
        ?>
    </section> -->

    <section class='container'>
        <div class='players'>
            <input type='text' class='playerName' value = 'Player 1'>
            <div style='width: 100%; height: 100%; display: flex;'>
                <div class='stats'>
                    <div class='group-stats'>
                        <div class='label'> Budget</div>
                        <input class='value' type='text' value='0'><span class="material-symbols-outlined">payments</span>
                    </div>
                    <div class='group-stats'>
                        <div class='label'>Leads</div>
                        <input class='value' type='text' value='0'><span class="material-symbols-outlined">groups</span>
                    </div>
                </div>
                <div class='revenue'>
                    <div class='revenue-bar'>
                        <input type="text" value="0" class='revenue-value'>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <nav>
        <ul>
            <li><button><span class="material-symbols-outlined">person</span><br>Player 1</button></li>
            <li><button><span class="material-symbols-outlined">person</span><br>Player 2</button></li>
            <li><button><span class="material-symbols-outlined">person</span><br>Player 3</button></li>
            <li><button><span class="material-symbols-outlined">person</span><br>Player 4</button></li>
        </ul>
    </nav>
</body>
</html>

<?php
function printPlayer($number){
    echo "
    <table>
            <tr>
                <th>Revenue</th>
                <th>Budget</th>
                <th>Prospects</th>
                <th>Turn</th>
                <th>Next Turn</th>
                <th>Use a Card</th>
            </tr>
            <tr>
                <td id='revenue-$number'></td>
                <td id='budget-$number'></td>
                <td id='prospects-$number'></td>
                <td id='turn-$number'></td>
                <td>
                    <button onclick='changeTurn()'>
                        Next Turn
                    </button>
                </td>
                <td>
                    <input type='numecric' id='cardId' min='100' max='700'>
                    <button onclick='globalUseCard(Player$number)'>
                        Use Card
                    </button>
                </td>
            </tr>
        </table>
    ";
}
?>