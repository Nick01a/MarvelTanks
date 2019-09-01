let modal = document.createElement("div");
modal.className = "modal_player";
document.body.append(modal);
let tagDiv1 = document.createElement("div");
tagDiv1.className = "player_1";
tagDiv1.insertAdjacentHTML('beforeEnd', `<h2> Player 1</h2><hr>`);
tagDiv1.insertAdjacentHTML('beforeEnd', `<h4> Game keys</h4> `);
tagDiv1.insertAdjacentHTML('beforeEnd', ` <img class="imageBlock" src="./images/wasd.png" alt=""><br>`);
tagDiv1.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> For shoot</h4> `);
tagDiv1.insertAdjacentHTML('beforeEnd', ` <img class="shift" src="./images/space.png" alt=""><br>`);
tagDiv1.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> Ulti</h4> `);
tagDiv1.insertAdjacentHTML('beforeEnd', ` <img class="ulti" src="./images/r.png" alt=""><br>`);
tagDiv1.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> Your hero</h4> `);
modal.appendChild(tagDiv1);

let tagDiv2 = document.createElement("div");
tagDiv2.className = "heroes";

tagDiv2.insertAdjacentHTML('beforeEnd', `<div  class="spiderman avg"></div>`);
tagDiv2.insertAdjacentHTML('beforeEnd', `<div  class="ironman avg" ></div>`);
tagDiv2.insertAdjacentHTML('beforeEnd', `<div  class="daredevil avg" ></div>`);
tagDiv2.insertAdjacentHTML('beforeEnd', `<div  class="hawkeye avg" ></div>`);
modal.appendChild(tagDiv2);

let tagDiv3 = document.createElement("div");
tagDiv3.className = "player_2";
tagDiv3.insertAdjacentHTML('beforeEnd', `<h2>Player 2</h2><hr>`);
tagDiv3.insertAdjacentHTML('beforeEnd', `<h4>Game keys</h4> `);
tagDiv3.insertAdjacentHTML('beforeEnd', `<img class="imageBlock" src="./images/keyboard-arrows.png" alt=""><br>`);
tagDiv3.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> For shoot</h4> `);
tagDiv3.insertAdjacentHTML('beforeEnd', `<img class="shift" src="./images/shift.png" alt=""><br>`);
tagDiv3.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> Ulti</h4> `);
tagDiv3.insertAdjacentHTML('beforeEnd', `<img class="ulti" src="./images/l.png" alt=""><br>`);
tagDiv3.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> Your hero</h4> `);
modal.appendChild(tagDiv3);


let tagDiv4 = document.createElement("button");
tagDiv4.className = "start";
tagDiv4.innerHTML = "start";
tagDiv4.addEventListener("click", generate_map);
modal.appendChild(tagDiv4);
document.getElementsByClassName("start")[0].addEventListener('click', function () {
    document.getElementsByClassName("modal_player")[0].style.display = "none";
});
var counter = 0;
var hers = document.getElementsByClassName("avg");
for (var i = 0; i < hers.length; i++) {
    hers[i].addEventListener('click', function () {
        counter++;
        if (counter % 2 === 1 && counter <= 2) {
            let div1 = document.createElement("div");
            div1.id = "player1_hero";
            div1.className = "box1";
            div1.insertAdjacentHTML('beforeEnd', this.outerHTML);
            tagDiv1.appendChild(div1);
            this.style.background = 'rgb(128,128,128)';
        }
        else if (counter <= 2) {
            let div1 = document.createElement("div");
            div1.id = "player2_hero";
            div1.className = "box2";
            div1.insertAdjacentHTML('beforeEnd', this.outerHTML);
            tagDiv3.appendChild(div1);
            this.style.background = 'rgb(128,128,128)';
            // this.style.opacity = '0.8';
        }
    })
}

