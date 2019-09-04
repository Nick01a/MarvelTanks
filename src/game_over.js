let modalOver = document.createElement("div");
modalOver.className = "modal_over";
document.body.append(modalOver);
let tagDiv = document.createElement("div");
tagDiv.insertAdjacentHTML('beforeEnd', `<img class=" over" src="./images/over.png" alt="">`);
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

