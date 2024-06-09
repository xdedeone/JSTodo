//
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categoryTags = document.getElementById("category-tags");
//CREATION
function newTag() {
    document.querySelector(".selected").classList.remove("selected");
    let button = document.createElement("button");
    button.setAttribute("class", "tablink selected")
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

function addTask() {
    if(inputBox.value === "")
        alert("You need to add some task!")
    else {
        let inProgressTasks = listContainer.querySelectorAll(".in-progress");
        let lastChild = inProgressTasks[inProgressTasks.length -1];
        let selectedTag = document.querySelector(".selected");
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        lastChild ? lastChild.after(li) : listContainer.prepend(li);
        let span = document.createElement("span");
        li.appendChild(span);
        li.classList.add(selectedTag.innerHTML.replaceAll(" ", "").toLowerCase());
        let img = document.createElement("img");
        img.setAttribute("src", "img/edit.png");
        img.setAttribute("width", "28");
        span.appendChild(img);
    }
    inputBox.value = "";
    saveData();
}
//FUNCTIONS
function clearTags() {
    let allTag = document.getElementById("all");
    document.querySelector(".selected").classList.remove("selected");
    allTag.classList.add("selected");
    let list = listContainer.getElementsByTagName("li");
    for (let i = 0; i < list.length; i++) {
        list[i].classList.remove("hidden"); 
    }
}

function filterTag(target) {
    let tag = target.innerHTML.replaceAll(" ", "").toLowerCase();
    let list = listContainer.getElementsByTagName("li");
    for (let i = 0; i < list.length; i++) {
        if(list[i].classList.contains(tag))
            list[i].classList.remove("hidden")
        else
            list[i].classList.add("hidden")
    }
    saveData();
}

function selectTab(e) {
    let selectedTag = document.querySelector(".selected");
    selectedTag.classList.remove("selected");
    e.target.classList.add("selected");
    filterTag(e.target);
}
//EVENTS
function longPressed(e) {
    window.addEventListener('click', captureClick, true);
    confirm("You want to delete this TAG?") ? e.target.remove() : 0;
    saveData();
}

function captureClick(e) {
    e.stopPropagation();
    window.removeEventListener('click', captureClick, true);
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

listContainer.addEventListener("click", function(e) {
    let inProgressTasks = listContainer.querySelectorAll(".in-progress");
    let lastChild = inProgressTasks[inProgressTasks.length -1];
    if(e.target.tagName === "LI"){
        if (e.target.classList.contains("checked")){
            let unCheck = confirm("You want to un-check this task?") ? e.target.classList.remove("checked") : false;
            if(unCheck)
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
            confirm("You want to delete this task?") ? e.target.parentElement.parentElement.remove() : false;

    saveData();
}, false);
//MISC
function saveData() {
    localStorage.setItem("taskData", listContainer.innerHTML);
    localStorage.setItem("tagData", categoryTags.innerHTML);
}

function loadData() {
    let taskData = localStorage.getItem("taskData");
    let tagData = localStorage.getItem("tagData");
    taskData ? listContainer.innerHTML = taskData : null;
    tagData ? categoryTags.innerHTML = tagData : null,
    setEvents();
    clearTags();
}
loadData();