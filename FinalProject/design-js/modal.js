var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

var addTaskModal = document.getElementById("addTaskModal");

var addTaskModal = document.getElementById("addTaskModal");
// When the user clicks the button, open the modal 
function showModal() {
  modal.style.display = "block";
}

function showAddTaskModal() {
  addTaskModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }else if (event.target == addTaskModal) {
    addTaskModal.style.display = "none";
  }
}