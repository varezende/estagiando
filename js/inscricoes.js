function renderizarVagas(obj) {
	var html = '';
	
	html += '<div class="card remaining">';
	html += '	<iframe role="image" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.4601123482207!2d-48.26041387611728!3d-18.911017626173937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a445a2066828a1%3A0x6f09b8ddadbaf8a5!2sHotel%20Mercure%20Uberlandia%20Plaza%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1609872879119!5m2!1spt-BR!2sbr" width="100%" height="150" frameborder="0" style="border: solid transparent;" allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe>';
	html += '	<div class="card-body">';
	html += '		<h4 class="card-title">' + obj.name + '</h4>';
	html += '		<p class="card-text">' + obj.resume + '</p>';	
	html += '		<h5 class="card-text">Salário: ' + obj.salary + '</h5>';
	html += '	</div>';
	html += '</div>';
	
	$(html).appendTo('#div-view-vaga')
}

function exibirFinal() {
	$('#div-view-vaga').html('<p style="margin-top: 50%; text-align: center;">Você visualizou todas as vagas que temos até o momento. Mas não se preocupe, te notificaremos quando surgirem novas! =)</p>')
}

var listaEmpresasGeral = [];
var listaEmpresasExibicao = [];
$('document').ready(function() {
	validarAcesso();	
	
	/* Definir alturas nos elementos na tela para não causar Scroll onde não deve. */
	$('.conteudo').css('height', 'calc(100% - ' + ($('.cabecalho').outerHeight() + $('.rodape').outerHeight()) + 'px)');
	
	var aplicacoes = getCookie('aplicacoes');
	console.log('1: ', aplicacoes);
	if (!aplicacoes) {
		$('#div-view-msg').addClass('visible');
	} else {
		aplicacoes = JSON.parse(aplicacoes);
		$('#div-view-vaga').addClass('visible');
		aplicacoes.forEach(obj => {
			renderizarVagas(obj);
		});
	}
});