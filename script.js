class Joueur {
    constructor(name) {
      this.name = name;
      this.budget = 100000; 
      this.revenue = 0;
//    this.clients = 0;
      this.prospects = 0;
    }
  
    useCard(card) {
      for (const [key, effet] of Object.entries(cards.effects)) {
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
  }