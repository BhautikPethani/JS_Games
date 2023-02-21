export function alertBox(type, msg){
    var alertBox = "";

    if(type=="warning"){
        return '<div class="alert alert-warning alert-dismissible fade show" role="alert">' + 
        msg +
        '</div>';
    }else if(type=="success"){
        return '<div class="alert alert-success" role="alert">' + 
        msg +
        '</div>';
    }else if(type=="danger"){
        return '<div class="alert alert-danger" role="alert">' + 
        msg +
        '</div>';
    }else {
        return '<div class="alert alert-info" role="alert">' + 
        msg +
        '</div>';
    }
}