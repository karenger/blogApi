var token = window.localStorage.getItem("token");
function login() {
    var email = $("#email").val();
    var password = $("#password").val();

    //Espacios en blanco
    if (email == "") {alert("Introduzca su correo.");return;}
    if (password == "") {alert("Introduzca su contrase;a.");return;}

    LoginApi.login(email,password)
    //them si es exitoso
    .then(function(response){
        console.log("Successfully: ", response);
        var token = response.token;
        
        //registrar el token en el local storage
        window.localStorage.setItem("token", token);
         //redireccionar al index.
         window.location="index.html";     
    })
    //execption
    .catch(function (error) {console.log("Error: ", error);});
}
function signup() {
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    
    if (password != password2) {
        alert("Las contraseñas son diferentes.");
        return;   
    }

    LoginApi.signup(name, email, password)
    //them si es exitoso
    .then(function(response){
        console.log("Successfully: ", response);
        login();
    })
    //execption
    .catch(function (error) {
        alert("Error:intentelo de nuevamente")
        console.log("Error: ", error);

    });
    
}

window.onload=function () {
    //Validar si existe un token mandarlo al index
    
    $("#btnLogin").click(function() {
        login();
    });
    $("#btnSignup").click(function() {
        signup();
    });

}
window.history.forward=function () {
    //Validar si existe un token mandarlo al index
    
    $("#btnLogin").click(function() {
        login();
    });
    $("#btnSignup").click(function() {
        signup();
    });

}