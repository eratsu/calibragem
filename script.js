// Adicione esta função para carregar os fabricantes dinamicamente
function carregarFabricantes() {
    var fabricanteSelect = document.getElementById('fabricanteSelect');

    // Limpar a lista de fabricantes
    fabricanteSelect.innerHTML = '<option value="">Selecione...</option>';

    // Carregar o arquivo JSON
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            // Preencher a lista de fabricantes com base no JSON
            var fabricantes = [...new Set(data.map(item => item.fabricante))];
            fabricantes.forEach(fabricante => {
                var option = document.createElement('option');
                option.value = fabricante;
                option.text = fabricante;
                fabricanteSelect.add(option);
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}

function carregarModelos() {
    var fabricanteSelect = document.getElementById('fabricanteSelect');
    var modeloSelect = document.getElementById('modeloSelect');

    // Limpar a lista de modelos
    modeloSelect.innerHTML = '<option value="">Selecione...</option>';

    // Limpar a lista de anos
    var anoSelect = document.getElementById('anoSelect');
    anoSelect.innerHTML = '<option value="">Selecione...</option>';

    // Verificar se um fabricante foi selecionado
    if (fabricanteSelect.value !== '') {
        // Carregar o arquivo JSON correspondente ao fabricante selecionado
        var fabricante = fabricanteSelect.value;
        fetch('dados.json')
            .then(response => response.json())
            .then(data => {
                // Filtrar modelos com base no fabricante selecionado
                var modelos = [...new Set(data.filter(item => item.fabricante === fabricante).map(item => item.modelo))];
                modelos.forEach(modelo => {
                    var option = document.createElement('option');
                    option.value = modelo;
                    option.text = modelo;
                    modeloSelect.add(option);
                });
            })
            .catch(error => console.error('Erro ao carregar o JSON:', error));
    }
}

function carregarAnos() {
    var fabricanteSelect = document.getElementById('fabricanteSelect');
    var modeloSelect = document.getElementById('modeloSelect');
    var anoSelect = document.getElementById('anoSelect');

    // Limpar a lista de anos
    anoSelect.innerHTML = '<option value="">Selecione...</option>';

    // Verificar se um fabricante e modelo foram selecionados
    if (fabricanteSelect.value !== '' && modeloSelect.value !== '') {
        // Carregar o arquivo JSON correspondente ao fabricante e modelo selecionados
        var fabricante = fabricanteSelect.value;
        var modelo = modeloSelect.value;
        fetch('dados.json')
            .then(response => response.json())
            .then(data => {
                // Filtrar anos com base no fabricante e modelo selecionados
                var anos = [...new Set(data.filter(item => item.fabricante === fabricante && item.modelo === modelo).map(item => item.ano))];
                anos.forEach(ano => {
                    var option = document.createElement('option');
                    option.value = ano;
                    option.text = ano;
                    anoSelect.add(option);
                });
            })
            .catch(error => console.error('Erro ao carregar o JSON:', error));
    }
}


function consultarCalibragem() {
    var fabricanteSelect = document.getElementById('fabricanteSelect');
    var modeloSelect = document.getElementById('modeloSelect');
    var anoSelect = document.getElementById('anoSelect');

    // Obter os valores selecionados pelo usuário
    var fabricante = fabricanteSelect.value;
    var modelo = modeloSelect.value;
    var ano = anoSelect.value;

    // Verificar se todos os campos foram selecionados
    if (fabricante.trim() === '' || modelo.trim() === '' || ano.trim() === '') {
        alert('Por favor, selecione fabricante, modelo e ano.');
        return;
    }

    // Carregar o arquivo JSON
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            // Procurar no JSON pelo fabricante, modelo e ano especificados
            var infoPneus = buscarInfoPneus(data, fabricante, modelo, ano);

            // Exibir o resultado na página
            exibirResultado(infoPneus);
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}

// Função para buscar informações de pneus no JSON
function buscarInfoPneus(data, fabricante, modelo, ano) {
    // Procurar no JSON pelo fabricante, modelo e ano especificados
    for (var i = 0; i < data.length; i++) {
        if (data[i].fabricante === fabricante && data[i].modelo === modelo && data[i].ano == ano) {
            return data[i];
        }
    }

    return null; // Retornar null se não encontrar correspondência
}

// Função para exibir o resultado na página
function exibirResultado(infoPneus) {
    var resultadoDiv = document.getElementById('resultado');

    if (infoPneus !== null) {
        resultadoDiv.innerHTML =
            '<p>Medidas Dianteiro: ' +
            infoPneus.pneu_dianteiro.medida +
            ', Calibragem: ' +
            infoPneus.pneu_dianteiro.calibragem +
            ' PSI</p>' +
            '<p>Medidas Traseiro: ' +
            infoPneus.pneu_traseiro.medida +
            ', Calibragem: ' +
            infoPneus.pneu_traseiro.calibragem +
            ' PSI</p>' +
            '<p><b>Medidas orignais do pneu</b></p>';
    } else {
        resultadoDiv.innerHTML = '<p>Informações não encontradas para o fabricante, modelo e ano especificados.</p>';
    }
}


// Chamar a função para carregar os fabricantes quando a página carregar
carregarFabricantes();

// Restante do código permanece o mesmo...