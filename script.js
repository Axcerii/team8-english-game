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
      this.revenue = 100000;
      this.leads = 0;
      this.bi = 0;
      
      this.playerName = document.getElementById(`playerName-${this.name}`);
      this.playerNameNav = document.getElementById(`player-${this.name}-button`);

      this.budgetDisplayer = document.getElementById(`budget-${this.name}`);
      this.revenueDisplayer = document.getElementById(`revenue-${this.name}`);
      this.leadsDisplayer = document.getElementById(`leads-${this.name}`);
      this.biDisplayer = document.getElementById(`globe-${this.name}`);
      this.globe = document.getElementById(`globe-${this.name}`);

      this.revenueBar = document.getElementById(`revenue-bar-${this.name}`);
      
      this.add_revenue = document.getElementById(`add-revenue-${this.name}`);
      this.add_leads = document.getElementById(`add-lead-${this.name}`);
      this.add_budget = document.getElementById(`add-budget-${this.name}`);
      this.add_bi = document.getElementById(`add-bi-${this.name}`);
    }
  

    useCard(card) {
      console.log("Utilisation de la carte :", card);
      let validate = 1;
      for (const [key, effet] of Object.entries(card.effects)) {
        if (!effet || !effet.operation) continue;
        

        if(key == "budget"){
          if(card.type == "Artistic Direction" || card.type == "Ecology" || card.type == "Marketing" || card.type == "Business International"){
            if(this.budget + effet.value < 0){
              alert("Budget to low!");
              validate = 0;
            }
          }
        }

        let givenValue = effet.value;

        if(this.bi > 0){
          if(key == "revenue"){
            givenValue = effet.value * 1.2;
          }
        }

        if(validate == 1){ 
          let result = 0;
          switch (effet.operation) {
            case "add":
              result = givenValue;
              this[key] += result;

              break;
            case "multiply":
              result = Math.round(this[key] * (givenValue-1));
              this[key] += result;

              break;
            case "subtract":
              result = givenValue;
              this[key] -= result;

              break;
            case "divide":
              result = Math.floor(this[key] / givenValue);
              this[key] = result;
              break;
            default:
              console.warn(`Opération inconnue : ${effet.operation}`);
          }

          if(result < 0){
            this[`add_${key}`].innerHTML = result;
            this.addAnimation(key);
          }
          else if (result > 0){
            this[`add_${key}`].innerHTML = `+${result}`;
            this.addAnimation(key);
          }
          else{
            this[`add_${key}`].innerHTML = "0";
          }
        }

          
      }
    }

    nextTurn(){
      let budgetAdded = Math.round(this.revenue*0.03);

      this.add_budget.innerHTML = `+${budgetAdded}`;
      this.addAnimation("budget");
      
      this.budget = Math.round(this.revenue*0.03 + this.budget);

      let leadsValue = 100;
      let leadsConsume = 350;

      if(this.leads > leadsConsume){
        let revenueAdded = leadsConsume*leadsValue;
        this.revenue += revenueAdded;
        this.leads -= leadsConsume;

        this.add_revenue.innerHTML = `+${revenueAdded}`;
        this.addAnimation("revenue");

        this.add_leads.innerHTML = `-${leadsConsume}`;
        this.addAnimation("leads");
      }
      else{
        let revenueAdded = this.leads*leadsValue;
        this.revenue += revenueAdded;

        if(this.leads != 0){
          this.add_revenue.innerHTML = `+${revenueAdded}`;
          this.addAnimation("revenue"); 
          
          this.add_leads.innerHTML = `-${this.leads}`;
          this.addAnimation("leads");
        }

        this.leads = 0;
      }



      this.printInfosPlayer();
    }

    printInfosPlayer(){
      if(this.budget < 0){
        this.budget = 0;
      }
      if (this.revenue < 0){
        this.revenue = 0;
      }

      this.budgetDisplayer.value = this.budget;
      this.revenueDisplayer.value = this.revenue;
      this.leadsDisplayer.value = this.leads;

      if(this.bi == 0){
        this.biDisplayer.style.color = "black";
        this.biDisplayer.style.opacity = "0.5";
        this.globe.style.filter = "saturate(0)";
      }
      else if(this.bi >= 1){
        this.biDisplayer.style.color = "var(--third-color)";
        this.biDisplayer.style.opacity = "1";
        this.globe.style.filter = "saturate(1)";
      }

      let barHeight = (this.revenue/5000000)*70;

      if(barHeight > 70){
        barHeight = 70;
      }
      else if (barHeight < 0){
        barHeight = 1;
      }


      this.revenueBar.style.height = `${barHeight}vh`;
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

      this.playerName.addEventListener('input', () => {
        this.playerNameNav.innerHTML = this.playerName.value;
      })
    }

    gettingStarted(){
      this.printInfosPlayer();
      this.eventListener();
    }

    addAnimation(key){
      this[`add_${key}`].style.display = "block";
      this[`add_${key}`].style.opacity = "1";

      setTimeout(() => {
        this[`add_${key}`].style.opacity = "0";
      }, 1000);
      setTimeout(() => {
        this[`add_${key}`].style.opacity = "1";
        this[`add_${key}`].style.display = "none";
      }, 3000);
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
    alert("This card doesn't exist!");
    return;
  }

  Player.useCard(myCard);
  Player.printInfosPlayer();

  cardInput.value = "";
}

function changeTurn(){
  turn++;
  document.getElementById('turn-1').innerHTML = turn;

  hidePopup("changeTurnPopup");

  Player1.nextTurn();
  Player2.nextTurn();
  Player3.nextTurn();
  Player4.nextTurn();


}