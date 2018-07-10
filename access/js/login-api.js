//patron para crear una instancia, los () al final permiten invocar la funcion.
// var plantilla1 = "<tr><td><h3><b>${title}</b></h3><p>${body}</p><a id='profile'href='profile.html'>${userId}(${email})</a></td></tr>";


var plantillaIndex ="<div class='col-lg-12 col-md-12' ><aside style='border-radius: 20px;'><div class='content-title'style='border-top-left-radius: 20px; border-top-right-radius: 20px'><h3><a href='#'>${title}</a></h3><p style='font-size: 25px'>${body}</p></div><div class='content-footer'><img class='user-small-img' src='image/account.png'><a id= 'profile'href='profile.html'style='font-size: 20px;color: #570d40b9;font-weight:bold'>${userId}</a></div></aside></div>"

var plantillaUser = "<a href='#'>${name}(${email})</a>";
var plantillaPost = "<h2>${title}</h2><p>${body}</p></td></tr>";
$.template("indexTemplate", plantillaIndex);
$.template("userTemplate", plantillaUser);


var LoginApi = (function () {
    //TODO: Base_Url
    var baseUrl = "http://localhost:8080";
    var PATH_LOGIN = "/login";
    var PATH_SIGNUP = "/register";
    var PATH_LOGOUT = "/logout";
    var PATH_POST = "/post";
    var PATH_USERS = "/users";
    var PATH_USERS = "/";

    return {
        login: function (email, password) {
            return new Promise(function (resolve, reject) {

                var ld = {
                    email: email,
                    password: password
                }

                $.ajax({
                    method: 'POST',
                    data: JSON.stringify(ld),
                    url: baseUrl + PATH_LOGIN,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (er) {
                        reject(error);
                    }
                });
            });

        },
        signup: function (name, email, password) {
            return new Promise(function (resolve, reject) {

                var ld = {
                    name: name,
                    email: email,
                    password: password
                }

                $.ajax({
                    method: 'POST',
                    data: JSON.stringify(ld),
                    url: baseUrl + PATH_SIGNUP,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });

        },
        logout: function (token) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    method: 'DELETE',
                    url: baseUrl + PATH_LOGOUT,

                    headers: {'Authorization': 'Bearer ' + token},
                    success: function (data) {
                        resolve(data);
                        console.log("ffff");
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });

        },
        getpost: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    method: 'GET',
                    url: baseUrl + PATH_POST,
                    headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
                    success: function (data) {
                        $.tmpl("indexTemplate", data).appendTo("#Tabla_Post");
                        data.forEach(usuario => {
                            getuser(usuario.userId);
                        });
                        console.log(data);

                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });

        }

    }
})();

    