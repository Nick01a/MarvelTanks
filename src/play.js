const start = () =>
{
    let modal = document.createElement("div");
    modal.className = "modal_player";
    document.body.append(modal);
    let tagDiv1 = document.createElement("div");
    tagDiv1.className = "player_1";
    tagDiv1.insertAdjacentHTML('beforeEnd', `<h2> Player 1</h2><hr>`);
    tagDiv1.insertAdjacentHTML('beforeEnd', `<h4> Game keys</h4> `);
    tagDiv1.insertAdjacentHTML('beforeEnd', ` <img class="imageBlock" src="./src/img/wasd.png" alt=""><br>`);
    tagDiv1.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> For shoot</h4> `);
    tagDiv1.insertAdjacentHTML('beforeEnd', ` <img class="shift" src="./src/img/Space1.png" alt=""><br>`);
    tagDiv1.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> Ulti</h4> `);
    tagDiv1.insertAdjacentHTML('beforeEnd', ` <img class="ulti" src="./src/img/R1.png" alt=""><br>`);
    tagDiv1.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> Your hero</h4> `);
    modal.appendChild(tagDiv1);

    let tagDiv2 = document.createElement("div");
    tagDiv2.className = "heroes";


    tagDiv2.insertAdjacentHTML('beforeEnd', `<div  class="ironman avg" ></div>`);
    tagDiv2.insertAdjacentHTML('beforeEnd', `<div  class="daredevil avg" ></div>`);
    tagDiv2.insertAdjacentHTML('beforeEnd', `<div  class="hawkeye avg" ></div>`);
    tagDiv2.insertAdjacentHTML('beforeEnd', `<div  class="spiderman avg"></div>`);
    modal.appendChild(tagDiv2);

    let tagDiv3 = document.createElement("div");
    tagDiv3.className = "player_2";
    tagDiv3.insertAdjacentHTML('beforeEnd', `<h2>Player 2</h2><hr>`);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<h4>Game keys</h4> `);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<img class="imageBlock" src="./src/img/arrows.PNG" alt=""><br>`);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> For shoot</h4> `);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<img class="shift" src="./src/img/Shift1.png" alt=""><br>`);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> Ulti</h4> `);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<img class="ulti" src="./src/img/L1.png" alt=""><br>`);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<h4 style="line-height:0.6"> Your hero</h4> `);
    modal.appendChild(tagDiv3);


    let tagDiv4 = document.createElement("button");
    tagDiv4.className = "start";
    tagDiv4.innerHTML = "start";
    tagDiv4.addEventListener("click", generate_map);
    modal.appendChild(tagDiv4);

    var counter = 0;
    var st = 0;
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
            } else if (counter <= 2) {
                let div1 = document.createElement("div");
                div1.id = "player2_hero";
                div1.className = "box2";
                div1.insertAdjacentHTML('beforeEnd', this.outerHTML);
                tagDiv3.appendChild(div1);
                this.style.background = 'rgb(128,128,128)';
                st = 1;
            }
        })
    }
    document.getElementsByClassName("start")[0].addEventListener('click', function () {
        if (st === 1) {
            document.getElementsByClassName("modal_player")[0].style.display = "none";
            document.getElementsByClassName("counter_1")[0].style.display = "block";
            document.getElementsByClassName("counter_2")[0].style.display = "block";
        } else
            alert("Please restart page and choose two heroes");
    });
};

var direction_1;
var direction_2;
var kill_counter_1 = 0;
var kill_counter_2 = 0;
var winner;

export const generate_map = () => {
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            let point = document.createElement("div");
            point.className = "floor";
            if (Math.floor(Math.random() * Math.floor(4)) === 0) point.className = "easy_block";
            if (i === 0 || j === 0 || i === 14 || j === 14) point.className = "heavy_block";
            if (i % 2 === 0 && j % 2 === 0) point.className = "heavy_block";
            if (i === 1 && j === 1) point.className = document.getElementById('player1_hero').children.item(0).className;
            if (i === 13 && j === 1) point.className = document.getElementById('player2_hero').children.item(0).className;
            document.getElementsByClassName("play_map").item(0).appendChild(point);
        }
    }
    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("floor")[Math.floor(Math.random() * Math.floor(document.getElementsByClassName("floor").length))].className = "monster";
    }
    setInterval(function () {
        document.getElementsByClassName("floor")[Math.floor(Math.random() * Math.floor(document.getElementsByClassName("floor").length))].className = "monster";
    }, 5000);
    console.log(document.getElementById('player1_hero').children.item(0).className);
};


const map = () => {
    var map_elems = [];
    let count1 = 0;
    for (let i = 0; i < 15; i++) {
        let count2 = [];
        for (let j = 0; j < 15; j++) {
            count2.push(document.getElementsByClassName("play_map").item(0).children[count1]);
            count1++;
        }
        map_elems.push(count2);
    }
    return map_elems;
};

const cords = (item) => {
    var elem_coordinates = map();
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            if (item === elem_coordinates[i][j]) return [i, j];
        }
    }
};

const start_fire_1 = (hero) => {
    fly_fire(hero, 1, direction_1, 'fire', 0);
};

const start_fire_2 = (hero) => {
    fly_fire(hero, 1, direction_2, 'fire', 0);
};

const counter_check1 = (counter, pl) => {
    setTimeout(function () {
        if (kill_counter_1 === counter) {
            document.getElementsByClassName("play_map").item(0).style.display = "none";
            winner = pl;
            game_over();
        }
    },12000);
};

const counter_check2 = (counter, pl) => {
    setTimeout(function () {
        if (kill_counter_2 === counter) {
            document.getElementsByClassName("play_map").item(0).style.display = "none";
            winner = pl;
            game_over();
        }
    },12000);
};

const fly_fire = (hero, counter, dir, bl_class = 'fire', flag = 0) => {
    let hero_cords = cords(hero);
    let game_field = map();
    let i;
    let j;
    let i_min;
    let j_min;
    let i_f;
    let j_f;
    switch (dir) {
        case "s":
        case "ArrowDown":
        case 0:
            i = counter;
            j = 0;
            i_min = counter - 1;
            j_min = 0;
            i_f = counter + 1;
            j_f = 0;
            break;
        case "w":
        case "ArrowUp":
        case 1:
            i = -counter;
            j = 0;
            i_min = -counter + 1;
            j_min = 0;
            i_f = -counter - 1;
            j_f = 0;
            break;
        case "a":
        case "ArrowLeft":
        case 2:
            i = 0;
            j = -counter;
            i_min = 0;
            j_min = -counter + 1;
            i_f = 0;
            j_f = -counter - 1;
            break;
        case "d":
        case "ArrowRight":
        case 3:
            i = 0;
            j = counter;
            i_min = 0;
            j_min = counter - 1;
            i_f = 0;
            j_f = counter + 1;
    }
    if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "floor" || game_field[hero_cords[0] + i][hero_cords[1] + j].className === bl_class) {
        game_field[hero_cords[0] + i][hero_cords[1] + j].className = bl_class;
        if (counter > 1)
            game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
        setTimeout(function () {
            fly_fire(hero, counter + 1, dir, bl_class, flag);
        }, 200);
    }
    if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "heavy_block") {
        if (counter > 1) {
            game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
            if (flag === 2)
                game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "spider_ult_final";
        }
        if (flag === 1)
            game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
    }
    if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "easy_block_damaged") {
        if (counter > 1)
            game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
        game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
    }
    if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "easy_block") {
        if (counter > 1)
            game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
        game_field[hero_cords[0] + i][hero_cords[1] + j].className = "easy_block_damaged";
    }
    if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "monster") {
        if (counter > 1)
            game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
        if (hero.className === document.getElementById('player1_hero').children.item(0).className) {
            kill_counter_1 += 1;
            console.log(kill_counter_1);
            document.getElementsByClassName("counter")[0].innerHTML = (kill_counter_1);
            counter_check1(kill_counter_1, "Player 2");
        }
        if (hero.className === document.getElementById('player2_hero').children.item(0).className) {
            kill_counter_2 += 1;
            console.log(kill_counter_2);
            document.getElementsByClassName("counter")[1].innerHTML = (kill_counter_2);
            counter_check2(kill_counter_2, "Player 1");
        }
        game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
    }

    if (counter >= 1) {
        if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === document.getElementById('player2_hero').children.item(0).className || game_field[hero_cords[0] + i][hero_cords[1] + j].className === "spider_ult_final") {
            game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
            document.getElementsByClassName("play_map").item(0).style.display = "none";
            winner = "Player 1";
            game_over();
        }
    if (counter >= 1) {
        if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === document.getElementById('player1_hero').children.item(0).className || game_field[hero_cords[0] + i][hero_cords[1] + j].className === "spider_ult_final") {
            game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
            document.getElementsByClassName("play_map").item(0).style.display = "none";
            winner = "Player 2";
            game_over();
        }
    }
    }

};

const ultimates = (hero, dir) => {
    let hero_cords = cords(hero);
    let game_field = map();
    switch (dir) {
        case "s":
        case "ArrowDown":
            i = 1;
            j = 0;
            break;
        case "w":
        case "ArrowUp":
            i = -1;
            j = 0;
            break;
        case "a":
        case "ArrowLeft":
            i = 0;
            j = -1;
            break;
        case "d":
        case "ArrowRight":
            i = 0;
            j = 1;
            break;
    }
    if (hero.className === "ironman avg") {
        if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "floor")
            game_field[hero_cords[0] + i][hero_cords[1] + j].className = "heavy_block";
    }
    if (hero.className === "hawkeye avg") {
        fly_fire(hero, 1, dir, 'fire_ult', 1);
    }
    if (hero.className === "daredevil avg") {
        fly_fire(hero, 1, "s", 'daredevil_ult', 0);
        fly_fire(hero, 1, "w", 'daredevil_ult', 0);
        fly_fire(hero, 1, "a", 'daredevil_ult', 0);
        fly_fire(hero, 1, "d", 'daredevil_ult', 0);
    }
    if (hero.className === "spiderman avg") {
        fly_fire(hero, 1, dir, 'fire', 2);
    }
};


const move_u = (swaper) => {
    var c = cords(swaper);
    var m = map();
    if (m[c[0] - 1][c[1]].className === "floor") {
        m[c[0] - 1][c[1]].className = swaper.className;
        swaper.className = "floor";
    }
};

const move_r = (swaper) => {
    let c = cords(swaper);
    let m = map();
    if (m[c[0]][c[1] + 1].className === "floor") {
        m[c[0]][c[1] + 1].className = swaper.className;
        swaper.className = "floor";
    }
};

const move_l = (swaper) => {
    let c = cords(swaper);
    let m = map();
    if (m[c[0]][c[1] - 1].className === "floor") {
        m[c[0]][c[1] - 1].className = swaper.className;
        swaper.className = "floor";
    }
};

const move_d = (swaper) => {
    var c = cords(swaper);
    let m = map();
    if (m[c[0] + 1][c[1]].className === "floor") {
        m[c[0] + 1][c[1]].className = swaper.className;
        swaper.className = "floor";
    }
};


const monster_move = () => {
    let monsters = document.getElementsByClassName("monster");
    for (let i = 0; i < monsters.length; i++) {
        let moster_choice = Math.floor(Math.random() * 5);
        let monster_direction = Math.floor(Math.random() * 4);
        switch (moster_choice) {
            case 0:
                move_u(monsters[i]);
                break;
            case 1:
                move_r(monsters[i]);
                break;
            case 2:
                move_l(monsters[i]);
                break;
            case 3:
                move_d(monsters[i]);
                break;
            case 4:
                fly_fire(monsters[i], 1, monster_direction);
                break;
        }
    }
};


document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'w':
            move_u(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0));
            direction_1 = event.key;
            break;
        case 's':
            move_d(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0));
            direction_1 = event.key;
            break;
        case 'a':
            move_l(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0));
            direction_1 = event.key;
            break;
        case 'd':
            move_r(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0));
            direction_1 = event.key;
            break;
        case ' ':
            start_fire_1(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0));
            break;
        case 'r':
            if (kill_counter_1 === 5) {
                ultimates(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0), direction_1);
                setTimeout(function () {
                    kill_counter_1 = 0
                }, 4000);
            }
            break;
        case 'ArrowUp':
            move_u(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0));
            direction_2 = event.key;
            break;
        case 'ArrowDown':
            move_d(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0));
            direction_2 = event.key;
            break;
        case 'ArrowLeft':
            move_l(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0));
            direction_2 = event.key;
            break;
        case 'ArrowRight':
            move_r(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0));
            direction_2 = event.key;
            break;
        case 'Shift':
            start_fire_2(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0), 1);
            break;
        case 'l':
            if (kill_counter_2 === 5) {
                ultimates(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0), direction_2);
                setTimeout(function () {
                    kill_counter_2 = 0
                }, 4000);
            }
            break;
    }
});

const game_over =() => {
    let modalOver = document.createElement("div");
    modalOver.className = "modal_over";
    document.body.append(modalOver);
    let tagDiv = document.createElement("div");
    tagDiv.insertAdjacentHTML('beforeEnd', `<img class=" over" src="./src/img/over.png" alt="">`);
    modalOver.appendChild(tagDiv);
    let tagDiv11 = document.createElement("div");
    tagDiv11.insertAdjacentHTML('beforeEnd', `<div class=" winner"><h2 class="text">WINNER:${winner}</h2></div>`);
    modalOver.appendChild(tagDiv11);
    let tagDiv5 = document.createElement("button");
    tagDiv5.className = "start_over";
    tagDiv5.innerHTML = "start  again";
    modalOver.appendChild(tagDiv5);
    tagDiv5.addEventListener("click", function () {
        window.location.reload();
    });
};

window.onload = () => {
    start();
    setInterval(monster_move, 1000);
};
