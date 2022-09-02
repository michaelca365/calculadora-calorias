const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();

    calcularCalorias();
})

function calcularCalorias() {
    aparecerResultado();
    
    const edad = document.querySelector('#edad');
    const peso = document.querySelector('#peso');
    const altura = document.querySelector('#altura');
    const genero = document.querySelector('input[name="genero"]:checked');
    const actividad = document.querySelector('#actividad');
    const nombre = document.querySelector("#nombreCompleto");
    const tipoDocumento = document.querySelector("#tipoDocumento");
    const numeroDocumento = document.querySelector("#numeroDocumento");
    // const totalCalorias = document.querySelector('#total-calorias');
    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    if ( !(edad.value && peso.value && altura.value) ) {
        mostrarMensajeDeError('Por favor asegúrese de llenar todos los campos');
        return;
    }else if( !nombre.value || !tipoDocumento.value || !numeroDocumento.value ){
        mostrarMensajeDeError('Por favor asegúrese de llenar los campos personales');
        return;
    } else if (edad.value < 15 || edad.value > 80) {
        mostrarMensajeDeError('La edad ingresada no es permitida');
        return;
    }
    
    let calculoCalorias;
    if (genero.id === 'hombre') {
        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                                             (multiplicadorTMB.altura * altura.value) -
                                             (multiplicadorTMB.edad * edad.value)) + 5;
    } else {
        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                                             (multiplicadorTMB.altura * altura.value) -
                                             (multiplicadorTMB.edad * edad.value)) -161
    }
    let grupoPoblacional = "";
    if(edad.value >= 15 && edad.value <= 29){
        grupoPoblacional = "Joven";
    }
    if(edad.value >= 30 && edad.value <= 59){
        grupoPoblacional = "Adultos";
    }
    if(edad.value >= 60 ){
        grupoPoblacional = "Adultos mayores";
    }
    // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;
    const textoMostrar = `
    Grupo poblacional ${grupoPoblacional}. \n

    El paciente ${nombre.value} identificado con ${tipoDocumento.value} NO. ${numeroDocumento.value}, 
    requiere un total de ${Math.round(calculoCalorias)} kcal para el sostenimiento de su TBM`
    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${Math.round(calculoCalorias)} kcal" style="font-size: 2rem" disabled>
            </div>
        </div>
    `
    
    peso.value = null;
    nombre.value = null;
    numeroDocumento.value = null;
    numeroDocumento.value = null;
    altura.value = null;
    edad.value = null;
    actividad.value = null;
    const modalContainer = document.querySelector(".modal-body");
    modalContainer.append(textoMostrar);
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {focus: true});
    myModal.show();
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}