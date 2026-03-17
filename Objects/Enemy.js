
let player = Game.players[0];

class Enemy {
constructor(){
    this.name;
    this.type;
    this.base_hp = 10;
    this.hp = 0;
    this.base_ca = 10;
    this.ca = 0;
    this.rd = 0;
    this.base_attack_increment = 0;
    this.attack_increment = 0;
    this.attack_list = [];
    this.xp_reward = 0;
    this.icon;
}

enemyTypes(){
    switch(this.type){
        case 0:
            this.name = "Goblin";
            this.icon = "😡";
            this.base_hp = 8;
            this.base_ca = 5;
            this.base_attack_increment = 0;
            this.attack_list.push("Club Strike");
            this.xp_reward = 10;
            this.rd = 0
        break;
        case 1:
            this.name = "Wolf"
            this.icon = "🐺";
            this.base_hp = 12;
            this.base_ca = 8;
            this.base_attack_increment = 2;
            this.attack_list.push("Bite");
            this.xp_reward = 25;
            this.rd = 2;
        break;
        case 2:
            this.base_hp = 15;
            this.base_ca = 10;
            this.base_attack_increment = 3;
            this.attack_list.push("Fire Breath");
            this.xp_reward = 50;
            this.rd = 4;
        break;
    }
}

generateEnemy(){

    if(player.enemies_defeated < 5){
    let randomType = Math.floor(Math.random() * 2);
    this.enemyTypes(randomType);
    }
    else{
        this.enemyTypes(2);
    }
    this.hp = this.base_hp + (player.level * 5);
    this.ca = this.base_ca + player.level;
    this.attack_increment = this.base_attack_increment + (player.level/Math.floor(Math.random() * 3) + 1);
}

enemyAttack(){
    switch(this.attack_list[0]){
        case "Club Strike":
            this.dices_rolls = 1;
            this.dice_sides = 6;
            this.attack_text = `${this.name} strikes you with its club, dealing`;
        break;
        case "Bite":
            this.dices_rolls = 2;
            this.dice_sides = 4;
            this.attack_text = `${this.name} bites you, dealing`;
        break;
        case "Fire Breath":
            this.dices_rolls = 3;
            this.dice_sides = 6;
            this.attack_text = `${this.name} breathes fire on you, dealing`;
        break;

      
        
    }
      return{
        dices_rolls: this.dices_rolls,
        dice_sides: this.dice_sides,
        attack_text: this.attack_text
      }
}

init(){
    this.generateEnemy();
    Game.enemies.push(this);
}
}
