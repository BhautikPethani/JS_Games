import {checkUserIsSignedInOrNot, signOutCurrentUser, database, currentUser} from "/network-services/firebase-auth.js";
import {alertBox} from "/components/components.js";
import {getCookie} from "/network-services/cookies.js";
import { set, ref, child, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

var user = getCookie("user");
var selectedUsers = [];
if(user != ""){
    checkUserIsSignedInOrNot();
}else{
    window.location.replace("/index.html");
}

btnSignOut.addEventListener('click', async (e)=>{
    signOutCurrentUser();
});

function getAllUsers(){
    get(child(ref(database), 'users/')).then((snapshot) => {
        var allUsers = [];
        snapshot.forEach(childSnapshot => {
            allUsers.push(childSnapshot.key);
        });
        displayAllUsersToParticipantsList(allUsers);
    }).catch((error) => {
        console.error(error);
    });
}

function displayAllUsersToParticipantsList(allUsers) {
    var html = "";
    allUsers.forEach(userName => {
        // console.log(userName);
        html+="<option value='"+userName+"'>"+userName+"</option>";
    });
    selectParticipants.innerHTML = html;
}
getAllUsers();

selectParticipants.addEventListener('change', (event) => {
  selectedUsers = [];

    for (var option of document.getElementById('selectParticipants').options)
    {
        if (option.selected) {
            selectedUsers.push(option.value);
        }
    }
    var value = "";
    selectedUsers.forEach(userName=>{
        value += "@"+userName;
    });
    txtSelectedUsers.value = value;
});

btnCreateWorkspace.addEventListener('click', async (e)=>{
    // console.log(currentUser);
    if(txtWorkspaceName.value != ""){
        if(selectedUsers.length > 0){
            setWorkSpace(txtWorkspaceName.value, generateUsername(currentUser.email), selectedUsers);
        }else{
            alertPlaceHolder.innerHTML = alertBox("warning", "Please add participants !!");
        }
    }else{
        alertPlaceHolder.innerHTML = alertBox("warning", "Please enter workspace name !!");
    }
});

function setWorkSpace(workspaceName, userName, participants){
    if(participants.indexOf(userName) == -1){
        participants.push(userName);
    }
    set(ref(database, 'workspaces/'+workspaceName+"-+="+userName), {
        workspaceName: workspaceName,
        participants: participants
    }).then(()=>{
        alertPlaceHolder.innerHTML = alertBox("success", "You're successfully registered");
        getWorkspaces();
    }).catch((error)=>{
        console.log(error.code);
        alertPlaceHolder.innerHTML = alertBox("danger", "Something went wrong !!");
    });
}

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
        // console.log(allWorkspaces);
        displayAllWorkspacesToTable(allWorkspaces);
    }).catch((error) => {
        console.error(error);
    });
}

getWorkspaces();

function onDeleteWorkspacePressed(btnId){
    console.log(btnId);
    set(ref(database, 'workspaces/'+btnId), {
        
    }).then(()=>{
        workspaceAlertPlaceHolder.innerHTML = alertBox("success", "Workspace deleted successfully !!");
        getWorkspaces();
    }).catch((error)=>{
        console.log(error.code);
        workspaceAlertPlaceHolder.innerHTML = alertBox("danger", "Something went wrong !!");
    });
}

function displayAllWorkspacesToTable(allWorkspaces){
    var html = "";
    var counter = 0;
    var btnWorkspaceList = [];
    allWorkspaces.forEach(workspace => {
        btnWorkspaceList.push(workspace.key);
        // console.log(workspace.key);
        counter++;
        html += "<tr>"
                    + "<th>"+counter+"</th>"
                    + "<td>"+workspace.val().workspaceName+"</td>"
                    + "<td><b>@"+getAdminFromWorkspaceName(workspace.key)+"</b></td>"
                    + "<td>"+getParticipantsListInText(workspace.val().participants)+"</td>";
                html+=(getAdminFromWorkspaceName(workspace.key) == generateUsername(currentUser.email)) ? '<td><button class="btn btn-danger" id="'+workspace.key+'">DELETE</button></td>' : '<td></td>';
                html+= "</tr>";
    });
    tblWorkspaces.innerHTML = html;

    btnWorkspaceList.forEach(btnId=>{
        if(getAdminFromWorkspaceName(btnId) == generateUsername(currentUser.email)){
            document.getElementById(btnId).addEventListener('click', async (e)=>{
                onDeleteWorkspacePressed(btnId);
            });
        }
    });
}

function getParticipantsListInText(list){
    var temp = "";
    list.forEach(x=>{
        temp += "@" + x + ", <br/>";
    });
    return temp;
}

function getAdminFromWorkspaceName(workspaceName){
    var splitWorkspaceName = workspaceName.split("-+=");
    return splitWorkspaceName[1];
}