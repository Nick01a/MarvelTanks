var direction_1;
var direction_2;
var kill_counter_1 = 0;
var kill_counter_2 = 0;
var winner;

const generate_map = () => {
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
            include("./src/game_over.js");
        }
    },12000);
};

const counter_check2 = (counter, pl) => {
    setTimeout(function () {
        if (kill_counter_2 === counter) {
            document.getElementsByClassName("play_map").item(0).style.display = "none";
            winner = pl;
            include("./src/game_over.js");
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
            include("./src/game_over.js");
        }
    if (counter >= 1) {
        if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === document.getElementById('player1_hero').children.item(0).className || game_field[hero_cords[0] + i][hero_cords[1] + j].className === "spider_ult_final") {
            game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
            document.getElementsByClassName("play_map").item(0).style.display = "none";
            winner = "Player 2";
            include("./src/game_over.js");
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

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

window.onload = () => {
    include("./src/start.js");
    setInterval(monster_move, 1000);
};
