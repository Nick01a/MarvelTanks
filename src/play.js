const order_player = () => {
    let modal = document.createElement("div");
    modal.className = "modal_player";
    document.body.append(modal);
    let div = document.createElement("div");
    div.className = "block1";
    modal.appendChild(div);
    // document.getElementsByClassName("play_map")[0].appendChild(modal);
    let tagDiv = document.createElement("div");
    tagDiv.className = "player_1";
    tagDiv.innerHTML = "Player 1";
    div.appendChild(tagDiv);

    let tagDiv2 = document.createElement("div");
    tagDiv2.className = "player_2";
    tagDiv2.innerHTML = "Player 2";
    div.appendChild(tagDiv2);


    let tagDiv3 = document.createElement("div");
    tagDiv3.className = "heroes";
    tagDiv3.insertAdjacentHTML('beforeEnd', `<div  class="spiderman avg"></div>`);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<div  class="ironman avg"></div>`);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<div  class="hawkeye avg"></div>`);
    tagDiv3.insertAdjacentHTML('beforeEnd', `<div  class="daredevil avg"></div>`);
    modal.appendChild(tagDiv3);
    // modal.insertAdjacentHTML('beforeEnd',`<div class="heroes"></div>` );


    // getId('description').insertAdjacentHTML('beforeEnd', `<div style="height:60px;background-color:lightcoral;text-align:center;padding-top:20px; font-weight:bold">Немовля</div>`);
    let tagDiv4 = document.createElement("button");
    tagDiv4.className = "start";
    tagDiv4.innerHTML = "start";
    tagDiv4.addEventListener("click", generate_map);
    modal.appendChild(tagDiv4);
    // modal.insertAdjacentHTML('beforeend', `<div class="start">start</div>`);
    document.getElementsByClassName("start")[0].addEventListener('click', function () {
        document.getElementsByClassName("modal_player")[0].style.display = "none";
    });
    var counter = 0;
    // document.getElementById("spiderman").addEventListener('click', function () {
    //     let div1 = document.createElement("div");
    //     div1.className = "box";
    //     div1.insertAdjacentHTML('beforeEnd', `<div id="spiderman" class="spiderman"></div>`);
    //     arr.push(div1);
    //     tagDiv.appendChild(arr[0])

    // })

    var hers = document.getElementsByClassName("avg");
    // console.log(hers.length);
    for (var i = 0; i < hers.length; i++) {
        // console.log(hers[i]);
        hers[i].addEventListener('click', function () {
            counter++;
            if (counter % 2 === 1 && counter <= 2) {
                let div1 = document.createElement("div");
                div1.id = "player1_hero";
                div1.className = "box1";
                // console.log(this);
                div1.insertAdjacentHTML('beforeEnd', this.outerHTML);
                tagDiv.appendChild(div1);
            }
            else if (counter <= 2) {
                let div1 = document.createElement("div");
                div1.id = "player2_hero";
                div1.className = "box2";
                // console.log(this);
                div1.insertAdjacentHTML('beforeEnd', this.outerHTML);
                tagDiv2.appendChild(div1);
            }
        })
    }
};


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

const fly_fire = (hero,counter) =>{
    let hero_cords = cords(hero);
    let game_field = map();
    if(game_field[hero_cords[0] + counter][hero_cords[1]].className === "floor") {
        game_field[hero_cords[0] + counter][hero_cords[1]].className = "fire";
        if (counter > 1)
            game_field[hero_cords[0] + counter - 1][hero_cords[1]].className = "floor";
        setTimeout(function() {fly_fire(hero,counter+1)},400);
    }
    if (game_field[hero_cords[0] + counter][hero_cords[1]].className ==="heavy_block")
        if (counter > 1)
            game_field[hero_cords[0] + counter - 1][hero_cords[1]].className = "floor";
    if (game_field[hero_cords[0] + counter][hero_cords[1]].className ==="easy_block"){
        if (counter > 1)
            game_field[hero_cords[0] + counter - 1][hero_cords[1]].className = "floor";
        game_field[hero_cords[0] + counter][hero_cords[1]].className = "floor";}
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
            break;
        case 's':
            move_d(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0));
            break;
        case 'a':
            move_l(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0));
            break;
        case 'd':
            move_r(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0));
            break;
        case ' ':
            fly_fire(document.getElementsByClassName(document.getElementById('player1_hero').children.item(0).className).item(0), 1);
            break;
        case 'ArrowUp':
            move_u(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0));
            break;
        case 'ArrowDown':
            move_d(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0));
            break;
        case 'ArrowLeft':
            move_l(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0));
            break;
        case 'ArrowRight':
            move_r(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0));
            break;
        case 'Shift':
            fly_fire(document.getElementsByClassName(document.getElementById('player2_hero').children.item(0).className).item(0), 1);
            break;
    }
});


window.onload = () => {
    order_player();
};
