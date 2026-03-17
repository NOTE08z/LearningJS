

class Scene{
    constructor(isCombat, player, enemy,type){
        this.isCombat = isCombat;
        this.player = player;
        this.enemy = enemy;
        this.type = type || null;
        this.typeList =[];
        this.battleCalculator;
    }


    generateText(text){
    
           const battleText = document.createElement("div");
    battleText.classList.add("scene-text"); // já ajustei o nome também
    battleText.textContent = text;

    const container = document.querySelector(".combat-history");
    container.appendChild(battleText);

    }

    init(){
        if(this.isCombat){
            this.enemy.init();
            this.battleCalculator = new BattleCalculator(this.player, this.enemy);
            this.generateText(`A wild ${this.enemy.name} has appeared!`);
        }
        else if(!this.isCombat){
            switch(this.type){
                case "campfire":
                this.player.hp += Math.floor(this.player.level * 2);
                this.typeList.push("campfire");
                this.generateText("You rest at the campfire and recover some health.");
                break;
            }
        }
        if(this.battleCalculator.battleOver){
            let isCombatRandomizer = Math.floor((Math.random()*2) +1)
            if(isCombatRandomizer == 1){
            this.isCombat = false
            this.typeRandomizer = Math.floor((Math.random()*this.typeList.length)+1)
            this.type = this.typeList[this,this.typeRandomizer];
              this.scene = new Scene(this.isCombat,this.player,this.enemy,this.type);
            }
            else if(isCombatRandomizer == 2){
            this.scene = new Scene(true,this.player,this.enemy);
            }
        }
    }
}