import {checkUserIsSignedInOrNot, signOutCurrentUser, database, currentUser} from "/network-services/firebase-auth.js";
import {alertBox} from "/components/components.js";
import {createToLocal, readFromLocal} from "/network-services/cookies.js";
import { set, ref, child, get, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

var user = readFromLocal("user");
var selectedParticipants = [];
if(user != null){
    checkUserIsSignedInOrNot();
}else{
    window.location.replace("/index.html");
}

var currentWorkspaceKey = readFromLocal("currentWorkspaceKey");
if(currentWorkspaceKey != null){
    if(generateUsername(user.email) != getUsernameFromWorkspaceKey(currentWorkspaceKey)){
        btnAddNewTask.style.visibility = "hidden";
    }
}

function getUsernameFromWorkspaceKey(key){
    var splitArray = key.split("-+=");
    return splitArray[1];
}

btnSignOut.addEventListener('click', async (e)=>{
    signOutCurrentUser();
});

function generateUsername(email){
    var splitArray = email.split("@");
    return splitArray[0];
}

function getWorkspaces(){
    get(child(ref(database), 'workspaces/')).then((snapshot) => {
        var allWorkspaces = [];
        snapshot.forEach(childSnapshot => {
            if(childSnapshot.val().participants.indexOf(generateUsername(currentUser.email)) != -1){
                allWorkspaces.push(childSnapshot);
            }
        });
        displayWorkspaceToList(allWorkspaces);
    }).catch((error) => {
        console.error(error);
    });
}

function displayWorkspaceToList(workspaces){
    if(workspaces.length > 0){
        // currentWorkspaceKey && currentWorkspaceVal
        var html = '';
        var btnWorkspaceList = [];
        if(readFromLocal("currentWorkspaceKey") == null || readFromLocal("currentWorkspaceVal") == null){
            workspaces.forEach(workspace => {
                btnWorkspaceList.push(workspace);
                createToLocal("currentWorkspaceKey", workspace.key);
                createToLocal("currentWorkspaceVal", workspace.val());

                html+='<a class="dropdown-item" id="href'+workspace.key+'"><span class="fs-6"><span class="d-none d-sm-inline"><b>@'+workspace.val().workspaceName+'</b></span></span></a>';
            });
            updateCurrentWorkspaceName("@"+readFromLocal("currentWorkspaceVal").workspaceName);
            listWorkspaces.innerHTML = html;
        }else{
            updateCurrentWorkspaceName("@"+readFromLocal("currentWorkspaceVal").workspaceName);
            workspaces.forEach(workspace => {
                btnWorkspaceList.push(workspace);
                html+='<a class="dropdown-item" id="href'+workspace.key+'"><span class="fs-6"><span class="d-none d-sm-inline"><b>@'+workspace.val().workspaceName+'</b></span></span></a>';
            });
            updateCurrentWorkspaceName("@"+readFromLocal("currentWorkspaceVal").workspaceName);
            listWorkspaces.innerHTML = html;
        }
        btnWorkspaceList.forEach(btnId=>{
            document.getElementById("href"+btnId.key).addEventListener('click', async (e)=>{
                createToLocal("currentWorkspaceKey", btnId.key);
                createToLocal("currentWorkspaceVal", btnId.val());
                window.location.replace("/AdminPanel/adminDashboard.html");
            });
        });
    }else{
        openedWorkspace.innerHTML = "no workspace";
        listWorkspaces.innerHTML = "";
        window.location.replace("/AdminPanel/manageWorkspaces.html");
    }
}

function updateCurrentWorkspaceName(workspaceName){
    openedWorkspace.innerHTML = workspaceName;
    workSpaceTitle.innerHTML = workspaceName;
}

getWorkspaces();

function displayAllParticipantsToTaskParticipantsList(allUsers) {
    var html = "";
    // console.log(allUsers);
    allUsers.forEach(userName => {
        // console.log(userName);
        html+="<option value='"+userName+"'>"+userName+"</option>";
    });
    selectTaskParticipants.innerHTML = html;
}
displayAllParticipantsToTaskParticipantsList(readFromLocal("currentWorkspaceVal").participants);

selectTaskParticipants.addEventListener('change', (event) => {
  selectedParticipants = [];

    for (var option of document.getElementById('selectTaskParticipants').options)
    {
        if (option.selected) {
            selectedParticipants.push(option.value);
        }
    }
    var value = "";
    selectedParticipants.forEach(userName=>{
        value += "@"+userName;
    });
    txtSelectedParticipants.value = value;
});

btnAddTask.addEventListener('click', (event)=>{
    
    if(txtTaskName.value != ""){
        if(txtDescription.value != ""){
            if(txtDueDate.value != ""){
                if(txtStartDate.value != ""){
                    if(selectedParticipants.length > 0){
                        setNewTask(readFromLocal("currentWorkspaceKey"), txtTaskName.value, txtDescription.value, txtStartDate.value, txtDueDate.value, [], selectedParticipants, -1);
                    }else{
                        alertPlaceHolder.innerHTML = alertBox("warning", "Please select task participants !!");
                    }  
                }else{
                    alertPlaceHolder.innerHTML = alertBox("warning", "Please add start date !!");
                }
            }else{
                alertPlaceHolder.innerHTML = alertBox("warning", "Please add due date !!");
            }   
        }else{
            alertPlaceHolder.innerHTML = alertBox("warning", "Please add task description !!");
        }
    }else{
        alertPlaceHolder.innerHTML = alertBox("warning", "Please add task name !!");
    }
});

function setNewTask(workspaceKey, taskName, taskDescription, taskStartDate, taskDueDate, salaryByParticipants, participants, status){
    if(participants.indexOf(getUsernameFromWorkspaceKey(workspaceKey)) == -1){
        participants.push(getUsernameFromWorkspaceKey(workspaceKey));
    }
    set(ref(database, 'task/'+Date.now()+"=+-"+workspaceKey), {
        workspaceKey: workspaceKey,
        taskName: taskName,
        taskDescription: taskDescription,
        taskStartDate: taskStartDate,
        taskDueDate: taskDueDate,
        salaryByParticipants: salaryByParticipants,
        participants: participants,
        status: status
    }).then(()=>{
        alertPlaceHolder.innerHTML = alertBox("success", "New Task successfully added !!");
        getWorkspaces();
        getAllTasks();
    }).catch((error)=>{
        console.log(error.code);
        alertPlaceHolder.innerHTML = alertBox("danger", "Something went wrong !!");
    });
}

function getAllTasks(){
    get(child(ref(database), 'task/')).then((snapshot) => {
        var allTasks = [];
        snapshot.forEach(childSnapshot => {
            // console.log(childSnapshot.val().participants.indexOf(generateUsername(currentUser.email)));
            if(childSnapshot.val().participants.indexOf(generateUsername(currentUser.email)) != -1 && childSnapshot.val().workspaceKey == readFromLocal("currentWorkspaceKey")){
                allTasks.push(childSnapshot);
            }
        });
        addTaskToKanbanBoard(allTasks);
    }).catch((error) => {
        console.error(error);
    });
}
var modal = document.getElementById("showTaskDetailsModal");

function displayTaskDetailsModal(taskDetails) {
    taskDetailsTitle.innerHTML = taskDetails.taskName;
    taskDetailsDescription.innerHTML = taskDetails.taskDescription;
    taskDetailsStartDate.innerHTML = taskDetails.taskStartDate;
    taskDetailsDueDate.innerHTML = taskDetails.taskDueDate;
    taskDetailsParticipants.innerHTML = "";
    if(taskDetails.status == 1){
        var html = "";
        html+="<p><b>Budget Details :</b><br />";
        taskDetails.salaryByParticipants.forEach(salary=>{
            html+="@"+salary.memberUserId + " ( " + salary.hours + " hours * $" + salary.pay + " ) = $" + (salary.hours * salary.pay) + "<br/>";
        });
        taskDetailsBudgetDetails.innerHTML = html;
    }
    taskDetails.participants.forEach(participant =>{
        taskDetailsParticipants.innerHTML += "@" + participant + "<br/>";
    });
  modal.style.display = "block";
}

function addTaskToKanbanBoard(allTasks){
    var htmlPendingTask = "";
    var htmlInProgressTask = "";
    var htmlCompletedTask = "";
    var btnViewTaskModalList = [];
    var btnDeleteTaskModalList = [];
    allTasks.forEach(task=>{
        // console.log();
        // console.log(task.key);

        btnViewTaskModalList.push(task);
        if(task.val().status == -1){
            htmlPendingTask+= '<div class="row">' +
                        '<div class="col-1">' +
                            '<input class="form-check-input" type="checkbox" value="" id="status'+task.key+'" aria-label="..." />' +
                        '</div>' +
                        '<div class="col-8">'+
                            '<p class="fs-6"> '+task.val().taskName+' <span class="badge bg-danger" data-mdb-toggle="tooltip" title="Due date"><i class="fas fa-info-circle me-2"></i>'+formateDate(task.val().taskDueDate)+'</span></p>' +
                        '</div>' +
                        '<div class="col-3">';
            if(getUsernameFromWorkspaceKey(task.val().workspaceKey) == generateUsername(user.email)){
                btnDeleteTaskModalList.push(task);
                htmlPendingTask += '<a class="text-info"><i class="fas fa-pencil-alt me-2"></i></a>' +
                            '<a class="text-danger" id="delete'+task.key+'"><i class="fas fa-trash-alt me-2"></i></a>';
            }
            htmlPendingTask += '<a class="text-primary" id="view'+task.key+'"><i class="fas fa-eye"></i></a>' +
                        '</div>' +
                    '</div>';
        }else if(task.val().status == 0){
            htmlInProgressTask+= '<div class="row">' +
                        '<div class="col-1">' +
                            '<input class="form-check-input" type="checkbox" value="" id="status'+task.key+'" aria-label="..." />' +
                        '</div>' +
                        '<div class="col-8">'+
                            '<p class="fs-6"> '+task.val().taskName+' <span class="badge bg-danger" data-mdb-toggle="tooltip" title="Due date"><i class="fas fa-info-circle me-2"></i>'+formateDate(task.val().taskDueDate)+'</span></p>' +
                        '</div>' +
                        '<div class="col-3">';
            if(getUsernameFromWorkspaceKey(task.val().workspaceKey) == generateUsername(user.email)){
                btnDeleteTaskModalList.push(task);
                htmlInProgressTask += '<a class="text-info"><i class="fas fa-pencil-alt me-2"></i></a>' +
                            '<a class="text-danger" id="delete'+task.key+'"><i class="fas fa-trash-alt me-2"></i></a>';
            }
            htmlInProgressTask += '<a class="text-primary" id="view'+task.key+'"><i class="fas fa-eye"></i></a>' +
                        '</div>' +
                    '</div>';
        }else if(task.val().status == 1){
            htmlCompletedTask+= '<div class="row">' +
                        '<div class="col-9">'+
                            '<p class="fs-6"> '+task.val().taskName+' <span class="badge bg-danger" data-mdb-toggle="tooltip" title="Due date"><i class="fas fa-info-circle me-2"></i>'+formateDate(task.val().taskDueDate)+'</span></p>' +
                        '</div>' +
                        '<div class="col-3">';
            if(getUsernameFromWorkspaceKey(task.val().workspaceKey) == generateUsername(user.email)){
                btnDeleteTaskModalList.push(task);
                htmlCompletedTask += '<a class="text-info"><i class="fas fa-pencil-alt me-2"></i></a>' +
                            '<a class="text-danger" id="delete'+task.key+'"><i class="fas fa-trash-alt me-2"></i></a>';
            }
            htmlCompletedTask += '<a class="text-primary" id="view'+task.key+'"><i class="fas fa-eye"></i></a>' +
                        '</div>' +
                    '</div>';
        }
    });
    pendingTasksBoard.innerHTML = htmlPendingTask;
    inProgressTasksBoard.innerHTML = htmlInProgressTask;
    completedTasksBoard.innerHTML = htmlCompletedTask;

    btnViewTaskModalList.forEach(btnId=>{
        console.log(btnId.key);
        document.getElementById("view"+btnId.key).addEventListener('click', async (e)=>{
            displayTaskDetailsModal(btnId.val());
        });
        if (btnId.val().status != 1){
            document.getElementById("status"+btnId.key).addEventListener('click', async (e)=>{
                updateTaskStatus(btnId.key, btnId.val());
            });
        }
    });

    btnDeleteTaskModalList.forEach(btnId=>{
        document.getElementById("delete"+btnId.key).addEventListener('click', async (e)=>{
            onDeleteTaskPressed(btnId.key);
            // console.log(btnId.key);
        });
    });
}

function formateDate(date){
    return new Date(date + ' EST').toDateString('en-us', { year:"numeric", month:"short", day:"numeric"});
}

function onDeleteTaskPressed(btnId){
    console.log(btnId);
    set(ref(database, 'task/'+btnId), {
        
    }).then(()=>{
        taskAlertPlaceHolder.innerHTML = alertBox("success", "Task deleted successfully !!");
        getAllTasks();
    }).catch((error)=>{
        console.log(error.code);
        taskAlertPlaceHolder.innerHTML = alertBox("danger", "Something went wrong !!");
    });
}
var budgetModal = document.getElementById("showTaskBudgetModal");

function displayTaskBudgetModal(taskKey, taskDetails) {
    var html = "";
    taskDetails.participants.forEach(element => {
            html += '<div class="row">' +
                            '<div class="col-3">' +
                                '<p>@'+element+'</p>' +
                            '</div>' +
                            '<div class="col-3">' +
                                '<div class="form-group">' +
                                    '<label for="dueDate">Hours</label>' +
                                    '<input type="number" class="form-control" id="txtBudgetWorkedHours'+element+'">' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-3">' +
                                '<div class="form-group">' +
                                    '<label for="dueDate">Pay (Hourly)</label>' +
                                    '<input type="number" class="form-control" id="txtBudgetPay'+element+'">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<hr class="my-3"></hr>';
        });
    budgetInput.innerHTML = html;
    taskBudgetDetailsTitle.innerHTML = taskDetails.taskName;
    taskBudgetDetailsDescription.innerHTML = taskDetails.taskDescription;
    taskBudgetDetailsStartDate.innerHTML = taskDetails.taskStartDate;
    taskBudgetDetailsDueDate.innerHTML = taskDetails.taskDueDate;
    taskBudgetDetailsParticipants.innerHTML = "";
    taskDetails.participants.forEach(participant =>{
        taskBudgetDetailsParticipants.innerHTML += "@" + participant + "<br/>";
    });
  budgetModal.style.display = "block";

  btnUpdateTaskBudget.addEventListener('click', (event)=>{
        var budget = [];
        taskDetails.participants.forEach(element => {
            if(document.getElementById("txtBudgetWorkedHours" + element).value != "" && document.getElementById("txtBudgetPay" + element).value != ""){
                budget.push({memberUserId: element, hours: document.getElementById("txtBudgetWorkedHours" + element).value, pay: document.getElementById("txtBudgetPay" + element).value});
            }
        });

        if(budget.length == taskDetails.participants.length){
            update(ref(database, 'task/'+taskKey), {
                status: 1,
                salaryByParticipants: budget
            }).then(()=>{
                taskAlertPlaceHolder.innerHTML = alertBox("success", "Task updated successfully !!");
                budgetModal.style.display = "none";
                getAllTasks();
            }).catch((error)=>{
                console.log(error.code);
                taskAlertPlaceHolder.innerHTML = alertBox("danger", "Something went wrong !!");
            });
        }else{
            taskBudgetAlertPlaceHolder.innerHTML = alertBox("warning", "Please fill all fields !!");
        }
});
}

function updateTaskStatus(taskKey, taskValue){
    if(getUsernameFromWorkspaceKey(taskKey) == generateUsername(user.email)){
        if(taskValue.status == -1){
            update(ref(database, 'task/'+taskKey), {
                status: 0
            }).then(()=>{
                taskAlertPlaceHolder.innerHTML = alertBox("success", "Task updated successfully !!");
                getAllTasks();
            }).catch((error)=>{
                console.log(error.code);
                taskAlertPlaceHolder.innerHTML = alertBox("danger", "Something went wrong !!");
            });
        }else if(taskValue.status == 0){
            displayTaskBudgetModal(taskKey, taskValue);
        }
    }
}

getAllTasks();