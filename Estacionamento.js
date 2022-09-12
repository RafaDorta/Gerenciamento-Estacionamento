function estacionar(){
var placa = document.getElementById('placa').value.toUpperCase();
var marca = document.getElementById('marca').value;
var nome = document.getElementById('nome').value;
var cor = document.getElementById('cor').value;

var time = new Date();


if(!placa && !marca && !nome && !cor){
    alert("Preencha TODOS os Campos!")
    return false;
}

veiculo = {
    
    placaCarro : placa,
    marcaCarro : marca,
    nomeCarro : nome,
    corCarro : cor,
    hora : parseInt(time.getHours()),
    minutos : parseInt(time.getMinutes()),
    horaSaida : null,
    minSaida : null, 
    saldo : 0
}



if(localStorage.getItem('patio2') === null)
{
    var carros = [];
    carros.push(veiculo);
    localStorage.setItem('patio2',JSON.stringify(carros));
}else{
    var carros = JSON.parse(localStorage.getItem('patio2'));
    carros.push(veiculo);
    localStorage.setItem('patio2',JSON.stringify(carros));
}



mostraPatio();

}

function mostraPatio(){
    var carros = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultado = document.getElementById('resultados')

    carrosResultado.innerHTML = '';

    for(var i = 0; i< carros?.length; i++){
        var marca = carros[i].marcaCarro;
        var placa = carros[i].placaCarro;
        var nome = carros[i].nomeCarro;
        var cor = carros[i].corCarro;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        carrosResultado.innerHTML += '<tr><td>' + placa +
                                        '</td><td>'+  nome +
                                        '</td><td>'+  cor +
                                        '</td><td>'+  marca +
                                        '</td><td>'+  hora + ' : ' + minutos +
                                        '</td>' +
                                        '<td><button class="btn btn-danger" onclick="liberar(\''+ placa +'\')">Excluir</button></td>' +
                                        '</tr>';


    }


}

function liberar(placa){
var carros = JSON.parse(localStorage.getItem('patio2'));
for(var i = 0; i<carros.length;i++){
    
if(carros[i].placaCarro == placa){ 
    
    salvarSaida(carros[i]);
    carros.splice(i,1);

   
}

localStorage.setItem('patio2', JSON.stringify(carros));
}



mostraPatio();

}

function salvarSaida(veiculo){
       do{ veiculo.horaSaida = +prompt('Digite a hora:');}while(veiculo.horaSaida<0 || veiculo.horaSaida>23);
        
        do{ veiculo.minSaida = +prompt('Digite os minutos:');}while(veiculo.minSaida<0 || veiculo.minSaida>59);
       



        var horaToMin = (parseInt(veiculo.hora) * 60) + parseInt(veiculo.minutos);
        
    var horaToMinS = (veiculo.horaSaida * 60) + veiculo.minSaida;
    console.log(horaToMin + '   ' + horaToMinS);


    

    if((horaToMinS - horaToMin) < 15){
            veiculo.saldo = 0;
    }else if((horaToMinS - horaToMin) < 240){
        veiculo.saldo = 4;
    }else{
        veiculo.saldo = 20;
    }




    if(localStorage.getItem('carrosLiberados') === null)
{
    var carros = [];
    carros.push(veiculo);
    localStorage.setItem('carrosLiberados',JSON.stringify(carros));
}else{
    var carros = JSON.parse(localStorage.getItem('carrosLiberados'));
    carros.push(veiculo);
    localStorage.setItem('carrosLiberados',JSON.stringify(carros));
}



}

function gerarRelatorio(){
    var carros = JSON.parse(localStorage.getItem('carrosLiberados'));
    var carros2 = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultado = document.getElementById('resultados')

    carrosResultado.innerHTML = '';

    for(var i = 0; i< carros?.length; i++){
        var marca = carros[i].marcaCarro;
        var placa = carros[i].placaCarro;
        var nome = carros[i].nomeCarro;
        var cor = carros[i].corCarro;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;
        var horaSaida = carros[i].horaSaida;
        var minSaida = carros[i].minSaida;

        carrosResultado.innerHTML += '<tr><td>' + placa +
                                        '</td><td>'+  nome +
                                        '</td><td>'+  cor +
                                        '</td><td>'+  marca +
                                        '</td><td>'+  hora + ' : ' + minutos +
                                        '</td>' +
                                        '</td><td>'+  horaSaida + ' : ' + minSaida +
                                        '</td>' +
                                        '</tr>';


    }

    for(var i = 0; i< carros2?.length; i++){
        var marca2 = carros2[i].marcaCarro;
        var placa2 = carros2[i].placaCarro;
        var nome2 = carros2[i].nomeCarro;
        var cor2 = carros2[i].corCarro;
        var hora2 = carros2[i].hora;
        var minutos2 = carros2[i].minutos;

        carrosResultado.innerHTML += '<tr><td>' + placa2 +
                                        '</td><td>'+  nome2 +
                                        '</td><td>'+  cor2 +
                                        '</td><td>'+  marca2 +
                                        '</td><td>'+  hora2 + ' : ' + minutos2 +
                                        '</td>' +
                                        '</td><td>'+  ' Ainda Estacionado! ' +
                                        '</td>' +
                                        '</tr>';


    }
    

}


function getSaldo(){

    var soma = 0;
    var carros = JSON.parse(localStorage.getItem('carrosLiberados'));

    for(var i =0; i<carros.length;i++){
        
           soma += carros[i].saldo;
    }

    alert('Saldo de  ' + soma + ' Reais');
}