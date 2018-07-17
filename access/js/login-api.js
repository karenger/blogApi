var plantillaPost = "<div class='col-lg-12 col-md-12' ><aside style='border-radius: 20px;'><div class='content-title'style='border-top-left-radius: 20px; border-top-right-radius: 20px'><h3><a href='comments.html?postId=${id}'>${title}</a></h3><p style='font-size: 25px'>${body}</p></div><div class='content-footer'><img class='user-small-img' src='image/account.png'><a href='profile.html?UserId=${userId}'style='font-size: 20px;color: #570d40b9;font-weight:bold'>${userId}</a></div> </aside></div>"
var plantillaPostProfile = "<h3 style='display:inline !important'><a href='comments.html?postId=${id}'>${title}...</a></h3><br>"
var plantillaPostComment = "<div class='col-lg-12 col-md-12' ><aside style='border-radius: 20px;'><div class='content-title'style='border-top-left-radius: 20px; border-top-right-radius: 20px'><h3><a href='comments.html?postId=${id}'>${title}</a></h3><p style='font-size: 25px'>${body}</p></div><div class='content-footer'><img class='user-small-img' src='image/account.png'><a href='profile.html?UserId=${userId}'style='font-size: 20px;color: #570d40b9;font-weight:bold'><p id='user' onload='LoginApi.getUser(${userId})'>${name}</p>${userId}</a></div></aside></div>"
var plantillaComment = "<div class='col-lg-12 col-md-12'  ><aside style='border-radius: 20px;' ><div class='content-title' style='border-top-left-radius: 20px; border-top-right-radius: 20px'><br><p style='font-size: 25px'>${body}</p></div><div class='content-footer' ><img class='user-small-img' src='image/account.png'><a id= 'profile'href='profile.html?UserId=${userId}'style='font-size: 20px;color: #570d40b9;font-weight:bold'>${userId}</a></div></aside></div>"
var plantillaMensaje = "<h1 style='font-weight:bold;font-size: 40px;	font-family: Open sans'>${mensaje}</h1>"
// var plantillaTitulo = "<br><h1 style='font-size:55px; font-weight:bold;text-align: center; font-family: 'Open sans'; color: white;'>${mensaje}</h1><br>"
var introducirComment = "<style type='text/css' >::placeholder { color: white; font-weight:bold; font-size:20px; }</style><i class='fa fa-comments' aria-hidden='true' style='font-size:40px'></i><textarea name='textarea' style='columns: 1%' class='input'  id='comment' placeholder='Add a comment...'></textarea><br><br><input style='margin-left:23px;background: #570d40b9;font-size: 25px;font-family: 'Open San'' type='button' onclick='LoginApi.newComment()' class='button' id='btnComment' value='Comment'><br><br><br>"
var plantillaCantidadComment="${contador}"
var plantillaUser = "<div class='col-lg-9 col-md-9'><aside><div class='content-footer' class='text-center'><img class='user-small-img' src='image/account.png'><label style='font-size: 50px;text-align: center; color: #fff'>${name}</label></div><div class='content-title'> <br><br><label style='font-size: 35px; margin-left:35px'>Email:  </label><label style='font-size: 35px'>&nbsp; ${email}</label><br><br></div><div class='content-footer' class='text-center'><label style='font-size: 40px;text-align: center; color: #fff'><br>&nbsp&nbsp&nbspPosts<br></label></div><div class='content-title'> <p id='Tabla_Post'></p></div></aside></div>"

var PlantillaNombre = "${id}"

$.template("postTemplate", plantillaPost);
$.template("postProfileTemplate", plantillaPostProfile);
$.template("commentTemplate", plantillaComment);
// $.template("tituloTemplate", plantillaTitulo);
$.template("mensajeTemplate", plantillaMensaje);
$.template("introducirComment", introducirComment);
$.template("userTemplate", plantillaUser);
$.template("nameTemplate", PlantillaNombre);
$.template("CantidadCommentTemplate", plantillaCantidadComment);

function getQueryParam(param) {
    location.search.substr(1)
        .split("&")
        .some(function (item) { // returns first occurence and stops
            return item.split("=")[0] == param && (param = item.split("=")[1])
        })
    return param
}

var LoginApi = (function () {
    //TODO: Base_Url
    var baseUrl = "http://localhost:8080";
    var PATH_LOGIN = "/login";
    var PATH_SIGNUP = "/register";
    var PATH_LOGOUT = "/logout";
    var PATH_POST = "/post";
    var PATH_USERS = "/users";
    var PATH_COMMENTS = "/comment";


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
                    headers: { 'Authorization': 'Bearer ' + token },
                    success: function (data) {
                        resolve(data);
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
                    headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
                    success: function (data) {
                        var contador;
                        data.forEach(element => { var cont=0;
                            //Buscar cantidad de comentarios
                            $.ajax({
                                method: 'GET',
                                url: baseUrl + PATH_POST + "/" + element.id + PATH_COMMENTS,
                                headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
                                success: function (data1) {
                                    for (var i = 0; i <= data1.length; i++) { cont = i; }
                                  }
                            });
                            //Buscar cnombre
                            $.ajax({
                                method: 'GET',
                                url: baseUrl + PATH_USERS + "/" + element.userId,
                                headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
                                success: function (data3) {
                                 
                                  $.tmpl("<div class='col-lg-12 col-md-12' ><aside style='border-radius: 20px;'><div class='content-title'style='border-top-left-radius: 20px; border-top-right-radius: 20px'><h3><a href='comments.html?postId="+element.id+"'>"+element.title+"</a></h3><p style='font-size: 25px'>"+element.body+"</p></div><div class='content-footer'><img class='user-small-img' src='image/account.png'><a href='profile.html?UserId="+element.userId+"'style='font-size: 20px;color: #570d40b9;font-weight:bold'>"+data3.name+"</a> <label id='cantComment' style='	margin-left:10px!important'><i  style=' color:black !important' class='fa fa-comments fa-2x' aria-hidden='true'></i>&nbsp;&nbsp;"+cont+"</label></div> </aside></div>").appendTo("#Tabla_Post"); 
                                }
                            });

                            
                             });
                        
                        console.log(data);
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });

        },
        getUserProfile: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    method: 'GET',
                    url: baseUrl + PATH_USERS + "/" + getQueryParam('UserId'),
                    headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
                    success: function (data) {
                        $.tmpl("userTemplate", data).appendTo("#profil");
                        //get post
                        $.ajax({
                            method: 'GET',
                            url: baseUrl + PATH_POST,
                            headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
                            success: function (data) {
                                var contador = 0;
                                data.forEach(element => {
                                    if (element.userId == getQueryParam('UserId')) { contador = contador + 1; console.log(element); }
                                });
                                //Presentar comentarios
                                if (contador == 0) { $.tmpl("mensajeTemplate", mensaje = [{ mensaje: "No post yet." }]).appendTo("#Tabla_Post"); }
                                if (contador >= 1) {
                                    data.forEach(element => {
                                        if (element.userId == getQueryParam('UserId')) { $.tmpl("postProfileTemplate", element).appendTo("#Tabla_Post"); }
                                    });
                                }
                                console.log(data);
                            }
                        });
                        console.log(data);

                    }
                });
            });

        },
        getcomment: function () {
            return new Promise(function (resolve, reject) {

                $.ajax({
                    method: 'GET',
                    url: baseUrl + PATH_POST + "/" + getQueryParam('postId') + PATH_COMMENTS,
                    headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
                    success: function (data) {
                        var contador = 0;
                        // BUSCAR EL POST
                        $.ajax({
                            method: 'GET',
                            url: baseUrl + PATH_POST + "/" + getQueryParam('postId'),
                            headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
                            success: function (data) {
                                $.tmpl("postTemplate", data).appendTo("#Tabla_Post");
                                $.tmpl("introducirComment", introducirComment).appendTo("#Tabla_Post");
                                console.log(data);
                            }
                        });
                        for (var i = 0; i < data.length; i++) { contador = i; }
                        //Presentar comentarios
                        if (contador == null) {
                            $.tmpl("mensajeTemplate", mensaje = [{ mensaje: "No comments yet." }]).appendTo("#mensaje");
                        }
                        else {
                            //$.tmpl("tituloTemplate", titulo = [{ mensaje: "Comments" }]).appendTo("#titulo");
                            $.tmpl("commentTemplate", data).appendTo("#Tabla_Comment");
                        }
                        

                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });

        },
        
        newComment: function (commentw) {
            return new Promise(function (resolve, reject) {
                var commentw = $('#comment').val();
                var ld = { body: commentw }
                $.ajax({
                    method: 'POST',
                    data: JSON.stringify(ld),
                    url: baseUrl + PATH_POST + "/" + getQueryParam('postId') + PATH_COMMENTS,
                    headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
                    success: function (data) {
                        window.location.reload();
                        console.log(data);
                        window.location.reload("index.html");
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });

        },
        newPost: function (title, body) {
            return new Promise(function (resolve, reject) {
                var ld = {
                    title: title,
                    body: body
                }
                $.ajax({
                    method: 'POST',
                    data: JSON.stringify(ld),
                    url: baseUrl + PATH_POST,
                    headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem("token") },
                    success: function (data) {
                        console.log(data);
                        window.location = "index.html";
                    },
                    error: function (error) {
                        reject(error);
                    }
                });
            });

        }




    }
})();


