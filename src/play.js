var direction_1;
var direction_2;
var kill_counter_1 = 0;
var kill_counter_2 = 0;


const generate_map = () => {
    for (let i = 0; i < 15; i++){
        for (let j = 0; j < 15; j++){
            let point = document.createElement("div");
            point.className = "floor";
            if (Math.floor(Math.random() * Math.floor(4)) === 0) point.className = "easy_block";
            if (i === 0 || j===0 || i === 14 || j === 14) point.className = "heavy_block";
            if (i%2 === 0 && j%2 ===0) point.className = "heavy_block";
            document.getElementsByClassName("play_map").item(0).appendChild(point);
        }
    }

    document.getElementsByClassName("floor").item(2).className = document.getElementById('player1_hero').children.item(0).className;
    document.getElementsByClassName("floor").item(14).className = document.getElementById('player2_hero').children.item(0).className;
    for (let i = 0; i < 4; i++){
        document.getElementsByClassName("floor")[Math.floor(Math.random() * Math.floor(document.getElementsByClassName("floor").length))].className = "monster";
    }
    setInterval(function(){document.getElementsByClassName("floor")[Math.floor(Math.random() * Math.floor(document.getElementsByClassName("floor").length))].className = "monster";}, 2000);
};


const map = () => {
    var map_elems = [];
    let count1 = 0;
    for(let i = 0; i<15; i++){
        let count2 = [];
        for(let j = 0; j<15; j++){
            count2.push(document.getElementsByClassName("play_map").item(0).children[count1]);
            count1++;
        }
        map_elems.push(count2);
    }
    return map_elems;
};

const cords = (item) => {
    var elem_coordinates = map();
    for(let i = 0; i<15; i++){
        for(let j = 0; j<15; j++){
            if(item === elem_coordinates[i][j]) return [i, j];
        }
    }
};


const start_fire_1 = (hero) => {
    fly_fire(hero, 1, direction_1);
    // ultimates(hero, direction_1);
};

const start_fire_2 = (hero) => {
    fly_fire(hero, 1, direction_2);
    // ultimates(hero, direction_2);
};



const fly_fire = (hero, counter , dir) =>{
    let hero_cords = cords(hero);
    let game_field = map();
    let i;
    let j;
    let i_min;
    let j_min;
    switch (dir) {
        case "s":
        case "ArrowDown":
            i = counter;
            j = 0;
            i_min = counter - 1;
            j_min = 0;
            break;
        case "w":
        case "ArrowUp":
            i = -counter;
            j = 0;
            i_min = - counter + 1;
            j_min = 0;
            break;
        case "a":
        case "ArrowLeft":
            i = 0;
            j = -counter;
            i_min = 0;
            j_min = -counter + 1;
            break;
        case "d":
        case "ArrowRight":
            i = 0;
            j = counter;
            i_min = 0;
            j_min = counter - 1;
    }
            if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "floor") {
                game_field[hero_cords[0] + i][hero_cords[1] + j].className = "fire";
                if (counter > 1)
                    game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
                setTimeout(function () {
                    fly_fire(hero, counter + 1, dir)
                }, 200);
            }
            if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "fire")
                if (counter > 1){
                    game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
                    // game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor"
                }
            if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "heavy_block")
                if (counter > 1)
                    game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
            if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "easy_block") {
                if (counter > 1)
                    game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
                game_field[hero_cords[0] + i][hero_cords[1] + j].className = "easy_block_damaged";
                counter = 0;
            }
            if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "monster") {
                if (counter > 1)
                    game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
                game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
                if (hero.className === document.getElementById('player1_hero').children.item(0).className){
                    kill_counter_1 += 1;
                    console.log(kill_counter_1);
                }
                if (hero.className === document.getElementById('player2_hero').children.item(0).className){
                    kill_counter_2 += 1;
                    console.log(kill_counter_2);
                }
            }
            if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "easy_block_damaged") {
                if (counter > 1)
                    game_field[hero_cords[0] + i_min][hero_cords[1] + j_min].className = "floor";
                game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
            }
            if (counter >= 1) {
                if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === document.getElementById('player1_hero').children.item(0).className) {
                    game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
                    alert("Player 2 won");
                }
            }
            if (counter >= 1) {
                if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === document.getElementById('player2_hero').children.item(0).className) {
                    game_field[hero_cords[0] + i][hero_cords[1] + j].className = "floor";
                    alert("Player 1 won");
                }
            }
};


const ultimates = (hero, dir) => {
    let hero_cords = cords(hero);
    let game_field = map();
    if (hero.className === "ironman avg"){
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
        if (game_field[hero_cords[0] + i][hero_cords[1] + j].className === "floor")
            game_field[hero_cords[0] + i][hero_cords[1] + j].className = "heavy_block";
    }
};


const move_u = (swaper) => {
    var c = cords(swaper);
    var m = map();
    if(m[c[0]-1][c[1]].className === "floor"){
        m[c[0]-1][c[1]].className = swaper.className;
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


document.addEventListener("keydown", (event) =>{

    switch(event.key){
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
            ultimates(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0), direction_1);
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
    }
});

function include(url ) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

window.onload = () => {
    include("./src/start.js");
    // include("./src/game_over.js");
    order_player();
};
