
class BattleCalculator {
    constructor(player, enemy) {
        this.player = player;
        this.critical_Roll = false;
        this.player_attack_status = null;
        this.player_current_attack = null;
        
        this.enemy = enemy;
        this.enemy_Critical_Roll = false;
        this.enemy_attack_status = null;
        this.enemy_current_attack = null;

        //effect status
        this.stunned = false;
        this.poisoned = false;
        this.heal = false;
        this.defense_Up = false;
        this.burned = false;

        this.defense_Up_Duration = 0;
        this.heal_Duration = 0;
        this.effectDuration = 0;
        
        //turns variables
        this.playerTurn = false;
        this.battleOver = false;

        this.turnNumber = 1;

        
    }

    generateText(text){

    const battleText = document.createElement("div");
    battleText.classList.add("battle-text");
    battleText.textContent = text;
    document.getElementById("battle-text").appendChild(battleText);
    }

    GamePush(){
        Game.battleCalculator.push(this);
    }

    //Player Attack 
   playerRoll(){
    let playerRoll = Math.floor(Math.random() * 20) + 1;
    if(playerRoll === 20){
        this.critical_Roll = true;
    }
    return playerRoll + this.player.increment;
   }
    playerDamageRoll(){
    let attack = this.player_attack_status;
    let attack_dmg = 0
    for(let i = 0 ; i < parseInt(attack.dice_rolls); i++){
    let playerRoll = Math.floor(Math.random() * attack.damage.dice_sides) + 1;
    attack_dmg += playerRoll
    }
    return playerRoll + Math.floor(this.player.increment/2);
   }
   getPlayerAttack(attack_id){
   this.player_attack_status = this.player.Attack(attack_id);
   this.nextTurn();
   }
   playerAttack(){
    let attack = this.player_attack_status;
    let playerRoll = this.playerRoll();
    if(playerRoll >= this.enemy.ca){
        let damage = this.playerDamageRoll();
        this.enemy.hp -= damage;
       this.generateText(attack.attack_text);
       this.generateText(`${this.player.name} deal ${damage} damage!`);
   }
   else if(this.critical_Roll){
    let damage = this.playerDamageRoll() * 2;
    this.enemy.hp -= damage;
   this.generateText(attack.attack_text);
   this.generateText(`Critical hit! ${this.player.name} deal ${damage} damage!`);
   }
    else{
       this.generateText(attack.attack_text);
       this.generateText(`but ${this.player.name} missed!`);
    }

}

    effect(){

    let attack = this.player_attack_status;
    if(attack.effect){
        switch(attack.effect){
            case "stun":
                this.stunned = true;
                this.stunned_Duration = 1;
               this.generateText(`${this.enemy.name} is stunned and will miss their next turn!`);
            break;
            case "poison":
                this.poisoned = true;
               this.generateText(`${this.enemy.name} is poisoned and will take damage over time!`);
            break;
            case "heal":
                this.heal = true;
                this.heal_Duration = 2;
               this.generateText(`${this.player.name} is healed and will recover health over time!`);
            break;
            case "defense_Up":
                this.enemy.defense_Up = true;
                this.defense_Up_Duration = 3;
               this.generateText(`${this.enemy.name} is protected and will take less damage for the next 3 turns!`);
            break;
            case "burn":
                this.enemy.burned = true;
                this.burned_Duration = 2;
               this.generateText(`${this.enemy.name} is burned and will take damage over time!`);
            break;

        }

    }

}
    
        
    // End Of Player Attack


    // enemy attack

    enemyRoll(){
        let enemyRoll = Math.floor(Math.random() * 20) + 1;
        if(enemyRoll === 20){
        this.enemy_Critical_Roll = true
        }
        return enemyRoll + this.enemy.attack_increment;
    
        }

    enemyDamageRoll(){

        this.enemy_attack_status = this.enemy.enemyAttack();
        let attack = this.enemy.enemy_attack_status;
        let enemydamage = 0;
        for(let i = 0 ; i < parseInt(attack.dice_rolls); i++){
        enemydamage += Math.floor(Math.random() * attack.dice_sides) + 1;
        }
        return enemydamage + Math.floor(this.enemy.attack_increment/2);
    }
    enemyAttack(){
        let attack = this.enemy.enemy_attack_status;
        let enemyRoll = this.enemyRoll();
        if(enemyRoll >= this.player.ca){
            let damage = this.enemyDamageRoll();
            this.player.hp -= damage;
           this.generateText(attack.attack_text);
           this.generateText(`${this.enemy.name} deal ${damage} damage!`);
       }
         else if(this.enemy_Critical_Roll){
            let damage = this.enemyDamageRoll() * 2;
            this.player.hp -= damage;
           this.generateText(attack.attack_text);
           this.generateText(`Critical hit! ${this.enemy.name} deal ${damage} damage!`);
           }
        else{
           this.generateText(attack.attack_text);
           this.generateText(`but ${this.enemy.name} missed!`);
        }
    }

    checkHP(){

        if(this.player.hp <= 0){
       setInterval(generateText("You Died!"), 10000);
       window.location.href = "../GameOver.html";
        }
        if(this.enemy.hp <=0){
        setInterval(this.generateText(`you killed ${this.enemy.name}! Reward: ${this.enemy.xp_reward}`));
        this.player.xp += this.enemy.xp_reward;
        this.battleOver = true;
        }

    }

    nextTurn(){

        this.checkHP();

        if(this.turnNumber === 1){
       this.playerTurn = true;
        
        }
    
        if(this.playerTurn){
        this.playerRoll();
        this.playerDamageRoll();
        this.effect();
        this.playerTurn = false;
        if(this.heal && this.heal_Duration > 0){
            let heal = 0;
            for(let i = 0 ; i < 2 ; i++ ){
            heal += Math.floor(Math.random()*4) + 1;
            }
            this.player.hp += heal;
            this.heal_Duration--
        }
        if(this.defense_Up && this.defense_Up_Duration > 0){{
            this.player.ca += 2 * this.player.prof;
            this.player.rd += 2;
        }}
        this.turnNumber++;
        
        if(this.stunned){
            this.generateText(`${this.enemy.name} is stunned and misses their turn!`);
            this.stunned = false;
        }
    }
        else if(!this.playerTurn && !this.stunned){
        this.enemyRoll();
        this.enemyDamageRoll();
        this.enemyAttack();
        if(this.burned && this.effectDuration > 0){
        let fire_damage = 0;
            for(let i = 0 ; i < 2 ; i++ ){
            fire_damage += Math.floor(Math.random()*4) + 1;
            }
        this.enemy.hp -= fire_damage;
        
        this.effectDuration --
        }
        else if(this.poisoned && this.effectDuration > 0){
             let poison_damage = 0;
            for(let i = 0 ; i < 1 ; i++ ){
            poison_damage += Math.floor(Math.random()*6) + 1;
            }
        this.enemy.hp -= poison_damage;
        this.effectDuration --
        }
        else if(this.effectDuration == 0){
        this.poisoned = false;
        this.burned = false;    
        }            
       this.playerTurn = true;
    }
}



}
