// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');





addEventElement();
function addEventElement(e){
    form.addEventListener("submit", formSubmit);
}

function formSubmit(e){
    e.preventDefault();
    // validation
    if(taskInput.value === "" || taskInput.value.replace(/\s+/g, '').length == 0){
        e.target.children[0].classList.add("error");
        let childSearch = e.target.children[0].children;
        let errorIndex;
        childSearch = Array.from(childSearch);
        childSearch.forEach((element, index) => {
            if(childSearch[index].classList.length > 0 && childSearch[index].classList.contains("error")){
                errorIndex = index;
            }
        });
        e.target.children[0].children[errorIndex].innerText = "Please write some valid Task!!";
        e.target.children[0].children[0].addEventListener("change", (e) =>{
            e.target.parentElement.children[errorIndex].innerText = "";
            e.target.parentElement.classList.remove("error");
        });
    }else{
    // adding tasks 
    let newTask = document.createElement("li");
    newTask.className = 'task-item';
    newTask.appendChild(document.createTextNode(taskInput.value));
    const aTag = document.createElement('a');
    aTag.innerHTML = "<i class='fa fa-remove'></i>";
    newTask.appendChild(aTag);
    taskList.appendChild(newTask);
    taskInput.value = "";
    }    
}