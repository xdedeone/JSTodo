//
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value === "")
        alert("You need to add some task!")
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        li.appendChild(span);
        let img = document.createElement("img");
        img.setAttribute("src", "img/trash.png");
        img.setAttribute("width", "28");
        span.appendChild(img);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if (e.target.parentElement.tagName === "SPAN")
        e.target.parentElement.parentElement.remove();
    saveData();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

loadData();