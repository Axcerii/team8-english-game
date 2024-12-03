<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>Brand and Butter</title>
</head>
<body>
    <section class='beta'>
        <?php
            for($i = 1; $i <= 4; $i++){
                printPlayer($i);
            }
        ?>
    </section>
    <section class='bar'>
        
    </section>
    <section class='play-card'>

    </section>

    <script src='script.js'>

    </script>
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