const campoSenha = document.getElementById("signup-senha");
const campoCPF = document.getElementById("signup-cpf");
const campoConfirmaSenha = document.getElementById("signup-confirma-senha");
const card = document.getElementById("card-div");
let latitude = "";
let longitude = "";

navigator.geolocation.getCurrentPosition(position => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
});

let newUser = {};
let passoAtual = 0;

/* Mostra só o primeiro bloco e esconde o restante*/
$("#inputs-step-1").show();
$("#inputs-step-2").hide();
$("#inputs-step-3").hide();
$("#inputs-step-4").hide();

function avancar() {
  if(passoAtual === 0) {
    if(!isValidCPF(campoCPF.value)){
      alert( "O CPF informado não é válido!" );
      campoCPF.focus();
      return false;
    }
  }
  if (passoAtual < 3) {
    passoAtual++;

    if (passoAtual === 3) {
      montarObjeto();
    }

    $("li")[passoAtual].classList.add("active");

    /* Passa para o próximo bloco */
    $($(".step-input-div")[passoAtual - 1]).hide();
    $($(".step-input-div")[passoAtual]).show();
  }
};

$(".btn-voltar").click(function () {
  if (passoAtual === 0) window.location.href = "./login.html";
  else {
    $("li")[passoAtual].classList.remove("active");
    passoAtual--;
    /* Passa para o bloco anterior */
    $($(".step-input-div")[passoAtual + 1]).hide();
    $($(".step-input-div")[passoAtual]).show();
  }
});

function toogleLoader() {
  if ($("#loader").is(":visible")) $("#loader").hide();
  else $("#loader").show();
}

function toogleButtons() {
  if ($("#btn-continuar").is(":visible")) {
    $("#btn-continuar").hide();
    $("#btn-voltar").hide();
  } else {
    $("#btn-continuar").show();
    $("#btn-voltar").show();
  }
}

function setDisablePasswordFields(valor) {
  campoSenha.setAttribute("disabled", valor);
  campoConfirmaSenha.setAttribute("disabled", valor);
}

function toogleSelectedDiv(el) {

  if (hasClass(el, "div-unselected")) {
    removeClass(el, "div-unselected");
    addClass(el, "div-selected");
  } else if (hasClass(el, "div-selected")) {
    addClass(el, "div-unselected");
    removeClass(el, "div-selected");
  }

  $("#btn-continuar-step3").prop("disabled", !($($(".div-selected")).length > 0));
}

function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

function montarObjeto() {
  let name = $("#signup-name").val();
  let birth = $("#signup-birth").val();
  let cpf = $("#signup-cpf").val();
  let phones = $(".phone-input")
    .map(function () {
      if (this.value != "") return this.value;
    })
    .get();
  let mail = $("#signup-email").val();
  let address = {
    street: $("#signup-street").val(),
    city: $("#signup-city").val(),
    state: $("#signup-state").val(),
    number: Number.parseInt($("#signup-number").val()),
    latitude,
    longitude
  };
  let interests = $(".div-selected")
    .map(function () {
      return this.innerHTML;
    })
    .get();
  let education_level = $("#signup-escolaridade option:selected").val();
  let resume = $("#signup-resume").val();
  let objective = $("#signup-objective").val();
  let languageLevel = $(".input-new-language-level").map(function () {
    if (this.value != "") return this.value;
  })
    .get();
  let languages = $(".input-new-language").map(function (i) {
    if (this.value != "") return this.value + " " + languageLevel[i] + ".";
  })
    .get();
  let complementary_activities = $(".signup-extra").map(function (i) {
    if (this.value != "") return this.value + ".";
  })
    .get();

  newUser = {
    name,
    birth,
    cpf,
    phones,
    mail,
    address,
    interests,
    education_level,
    resume,
    objective,
    languages,
    complementary_activities,
  };

  $("#confirmation-text").html(`
        <h3>Confirmação</h3>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Nascimento:</b> ${birth}</p>
        <p><b>CPF:</b> ${cpf}</p>
        <br />
        <p><b>E-mail:</b> ${mail}</p>
        <p><b>Celular:</b> ${phones[0]}</p>
        <p><b>Telefone Fixo:</b> ${phones[1] ? phones[1] : 'Nenhum'}</p>
        <p><b>Endereço:</b> ${address.street}, ${address.number} - ${address.city} - ${address.state}</p>
        <br />
        <p><b>Interesses:</b> ${interests.reduce((x, acc) => { return acc + " " + x })}</p>
        <br />
        <p><b>Idiomas:</b> ${languages.length > 0 ? languages.reduce((x, acc) => { return acc + " " + x }) : ""}</p>
        <p><b>Escolaridade:</b> ${education_level}</p>
        
        <p><b>Extras:</b> ${complementary_activities.length > 0 ? complementary_activities.reduce((x, acc) => { return acc + " " + x }) : ""}</p>
        <br />
        <p><b>Objetivo:</b> ${objective}</p>
        <br />
        <p><b>Resumo:</b> ${resume}</p>
        <br /><br />
        `)
}

function validaSenhas() {
  $("#btn-continuar").prop("disabled", !(campoSenha.value === campoConfirmaSenha.value) || (campoSenha.value === '' || campoConfirmaSenha.value === ''));
}

function addLanguageDiv() {
  $("#div-idiomas").append(`
  <div style="display:inline-block">
    <input class="input-new-language" placeholder="Idioma" style="display:inline-block;width: 40%;"/>
    <select class="input-new-language-level" style="display: inline-block; width: 40%;height: 40px;" >
      <option val="1">Básico</option>
      <option val="2">Intermediário</option>
      <option val="3">Avançado</option>
    </select>
    <em class="fa fa-trash-alt" style="display:inline-block; width:10%;    font-size: 20px;color: indianred;padding-left: 12px;" onclick="return removeDivLanguage(this)"></em>
  </div>
  `);
}

function addExtrasDiv() {
  $("#div-extras").append(`
  <div style="display:inline-block">
    <input class="signup-extra" placeholder="Cursos, conquistas, etc..." style="display:inline-block;width: 80%;" />    
    <em class="fa fa-trash-alt" style="display:inline-block; width:10%;    font-size: 20px;color: indianred;padding-left: 12px;" onclick="return removeDivExtras(this)"></em>
  </div>
  `);
}

function removeDivLanguage(el) {
  el.parentElement.remove()
}

function removeDivExtras(el) {
  el.parentElement.remove()
}

function cadastrar() {
  if (passoAtual === 3) {
    setDisablePasswordFields(true);
    toogleLoader();
    toogleButtons();

    signup();
  }
}

function signup() {
  const request = { ...newUser, password: campoConfirmaSenha.value};
  
  $.ajax({
    url: "https://hackaton-ccr.herokuapp.com/api/auth/signup",
    type: 'post',
    data: JSON.stringify(request),
    contentType: "application/json",
    success: function () {
      alert("Parabéns, você foi cadastrado!");
      window.location.href = "./login.html";
    },
    error: function (returnval) {
      toogleLoader();
      toogleButtons();
      setDisablePasswordFields(false);
      alert("Ops... algo deu errado. Tente novamente mais tarde...");
    }
  });
}

function isValidCPF(cpf) {
  if (typeof cpf !== "string") return false
  cpf = cpf.replace(/[\s.-]*/igm, '')
  if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999" 
  ) {
      return false
  }
  var soma = 0
  var resto
  for (var i = 1; i <= 9; i++) 
      soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11))  resto = 0
  if (resto != parseInt(cpf.substring(9, 10)) ) return false
  soma = 0
  for (var i = 1; i <= 10; i++) 
      soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11))  resto = 0
  if (resto != parseInt(cpf.substring(10, 11) ) ) return false
  return true
}