var cards = [];

fetch('cards.json')
  .then(response => response.json())
  .then(data => {
    cards = data;
    console.log("Cards Loaded :", cards);
  })
  .catch(error => console.error("Error while loading cards :", error));

class Player {
    constructor(name) {
      this.name = name;
      this.budget = 100000; 
      this.revenue = 0;
//    this.clients = 0;
      this.prospects = 0;
      this.turn = 1;

      this.budgetDisplayer = document.getElementById("budget");
      this.revenueDisplayer = document.getElementById("revenue");
      this.prospectsDisplayer = document.getElementById("prospects");
      this.turnDisplayer = document.getElementById("turn");
    }
  
    useCard(card) {
      for (const [key, effet] of Object.entries(card.effects)) {
        if (!effet || !effet.operation) continue;
        
        switch (effet.operation) {
          case "add":
            this[key] += effet.value;
            break;
          case "multiply":
            this[key] *= effet.value;
            break;
          case "subtract":
            this[key] -= effet.value;
            break;
          case "divide":
            this[key] = Math.floor(this[key] / effet.value);
            break;
          default:
            console.warn(`Opération inconnue : ${effet.operation}`);
        }
      }
    }

    nextTurn(){
      this.turn++;
      this.budget = this.revenue*0.1 + this.budget;

      let prospectsValue = 100;

      if(this.prospects > 1000){
        this.revenue += 1000*prospectsValue;
        this.prospects -= 1000;
      }
      else{
        this.revenue += prospectsValue*this.prospects;
        this.prospects = 0;
      }

      this.printInfosPlayer();
    }

    printInfosPlayer(){
      this.budgetDisplayer.innerHTML = this.budget;
      this.revenueDisplayer.innerHTML = this.revenue;
      this.prospectsDisplayer.innerHTML = this.prospects;
      this.turnDisplayer.innerHTML = this.turn;
    }
  } /* End of Player's Class */

const Player1 = new Player("Player 1");

Player1.printInfosPlayer();


/* Functions */

function globalUseCard() {

  const cardId = parseInt(document.getElementById("cardId").value, 10);

  const myCard = cards.find(card => card.id === cardId);

  if (!myCard) {
    console.error("card with id", cardId, "not found", cardId);
    return;
  }

  Player1.useCard(myCard);
  Player1.printInfosPlayer();
}