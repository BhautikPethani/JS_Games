import {checkUserIsSignedInOrNot, signOutCurrentUser} from "/network-services/firebase-auth.js";
import {alertBox} from "/components/components.js";
import {getCookie} from "/network-services/cookies.js";

var user = getCookie("user");

if(user != ""){
    checkUserIsSignedInOrNot();
}else{
    window.location.replace("/index.html");
}

btnSignOut.addEventListener('click', async (e)=>{
    signOutCurrentUser();
});