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

      this.budgetDisplayer = document.getElementById(`budget-${this.name}`);
      this.revenueDisplayer = document.getElementById(`revenue-${this.name}`);
      this.prospectsDisplayer = document.getElementById(`prospects-${this.name}`);
      this.turnDisplayer = document.getElementById(`turn-${this.name}`);
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

const Player1 = new Player("1");
const Player2 = new Player("2");
const Player3 = new Player("3");
const Player4 = new Player("4");

Player1.printInfosPlayer();
Player2.printInfosPlayer();
Player3.printInfosPlayer();
Player4.printInfosPlayer();


/* Functions */

function globalUseCard(Player) {

  const cardId = parseInt(document.getElementById("cardId").value, 10);

  const myCard = cards.find(card => card.id === cardId);

  if (!myCard) {
    console.error("card with id", cardId, "not found", cardId);
    return;
  }

  Player.useCard(myCard);
  Player.printInfosPlayer();
}

function changeTurn(){
  Player1.nextTurn();
  Player2.nextTurn();
  Player3.nextTurn();
  Player4.nextTurn();
}