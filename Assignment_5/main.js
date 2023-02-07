let studentArray = [
    {firstName: "Dhairya", lastName: "Bhavsar", major: "Computer Science", gpa: 3.5},
    {firstName: "Jinesh", lastName: "Patel", major: "Mathematics", gpa: 3.8},
    {firstName: "Bhautik", lastName: "Pethani", major: "Engineering", gpa: 3.6},
    {firstName: "Mehul", lastName: "Patel", major: "History", gpa: 3.4},
    {firstName: "Vraj", lastName: "Patel", major: "Biology", gpa: 3.1}
  ];

var firstName = document.getElementById('fName');
var lastName = document.getElementById('lName');
var major = document.getElementById('major');
var gpa = document.getElementById('gpa');

var next = document.getElementById('next');
var previous = document.getElementById('previous');
var first = document.getElementById('first');
var last = document.getElementById('last');

var sort = document.getElementById('sort');
var reverseSort = document.getElementById('reverseSort');

var sortedDataTable = document.getElementById('sortedData');

var pointer = 0;
var swDisplayTableData = false;

pagination("first");

function display(){
  firstName.value = studentArray[pointer].firstName;
  lastName.value = studentArray[pointer].lastName;
  major.value = studentArray[pointer].major;
  gpa.value = studentArray[pointer].gpa;
}

function update(){
  studentArray[pointer].firstName = firstName.value;
  studentArray[pointer].lastName = lastName.value;
  studentArray[pointer].major = major.value;
  studentArray[pointer].gpa = parseFloat(gpa.value);
  
  if(swDisplayTableData){
    displayTableData();
  }
}

function pagination(action){
  if(action == "next"){
    pointer++;
    display();
  }else if(action == "previous"){
    pointer--;
    display();
  }else if(action == "first"){
    pointer = 0;
    display();
  }else if(action == "last"){
    pointer = 4;
    display();
  }

  if(pointer <= 0){
    first.disabled = true;
    previous.disabled = true;
  }else{
    first.disabled = false;
    previous.disabled = false;
  }

  if(pointer >= 4){
    last.disabled = true;
    next.disabled = true;
  }else{
    last.disabled = false;
    next.disabled = false;
  }

  if(swDisplayTableData){
    displayTableData();
  }
}

function sortUp(){
  studentArray.sort((a, b) => (a.gpa < b.gpa) ? 1 : -1);
  displayTableData();
}

function sortDown(){
  studentArray.sort((a, b) => (a.gpa > b.gpa) ? 1 : -1);
  displayTableData();
}

function displayTableData(){
  swDisplayTableData = true;
  sortedDataTable.innerHTML = "";
  for(let i = 0; i < studentArray.length; i++){
    const student = studentArray[i];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.major}</td>
      <td>${student.gpa}</td>
    `;
    sortedDataTable.appendChild(row);
  }
}
