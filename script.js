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
      this.biDisplayer = document.getElementById(`globe-${this.name}`);

      this.revenueBar = document.getElementById(`revenue-bar-${this.name}`);
    }
  

    useCard(card) {
      console.log("Utilisation de la carte :", card);
      for (const [key, effet] of Object.entries(card.effects)) {
        if (!effet || !effet.operation) continue;
        
        let validate = 1;

        if(key == "budget"){
          if(this.budget + effet.value < 0){
            alert("Budget to low!");
            validate = 0;
          }
        }

        let givenValue = effet.value;

        if(this.bi > 0){
          if(key == "revenue"){
            givenValue = effet.value * 1.2;
          }
        }

        if(validate == 1){ 
          switch (effet.operation) {
            case "add":
              this[key] += givenValue;
              break;
            case "multiply":
              this[key] *= givenValue;
              break;
            case "subtract":
              this[key] -= givenValue;
              break;
            case "divide":
              this[key] = Math.floor(this[key] / givenValue);
              break;
            default:
              console.warn(`Opération inconnue : ${effet.operation}`);
          }
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
        this.biDisplayer.style.color = "lightgrey";
        this.biDisplayer.style.opacity = "0.5";
      }
      else if(this.bi >= 1){
        this.biDisplayer.style.color = "red";
        this.biDisplayer.style.opacity = "0.8";
      }

      let barHeight = (this.revenue/10000000)*70;

      if(barHeight > 70){
        barHeight = 70;
      }
      else if (barHeight < 0){
        barHeight = 1;
      }


      this.revenueBar.style.height = `${barHeight}vh`;
      this.revenueDisplayer.style.bottom = `${barHeight+1}vh`;
    }

    eventListener(){
      this.revenueDisplayer.addEventListener('input', () => {
        this.revenue = parseInt(this.revenueDisplayer.value, 10);
        this.printInfosPlayer();
      })

      this.leadsDisplayer.addEventListener('input', () => {
        this.leads = parseInt(this.leadsDisplayer.value, 10);
        this.printInfosPlayer();
      })

      this.budgetDisplayer.addEventListener('input', () => {
        this.budget = parseInt(this.budgetDisplayer.value, 10);
        this.printInfosPlayer();
      })
    }

    gettingStarted(){
      this.printInfosPlayer();
      this.eventListener();
    }

  } /* End of Player's Class */

const Player1 = new Player("1");
const Player2 = new Player("2");
const Player3 = new Player("3");
const Player4 = new Player("4");

Player1.gettingStarted();
Player2.gettingStarted();
Player3.gettingStarted();
Player4.gettingStarted();


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