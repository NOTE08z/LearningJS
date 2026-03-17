
battleCalculator = Game.battleCalculator;
const enemy_icon_div = document.querySelector(".enemy-icon");
let enemy_icon = document.createElement("h1")
enemy_icon.textContent = enemy.icon;
enemy_icon_div.appendChild(enemy_icon);
console.log(enemy.icon);


const player_attack_list_div = document.querySelector(".player-attack-list");
    for(let i = 0; i< player.attack_list.length; i++){
    let attack_btn = document.createElement("button");
    attack_btn.textContent = player.attack_list[i];
    attack_btn.id = i;
    attack_btn.classList.add("attack-btn");
    attack_btn.addEventListener("click", function(){
    battleCalculator.getPlayerAttack(i);   
    });
    player_attack_list_div.appendChild(attack_btn);
    }

