var token = window.localStorage.getItem("token");
function login() {
    var email = $("#email").val();
    var password = $("#password").val();

    //Espacios en blanco
    if (email == "") {alert("Enter your email.");return;}
    if (password == "") {alert("Enter your password.");return;}

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

    var span= document.getElementById('span');;

    if (name == "") {span.innerText = "Enter your full name.";return;}
    if (email == "") {span.innerText ="Enter your email.";return;}
    if (password == "") {span.innerText ="Enter your  password.";return;}
    if (password2 == "") {span.innerText ="Enter the password confirmation.";return;}
    
    if (password != password2) {
        alert("The passwords are different.");
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
function newpost() {
    var title = $("#title").val();
    var body = $("#body").val();

    if (title == "") {span.innerText ="Enter the title.";return;}
    if (body == "") {span.innerText ="Enter the description.";return;}
    

    LoginApi.newPost(title, body)
    //them si es exitoso
    .then(function(response){
        console.log("Successfully: ", response);
    })
    //execption
    .catch(function (error) {
        alert("Error:intentelo de nuevamente")
        console.log("Error: ", error);

    });
    
}

function newcomment() {
    var body = $("#comment").val();

    if (body == "") {span.innerText ="Enter the description.";return;}
    

    LoginApi.newComment(body)
    //them si es exitoso
    .then(function(response){
        console.log("Successfully: ", response);
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
    $("#btnPost").click(function() {
        newpost();
    });
    $("#btnSignup").click(function() {
        signup();
    });
    $("#btnatras").click(function() {
        window.location="login.html";
    });
    $("#btnComment").click(function() {
        newcomment();
    });
}
