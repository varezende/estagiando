const userAction = async () => {
    const responseStates = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    const states = await responseStates.json();

    var optionsStates = "";

    $.each(states, function (key, val) {
      optionsStates += '<option value="' + val.sigla + '">' + val.sigla + "</option>";
    });
    $("#signup-state").html(optionsStates);

    $("#signup-state")
      .change(async function () {
        const selectedUF = $("#signup-state option").filter(":selected").val();
        const responseCities = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`);
        const cities = await responseCities.json();

        var options_cidades = "";
        $.each(cities, function (key, val) {
          options_cidades += '<option value="' + val.nome + '">' + val.nome + "</option>";
        });

        $("#signup-city").html(options_cidades);
      })
      .change();
  };

  userAction();