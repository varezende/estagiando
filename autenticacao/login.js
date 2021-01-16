const btnLogin = document.getElementById("btn-login");
const btnCadastrar = document.getElementById("btn-signup");
const campoEmail = document.getElementById("login-email");
const campoSenha = document.getElementById("login-senha");
const loader = document.getElementById("loader");
const card = document.getElementById("card-div");

btnCadastrar.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "./signup.html";
});

function entrar() {
  setDisableLoginFields(true);
  toogleLoader();
  toogleButtons();

  login();
}

function setDisableLoginFields(valor) {
  campoSenha.setAttribute("disabled", valor);
  campoEmail.setAttribute("disabled", valor);
}

function toogleLoader() {
  if ($("#loader").is(":visible")) $("#loader").hide();
  else $("#loader").show();
}

function toogleButtons() {
  if ($("#btn-login").is(":visible")) {
    $("#btn-login").hide();
    $("#btn-signup").hide();
  } else {
    $("#btn-login").show();
    $("#btn-signup").show();
  }
}

function login() {
  const request = { mail: $("#login-email").val(), password: $("#login-senha").val() };

  $.ajax({
    url: "https://hackaton-ccr.herokuapp.com/api/auth/signin",
    type: 'post',
    data: JSON.stringify(request),
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      setCookie("access_token", data.access_token);
      setCookie("id_user", data.id_user);
      window.location.href = "./../oportunidades.html";

    },
    error: function (returnval) {
      toogleLoader();
      toogleButtons();
      setDisableLoginFields(false);
      alert("Ops... algo deu errado. Verifique seus dados e tente novamente.");
    }
  });
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}