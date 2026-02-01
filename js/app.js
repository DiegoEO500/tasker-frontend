console.log("App.js is connected to the index.html");

var modal = document.getElementById("add-task-modal");

var button = document.getElementById("new-task-button");

var close = document.getElementById("close-modal-button");

button.onclick = function() {
    modal.style.display = "block";
}

close.onclick = function(){
    modal.style.display = "none"; 
}

window.onclick = function(){
    if(event.target == modal){
        modal.style.display = "none";
    }
}