import {checkUserIsSignedInOrNot, signOutCurrentUser, database, currentUser} from "/network-services/firebase-auth.js";
import {alertBox} from "/components/components.js";
import {createToLocal, readFromLocal} from "/network-services/cookies.js";
import { set, ref, child, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

var user = readFromLocal("user");

if(user != null){
    checkUserIsSignedInOrNot();
}else{
    window.location.replace("/index.html");
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