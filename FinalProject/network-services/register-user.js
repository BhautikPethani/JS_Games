import {registerNewUser} from "/network-services/firebase-auth.js";
import {alertBox} from "/components/components.js";

function validateEmail(email){
    var expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email) == true)
        return true
    return false;
}

function generateUsername(email){
    var splitArray = email.split("@");
    return splitArray[0];
}

btnSignUp.addEventListener('click', async (e)=>{
    var email = txtEmail.value;
    var firstName  = txtFirstname.value;
    var lastName = txtLastname.value;
    var password = txtPassword.value;
    var confirmPassword = txtConfirmPassword.value;

    if(firstName != "" && lastName != ""){
        if(password != "" && password == confirmPassword){
            if(password.length >= 6){
                if(validateEmail(email)){
                    var userName = generateUsername(email);

                    await registerNewUser(email, password, userName, firstName, lastName);
                }else{
                    alertPlaceHolder.innerHTML = alertBox("warning", "Invalid Email");
                }
            }else{
                alertPlaceHolder.innerHTML = alertBox("warning", "Password must contain at least 6 character");    
            }
        }else{
            alertPlaceHolder.innerHTML = alertBox("warning", "Confirm Password must be same as password");
        }
    }else{
        alertPlaceHolder.innerHTML = alertBox("warning", "Firstname and Lastname are mandatory !!");
    }
});