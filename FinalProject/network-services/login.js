import {login} from "/network-services/firebase-auth.js";
import {alertBox} from "/components/components.js";

btnSignin.addEventListener('click', async (e)=>{
    var email = txtEmail.value;
    var password = txtPassword.value;

    if(email != "" && password != ""){
        if(password.length >= 6){
            login(email, password);
        }else{
            alertPlaceHolder.innerHTML = alertBox("danger", "Invalid Credentials !!");    
        }
    }else{
        alertPlaceHolder.innerHTML = alertBox("danger", "Invalid Credentials !!");
    }
});