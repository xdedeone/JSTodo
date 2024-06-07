//
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categoryTags = document.getElementById("category-tags");

function newCategory() {
    let button = document.createElement("button");
    button.setAttribute("class", "tablink")
    let categoryName = prompt("Tag Name")
    if (categoryName == "" || !categoryName)
        return
    else {
        button.innerHTML = categoryName.toUpperCase();
        categoryTags.append(button);
    }
    setEvents();
    saveData();
}

function clearTags() {
    let allTag = document.getElementById("all");
    let selectedTags = document.querySelectorAll(".selected").forEach(t => t.classList.remove("selected"));
    allTag.classList.add("selected")
}

function selectTab(e) {
    let allTag = document.getElementById("all");
    if(allTag.classList.contains("selected"))
        allTag.classList.remove("selected");
    e.target.classList.toggle("selected");
}

function longPressed(e) {
    window.addEventListener('click', captureClick, true);
    confirm("You want to delete this TAG?") ? e.target.remove() : 0;
    saveData();
}

function captureClick(e) {
    e.stopPropagation();
    window.removeEventListener('click', captureClick, true);
}

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
            confirm("You want to delete this task?") ? e.target.parentElement.parentElement.remove() : 0;
        

    Array.from(listContainer).sort();

    saveData();
}, false);

function saveData() {
    localStorage.setItem("taskData", listContainer.innerHTML);
    localStorage.setItem("tagData", categoryTags.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem("taskData");
    categoryTags.innerHTML = localStorage.getItem("tagData");
    setEvents();
}

function setEvents() {
    tagButtons = document.querySelectorAll(".tablink");
    for (let i = 1; i < tagButtons.length; i++) {
        tagButtons[i].addEventListener("mousedown", function(e) {
            pressTimer = window.setTimeout(() => longPressed(e), 1000) });
        tagButtons[i].addEventListener("mouseup", function() {
            clearTimeout(pressTimer) });
        tagButtons[i].addEventListener("click", function(e) {
            selectTab(e) });
    };
}

loadData();