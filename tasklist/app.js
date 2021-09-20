// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const bodyTag = document.getElementsByTagName("body");





addEventElement();
function addEventElement(e){
    form.addEventListener("submit", formSubmit);
    taskList.addEventListener("click", deleteTask);
    filter.addEventListener("keyup", filterTasks);
    clearBtn.addEventListener("click", (e)=>{while(taskList.firstChild){taskList.firstChild.remove();}clearTBtn();});
    clearTBtn();






    let toastC = document.createElement("div");
    toastC.className = 'toast-container';
    bodyTag[0].appendChild(toastC);
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
    clearTBtn();
    }    
}
// remove items
function deleteTask(e){
    if(e.target.classList.contains("fa-remove")){
        e.target.parentElement.parentElement.remove();
        toastShow("The item has been removed");
        clearTBtn();
    }
}
// toast on delete item
function toastShow(toastText){
    let toasts = document.createElement("div");
    toasts.className = 'toast-custom';
    let toastHeader = document.createElement('span');
    toastHeader.innerHTML = "<i class='fa fa-remove'></i>";
    toasts.appendChild(toastHeader);
    toasts.appendChild(document.createTextNode(toastText));
    // bodyTag[0].appendChild(toasts);
    document.querySelector('.toast-container').append(toasts);
    setTimeout(function(){
        toasts.remove();
    }, 7000);
}
document.querySelector('.toast-container').addEventListener("click",(e)=>{e.target.parentElement.parentElement.remove();});
function clearTBtn(){
    if(taskList.children.length == 0){
        clearBtn.style.display = "none";
    }else{
        clearBtn.style.display = "block";
    }
}

// filtering tasks

function filterTasks(e){
    let filterText = e.target.value.toLowerCase();
    document.querySelectorAll(".task-item").forEach((index)=>{
        const item = index.firstChild.textContent;
        if(item.toLowerCase().indexOf(filterText) !== -1){
            console.log(item)
            index.style.display = 'flex';
        }else{
            index.style.display = 'none';
        }
    });
}