$(function() {
    $("#password_visibility").click(function(){
          var pass_input = document.getElementById("password");
          if (pass_input.type === "password") {
              pass_input.type = "text";
              $(this).removeClass("fa-eye").addClass("fa-eye-slash")
          } else {
              pass_input.type = "password";
              $(this).removeClass("fa-eye-slash").addClass("fa-eye")
          }
     });
  });
  $(function() {
    $("#password_visibility2").click(function(){
          var pass_input2 = document.getElementById("password2");
          if (pass_input2.type === "password") {
              pass_input2.type = "text";
              $(this).removeClass("fa-eye").addClass("fa-eye-slash")
          } else {
              pass_input2.type = "password";
              $(this).removeClass("fa-eye-slash").addClass("fa-eye")
          }
     });
  });