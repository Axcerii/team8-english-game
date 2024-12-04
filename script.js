var cards = [];

fetch('cards.json')
  .then(response => response.json())
  .then(data => {
    cards = data;
    console.log("Cards Loaded :", cards);
  })
  .catch(error => console.error("Error while loading cards :", error));

var turn = 1;

class Player {
    constructor(name) {
      this.name = name;
      this.budget = 100000; 
      this.revenue = 0;
      this.leads = 0;
      this.bi = 0;

      this.budgetDisplayer = document.getElementById(`budget-${this.name}`);
      this.revenueDisplayer = document.getElementById(`revenue-${this.name}`);
      this.leadsDisplayer = document.getElementById(`leads-${this.name}`);
    }
  

    useCard(card) {
      console.log("Utilisation de la carte :", card);
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
      this.budget = this.revenue*0.1 + this.budget;

      let leadsValue = 100;
      let leadsConsume = 350;

      if(this.leads > leadsConsume){
        this.revenue += leadsConsume*leadsValue;
        this.leads -= leadsConsume;
      }
      else{
        this.revenue += leadsValue*this.leads;
        this.leads = 0;
      }

      this.printInfosPlayer();
    }

    printInfosPlayer(){
      if(this.budget < 0){
        this.budget = 0;
      }
      else if (this.revenue < 0){
        this.revenue = 0;
      }

      this.budgetDisplayer.value = this.budget;
      this.revenueDisplayer.value = this.revenue;
      this.leadsDisplayer.value = this.leads;

      if(this.bi == 0){

      }
    }

    eventListener(){

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

  const cardInput = document.getElementById(`cardId-${Player.name}`);
  const cardId = parseInt(cardInput.value, 10);

  const myCard = cards.find(card => card.id === cardId);

  if (!myCard) {
    console.error("card with id", cardId, "not found", cardId);
    return;
  }

  Player.useCard(myCard);
  Player.printInfosPlayer();

  cardInput.value = "";
}

function changeTurn(){
  turn++;
  document.getElementById('turn-1').innerHTML = turn;

  Player1.nextTurn();
  Player2.nextTurn();
  Player3.nextTurn();
  Player4.nextTurn();
}