
class Player {

    constructor (name, class_id){

    this.name = name;

    // Leveling Attributtes
    this.level = 1;
    this.xp = 0;
    this.xp_max;
    this.prof;

    //Atributtes

    this.str;
    this.dex;
    this.con;
    this.sab;
    this.will;
    this.increment;

    //Stats Variables
    this.hp;
    this.mp; 
    this.ca;

    // Class Atributtes

    //lists or arrays
    this.class_list = ["Warrior", "Wizard", "Rogue"];
    this.attack_list = [];

    //class display
    this.class_id = class_id;
    this.class_name = this.class_list[this.class_id];

    //attack variable
    this.attack_id;
    this.dmg;
    this.crit = 20;
    this.crit_dmg = 1;
    this.crit_check;
    this.effect;
    this.effect_duration
    this.attack_text;

    //dice variables
    this.dice_rolls;
    this.dice_sides;

    //hidden variables

    this.enemies_defeated = 0;

    }
    pathFinder(){
        switch(this.class_id){
            case 0:
                this.warrior_path();
            break;
            case 1:
                this.wizard_path();
            break;
            case 2:
                this.rogue_path();
            break;
        }
    }
    warrior_path(){
    switch(this.level){
        case 1:
            this.str = 3;
            this.dex = 2;
            this.con = 4;
            this.sab = 0;
            this.will = 2;
            this.increment = this.str;
            this.attack_list.push("Basic Strike", "Strong Strike", "Guard");
        break;
        case 2:
            this.str += 1;
            this.con += 1;
            this.attack_list.push("Shield_Bash");
        break;
        case 3:
            this.str += 1;
            this.attack_list.push("Smite");
        break;
        }
    }
    wizard_path(){
    switch(this.level){
        case 1:
            this.str = 0;
            this.dex = 2;
            this.con = 1;
            this.sab = 4;
            this.will = 2;
            this.increment = this.sab;

            this.attack_list.push("Magic Missile", "Fireball", "Magic Shield");
        break;
        case 2:
            this.sab += 1;
            this.attack_list.push("Heal");
        break;
        case 3:
            this.sab += 1;
            this.attack_list.push("Meteor Strike");
        break;
        }
    }
    rogue_path(){
    switch(this.level){
        case 1:
            this.str = 1;
            this.dex = 4;
            this.con = 2;
            this.sab = 0;
            this.will = 2;
            this.increment = this.dex;

            this.attack_list.push("Backstab", "Dagger Throw", "Sneak Attack");
        break;
        case 2:
            this.dex += 1;
            this.attack_list.push("Poisoned Blade");
        break;
        case 3:
            this.dex += 1;
            this.attack_list.push("Shadow Strike");
        break;
        }

    }
    
        Attack(attack_id){

        if(this.class_id == 0){

            switch(attack_id){
                case 0:
                    this.dice_rolls = 1;
                    this.dice_sides = 6;
                    this.dmg = this.str + this.dice_rolls * this.dice_sides;
                    this.crit_dmg = Math.ceil(this.dmg * 2);
                    this.crit = 18;
                    this.attack_text = "You strike the enemy with your weapon, dealing";
                break;
                case 1:
                    this.dice_rolls = 2;
                    this.dice_sides = 6;
                    this.dmg = (this.str * 2) + this.dice_rolls * this.dice_sides;
                    this.crit_dmg = this.dmg * 3;
                    this.crit = 20;
                    this.attack_text = "You strike the enemy with a powerful blow, dealing ";
                    this.mp = this.mp - 2;
                break;
                case 2:
                    this.effect = "Defense Up";
                    this.effect_duration = 2;
                    this.attack_text = "You raise your shield, increasing your defense for 2 turns.";
                    this.mp = this.mp - 1;
                break;

                case 3:
                    this.dice_rolls = 3;
                    this.dice_sides = 4;
                    this.dmg = (this.str * 2) + dice_rolls * dice_sides;
                    this.crit_dmg = this.dmg * 2;
                    this.effect = "Stun";
                    this.effect_duration = 1;
                    this.crit = 20;
                    this.attack_text = "You strike the enemy with your shield, dealing " + this.dmg + " damage and stunning them for 1 turn.";
                    this.mp = this.mp - 2;
                break;

                case 4:
                    this.dice_rolls = 3;
                    this.dice_sides = 6;
                    this.dmg = (this.str * 3) + dice_rolls * dice_sides;
                    this.crit_dmg = this.dmg * 3;
                    this.crit = 20;
                    this.attack_text = "You, blessed by the gods, smite the enemy with a powerful strike,dealing ";
                    this.mp = this.mp - 3;
                break;

                    }
                }
            else if(this.class_id == 1){
                switch(attack_id){
                    case 0:
                        this.dice_rolls = 1;
                        this.dice_sides = 8;
                        this.dmg = this.sab + dice_rolls * dice_sides;
                        this.crit_dmg = this.dmg * 2;
                        this.crit = 20;
                        this.attack_text = "You cast a magic missile, dealing ";
                    break;
                    case 1:
                        this.dice_rolls = 3;
                        this.dice_sides = 4;
                        this.dmg = (this.sab * 2) + dice_rolls * dice_sides;
                        this.crit = 20;
                        if(this.crit_check){
                            this.dmg += Math.floor((Math.random()*4))+1+ this.sab;
                        }
                        this.attack_text = "You cast a fireball, dealing ";
                        this.mp -= 2;
                    break;
                    case 2:
                        this.effect = "Defense Up";
                        this.effect_duration = 3;
                        this.attack_text = "You cast a magic shield, increasing your defense for 3 turns.";
                        this.mp -= 1;
                    break;
                    case 3:
                        this.effect = "Heal";
                        this.effect_duration = 2;
                        this.attack_text = "You cast a heal spell, restoring your health.";
                        this.hp += (this.sab * 2) + Math.random(1, 6);
                        this.mp -= 3;
                    break;
                    case 4:
                        this.dice_rolls = 4;
                        this.dice_sides = 6;
                        this.dmg = (this.sab * 3) + dice_rolls * dice_sides;
                        this.crit_dmg = this.dmg * 3;
                        this.crit = 20;
                        this.attack_text = "You, master of the arcane, cast a meteor strike, dealing " + this.dmg + " damage.";
                        this.mp -= 4;
                    break;
                }
                }
                else if(this.class_id == 2){
                    switch(attack_id){
                        case 0:
                            this.dice_rolls = 1;
                            this.dice_sides = 4;
                            this.dmg = this.dex + dice_rolls * dice_sides;
                            this.crit_dmg = this.dmg * 2;
                            this.crit = 18;
                            this.effect = "Bleed";
                            this.effect_duration = 3;
                            this.attack_text = "You strike the enemy from the shadows, dealing " + this.dmg + " damage.";
                        break;
                        case 1:
                            this.dice_rolls = 2;
                            this.dice_sides = 6;
                            this.dmg = this.dex + dice_rolls * dice_sides;
                            this.crit_dmg = this.dmg * 2;
                            this.crit = 20;
                            this.attack_text = "You throw a dagger at the enemy, dealing " + this.dmg + " damage.";
                            this.mp -= 1;
                        break;
                        case 2:
                            this.dice_rolls = 2;
                            this.dice_sides = 4;
                            this.dmg = this.dex + dice_rolls * dice_sides;
                            this.crit_dmg = this.dmg * 2;
                            this.crit = 20;
                            this.attack_text = "You strike the enemy with a sneak attack, dealing ";
                            this.mp -= 2;
                        break;
                        case 3:
                           this.effect = "Poisoned Blade";
                            this.effect_duration = 2;
                            this.attack_text = "You Add poison to your blade.";
                            this.mp -= 3;
                        break;

                    }
                

                
                }

                return {
                    dice_rolls: this.dice_rolls,
                    dice_sides: this.dice_sides,
                    crit_dmg: this.crit_dmg,
                    crit: this.crit,
                    effect: this.effect || null,
                    effect_duration: this.effect_duration,
                    attack_text: this.attack_text
                }


            }
    
        defineStats(){
            this.hp = 10 + (this.con*4);
            this.mp = (this.level*2) + this.sab;
            this.ca = 10 + this.dex;
        }

        LevelUp(){
            this.xp_max = this.level * 100;
            this.prof = Math.ceil((this.level/4))+1;

            if(this.xp >= this.xp_max){
                this.xp -= this.xp_max;
                this.level += 1;
                this.pathFinder();
                this.defineStats();
            }
        }

    init(){
    this.pathFinder();
    this.defineStats();
    Game.players.push(this);
    }
    }