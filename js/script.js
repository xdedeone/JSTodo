//
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value === "")
        alert("You need to add some task!")
    else {
        let inProgressTasks = listContainer.querySelectorAll(".in-progress");
        let lastChild = inProgressTasks[inProgressTasks.length -1];
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        lastChild ? lastChild.after(li) : listContainer.prepend(li);
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
    let inProgressTasks = listContainer.querySelectorAll(".in-progress");
    let lastChild = inProgressTasks[inProgressTasks.length -1];
    if(e.target.tagName === "LI"){
        if (e.target.classList.contains("checked")){
            e.target.classList.remove("checked")
            lastChild ? lastChild.after(e.target) : listContainer.prepend(e.target);
        }
        else if(e.target.classList.contains("in-progress")){
            e.target.classList.replace("in-progress", "checked");
            listContainer.append(e.target);
        }
        else{
            e.target.classList.add("in-progress");
            listContainer.prepend(e.target);
        }
        
    } else if (e.target.parentElement.tagName === "SPAN")
            e.target.parentElement.parentElement.remove();

    Array.from(listContainer).sort();

    saveData();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

loadData();