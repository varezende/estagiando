function atualizarListaDeEmpresas() {
	$('#div-scroll-empresa').html('');
	listaEmpresasExibicao.forEach(function(obj){
		renderizarEmpresa(obj);
	});
	
	$('#div-scroll-empresa').css('width', 72 * listaEmpresasExibicao.length - 12);
	$('.div-box-empresa:not(.visited):first').click();
}

function renderizarEmpresa(obj) {
	var html = '';
	
	html += '<div class="div-box-empresa" style="background-image: url(\'./img/' + obj._id + '.jpg\');">';
	if (obj.jobs) {
		html += '	<div class="badge badge-danger">' + obj.jobs.length + '</div>';
	}
	html += '</div>';
	
	$(html).appendTo('#div-scroll-empresa').click(function() {
		$('.div-box-empresa').removeClass('active');
		$(this).addClass('visited active');
		$('#div-nome-empresa > h5').text(obj.name);
		$('#div-view-vaga').html('');
		obj.jobs.forEach(function(objJob){
			renderizarVagas(objJob);
		});
	});
}
	
function renderizarVagas(obj) {
	var html = '';
	
	html += '<div class="card remaining">';
	html += '	<iframe role="image" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.4601123482207!2d-48.26041387611728!3d-18.911017626173937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a445a2066828a1%3A0x6f09b8ddadbaf8a5!2sHotel%20Mercure%20Uberlandia%20Plaza%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1609872879119!5m2!1spt-BR!2sbr" width="100%" height="150" frameborder="0" style="border: solid transparent;" allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe>';
	html += '	<div class="card-body">';
	html += '		<h4 class="card-title">' + obj.name + '</h4>';
	html += '		<p class="card-text">' + obj.resume + '</p>';	
	html += '		<h5 class="card-text">Salário: ' + obj.salary + '</h5>';
	html += '		<table cellpadding="0" cellspacing="0" width="100%" style="margin-top: 36px;">';
	html += '			<tr>';
	html += '				<td width="45%">';
	html += '					<button class="btn btn-primary" style="width: 100%;" onclick="descartarVaga(this);">';
	html += '						<i class="far fa-bell-slash"></i> Descartar';
	html += '					</button>';
	html += '				</td>';
	html += '				<td width="10%"></td>';
	html += '				<td width="45%">';
	html += '					<button class="btn btn-success" style="width: 100%;" onclick="aplicarVaga(this);">';
	html += '						<i class="fas fa-hands-helping"></i> Candidatar';
	html += '					</button>';
	html += '				</td>';
	html += '			</tr>';
	html += '		</table>';
	html += '	</div>';
	html += '</div>';
	
	$(html).appendTo('#div-view-vaga').draggable({ axis: 'x',  scroll: true }).on('dragstop', function(a,b ) {
		if (b && b.position) {
			console.log(b.position.left);
			if (b.position.left > 70) {
				aplicarVaga($(this).find('button:eq(0)')[0]);
			} else if (b.position.left < -70) {
				descartarVaga($(this).find('button:eq(0)')[0]);
			} else {
				//$(this).css('transition', 'left .6s ease');
				$(this).css('left', 0);
			}
		}
	});
	$('#div-view-vaga').css('height', 'calc(100% - ' + ($('#div-view-empresa').outerHeight()) + 'px)');
}

function filtrarEmpresas() {
	var busca = $('#input-buscar').val().toLowerCase();
	
	if (!busca.trim()) {
		listaEmpresasExibicao = listaEmpresasGeral;
	} else {				
		listaEmpresasExibicao = [];
		listaEmpresasGeral.forEach(function(obj){
			if (obj.name.toLowerCase().indexOf(busca) > 0) {
				listaEmpresasExibicao.push(obj);
			} else {
				obj.jobs.forEach(function(objJob){
					if (objJob.name.toLowerCase().indexOf(busca) > 0) {
						listaEmpresasExibicao.push(obj);
					}
				});
			}
		});
	}

	atualizarListaDeEmpresas();
	$('form *:input').blur();
}

function descartarVaga(objHTML) {
	var card = $(objHTML).parent().parent().parent().parent().parent().parent();
	$(card).removeClass('remaining');
	$(card).hide('slide', { direction: 'left' }, 500, function() { exibirLoading(); });
	$(card).css('top', 'inherit');
}

function aplicarVaga(objHTML) {
	var card = $(objHTML).parent().parent().parent().parent().parent().parent();
	$(card).removeClass('remaining');
	$(card).hide('slide', { direction: 'right' }, 500, function() { exibirLoading(); });
	$(card).css('top', 'inherit');
}

function exibirLoading() {
	var $badge = $('.div-box-empresa.active > .badge');
	var cont = $badge.text().trim();
	if (cont == '' || Number(cont) - 1 == 0) {
		$badge.fadeOut();
	} else {
		$badge.text(Number(cont) - 1);
	}
	
	if ($('#div-view-vaga > .card:visible').length == 0) {
		$('#div-view-progress > div > div').css('width', '0%');
		$('#div-view-progress').addClass('visible');
		setTimeout(function() {
			$('#div-view-progress > div > div').css('width', '100%');
			setTimeout(function() {
				if ($('.div-box-empresa:not(.visited)').length > 0) {					
					$('.div-box-empresa:not(.visited):first').click();
				} else {
					exibirFinal();
				}
				$('#div-view-progress').removeClass('visible');
			}, 1500);
		}, 500);
	}
}

function exibirFinal() {
	$('#div-view-vaga').html('<p style="margin-top: 50%; text-align: center;">Você visualizou todas as vagas que temos até o momento. Mas não se preocupe, te notificaremos quando surgirem novas! =)</p>')
}

var listaEmpresasGeral = [];
var listaEmpresasExibicao = [];
$('document').ready(function() {
	/* Definir alturas nos elementos na tela para não causar Scroll onde não deve. */
	$('.conteudo').css('height', 'calc(100% - ' + ($('.cabecalho').outerHeight() + $('.rodape').outerHeight()) + 'px)');
	
	/* Buscar Infos do Back (Mock). */				
	$.ajax({
		url: '../companies.json',
		type: 'post',
		contentType: 'application/json; charset=utf-8',
		dataType: 'text json',
		cache: false,
		success(r) {
			listaEmpresasGeral = r;
			listaEmpresasExibicao = r;
			atualizarListaDeEmpresas();
		},
		error(r) {
			console.log('Erro: ', r);
		},
		complete() {
		}
	});
});