//patron para crear una instancia, los () al final permiten invocar la funcion.
var plantilla = "<tr><td><h3><b>${title}</b></h3><p>${body}</p><a href='profile.html';'>${userId}(${email})</a></td></tr>";

var plantillaUsers = "<a href='profile.html';'>${name}(${email})</a>";
var plantillaPost = "<h2>${title}</h2><p>${body}</p></td></tr>";
$.template("postTemplate", plantilla);

var LoginApi = (function () {
    //TODO: Base_Url
    var baseUrl = "http://localhost:8080";
    var PATH_LOGIN = "/login";
    var PATH_SIGNUP = "/register";
    var PATH_LOGOUT = "/logout";
    var PATH_POST = "/post";
    var PATH_USERS = "/users";

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
  
                        $.tmpl("postTemplate", data).appendTo("#Tabla_Post");
                        
                        console.log(data);

                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });

        },
        getusers: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    method: 'GET',
                    url: baseUrl + PATH_USERS,
                 headers: {'Authorization': 'Bearer ' + window.localStorage.getItem("token")},
                    success: function (data) {
                       data.forEach(Usuario => {
                           if (Usuario.id== userId) {
                               return Usuario.name;
                           }
                       });

                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });

        }

    }
})();

    