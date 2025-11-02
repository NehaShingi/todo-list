const inputBox=document.getElementById('inputBox');
const addBtn=document.getElementById('addBtn');
const todoList=document.getElementById('todoList');

let editTodo=null;


// Function to add a new task
const addTodo=()=>{
    const inputText=inputBox.value.trim();
    if(inputText.length<=0){
        alert("You must write something in to do");
        return false;
    }

    if(addBtn.value==="Edit"){
        editTodo.target.previousElementSibling.innerHTML=inputText;
        editLocalTodo(inputText);
        addBtn.value="Add";
        inputBox.value="";
    } else{
        // Creating p tag
        const li=document.createElement('li');
        const p=document.createElement('p');
        p.innerHTML =inputText;
        li.appendChild(p);

        // Creating Edit button
        const editBtn=document.createElement('button');
        editBtn.innerText= "Edit";
        editBtn.classList.add("btn","editBtn");
        li.appendChild(editBtn);

        //Creating Delete button
        const deleteBtn =document.createElement('button');
        deleteBtn.innerText= "Remove";
        deleteBtn.classList.add("btn","deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value="";
        saveLocalToDo(inputText);
    }
}


// Function to update an existing task (Edit/Delete) task
const updateTodo=(e)=>{
    if (e.target.innerHTML==="Remove"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement);
    }
   
    if(e.target.innerHTML==="Edit"){
        inputBox.value=e.target.previousElementSibling.innerHTML;
        inputBox.focus();     //to bring cursor on input box
        addBtn.value="Edit";
        editTodo=e;
    }
}

// Saving in Local Storage
const saveLocalToDo=(todo)=>{
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
        
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

// Function to get to-dos from Local Storage 
const getLocalTodo=()=>{
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
        
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo=>{
            // Creating p tag
            const li=document.createElement('li');
            const p=document.createElement('p');
            p.innerHTML =todo;
            li.appendChild(p);

            // Creating Edit button
            const editBtn=document.createElement('button');
            editBtn.innerText= "Edit";
            editBtn.classList.add("btn","editBtn");
            li.appendChild(editBtn);

            //Creating Delete button
            const deleteBtn =document.createElement('button');
            deleteBtn.innerText= "Remove";
            deleteBtn.classList.add("btn","deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
            inputBox.value="";
        
        });
    }
}

// Deleting from Local Storage
const deleteLocalTodo=(todo)=>{
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
        
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    let todoText= todo.children[0].innerHTML;
    let todoIndex= todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));


}

const editLocalTodo=(todo)=>{
    let todos= JSON.parse(localStorage.getItem("todos"));
    let todoIndex= todos.indexOf(todo);
    todos[todoIndex]= inputBox.value;
    localStorage.setItem("todos",JSON.stringify(todos));

}

document.addEventListener('DOMContentLoaded',getLocalTodo);
addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo);

