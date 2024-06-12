//
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categoryTags = document.getElementById("category-tags");
let todoTags = [];
//CREATION
function newTag() {
    let button = document.createElement("button");
    button.setAttribute("class", "tablink")
    let categoryName = prompt("Tag Name")
    if (categoryName == "" || !categoryName)
        return
    else {
        document.querySelector(".selected").classList.remove("selected");
        button.classList.add("selected");
        button.innerHTML = categoryName.toUpperCase();
        categoryTags.append(button);
    }
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
        tag = selectedTag.innerHTML.replaceAll(" ", "").toLowerCase();
        li.classList.add(tag);
        let img = document.createElement("img");
        img.setAttribute("src", "img/edit.png");
        img.setAttribute("width", "25");
        span.appendChild(img);
        let p = document.createElement("p");
        p.setAttribute("class", "tag")
        p.innerHTML = selectedTag.innerHTML;
        li.appendChild(p);
    }
    inputBox.value = "";
    saveData();
}
//FUNCTIONS
function clearTags() {
    let allTag = document.getElementById("all");
    let getSelected = document.querySelector(".selected");
    categoryTags.querySelectorAll(".tablink").forEach(t => {
        tag = t.innerHTML.replaceAll(" ", "").toLowerCase();
        if(todoTags.includes(tag))
            return;
        else
            todoTags.push(tag);
    });
    if(getSelected)
        getSelected.classList.remove("selected");
    allTag.classList.add("selected");
    let list = listContainer.getElementsByTagName("li");
    for (let i = 0; i < list.length; i++) {
        list[i].classList.remove("hidden");
        if(!todoTags.includes(list[i].classList[0])) {
            list[i].classList.replace(list[i].classList[0], "all"); 
            list[i].querySelector("p").innerHTML = "ALL";
        }
    }
}

function filterTag(target) {
    let tag = target.innerHTML.replaceAll(" ", "").toLowerCase();
    let list = listContainer.getElementsByTagName("li");
    for (let i = 0; i < list.length; i++) {
        if(list[i].classList.contains(tag))
            list[i].classList.remove("hidden");
        else
            list[i].classList.add("hidden");
    }
    saveData();
}

function selectTab(e) {
    if(e.target.classList.contains("tablink") && e.target.id !== "all") {
        let selectedTag = document.querySelector(".selected");
        selectedTag.classList.remove("selected");
        e.target.classList.add("selected");
        filterTag(e.target);
    }
}
//EVENTS
categoryTags.addEventListener("click", function(e) {
    selectTab(e);
}, false);

categoryTags.addEventListener("mousedown", function(e) {
    pressTimer = window.setTimeout(() => longPressed(e), 1000) });

categoryTags.addEventListener("mouseup", function() {
    clearTimeout(pressTimer) });

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

function longPressed(e) {
    window.addEventListener('click', captureClick, true);
    let deleteTag;
    if(e.target.id !== "all") {
        deleteTag = confirm("You want to delete this TAG?");
        tag = e.target.innerHTML.replaceAll(" ", "").toLowerCase();
        if(deleteTag) {
            todoTags.pop(tag);
            e.target.remove();
            clearTags();
        }
    }
    saveData();
}

function captureClick(e) {
    e.stopPropagation();
    window.removeEventListener('click', captureClick, true);
}
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
    clearTags();
}
loadData();