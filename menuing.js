function switchPlayer(playerNumber){
    const container1 = document.getElementById("section-1");
    const container2 = document.getElementById("section-2");
    const container3 = document.getElementById("section-3");
    const container4 = document.getElementById("section-4");

    container1.style.display = "none";
    container2.style.display = "none";
    container3.style.display = "none";
    container4.style.display = "none";
    
    const containerShow = document.getElementById(`section-${playerNumber}`);
    containerShow.style.display = "block";

    const root = document.documentElement;

    switch (playerNumber) {
      case 1:
        root.style.setProperty('--main-color', '#aadbea');
        root.style.setProperty('--second-color', '#fdd5a4');
        break;
      case 3:
        root.style.setProperty('--main-color', '#b6b6dc');
        root.style.setProperty('--second-color', '#fdd5a4');
        break;
      case 4:
        root.style.setProperty('--main-color', '#fdd5a4');
        root.style.setProperty('--second-color', '#aadbea');
        break;
      case 2:
        root.style.setProperty('--main-color', '#ebc8e0');
        root.style.setProperty('--second-color', '#fdd5a4');
        break;
      default:
        root.style.setProperty('--main-color', '#aadbea');
        root.style.setProperty('--second-color', '#fdd5a4');
        break;
    }
}