const html = document.querySelector('html');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const botonIniciarPausar = document.querySelector('#start-pause');
const inputMusicaEnfoque = document.querySelector('#alternar-musica');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector('#timer');
const estadoA11y = document.querySelector('#a11y-status');

// Recursos de audio para musica de fondo y estados del temporizador.
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');

// Estado base del pomodoro (25:00) y referencia del intervalo activo.
/*let tiempoTranscurridoEnSegundos = 1500;*/
let tiempoTranscurridoEnSegundos = 5; // Para pruebas rapidas, se inicia con 5 segundos. Cambiar a 1500 para uso normal.
let idIntervalo = null;

musica.loop = true;

function anunciar(mensaje) {
    // Publica mensajes de estado para tecnologias asistivas.
    if (!estadoA11y) {
        return;
    }

    estadoA11y.textContent = '';
    requestAnimationFrame(() => {
        estadoA11y.textContent = mensaje;
    });
}

function reproducir(audio) {
    // Reproduce audio y evita errores por bloqueo automatico del navegador.
    const intento = audio.play();
    if (intento && typeof intento.catch === 'function') {
        intento.catch(() => {});
    }
}

inputMusicaEnfoque.addEventListener('change', () => {
    // Alterna musica de fondo desde el switch de interfaz.
    if(musica.paused) {
        reproducir(musica);
        anunciar('Musica activada.');
    } else {
        musica.pause();
        anunciar('Musica pausada.');
    }
});

botonEnfoque.addEventListener('click', () => {
    // Modo enfoque: 25 minutos.
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonCorto.addEventListener('click', () => {
    // Descanso corto: 5 minutos.
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    // Descanso largo: 15 minutos.
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

function cambiarContexto(contexto) {
    // Cambia tema visual y contenido segun el modo seleccionado.
    mostrarTiempo();
    botones.forEach(function (botonContexto){
        botonContexto.classList.remove('active');
        botonContexto.setAttribute('aria-pressed', 'false');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `;
            banner.setAttribute('alt', 'Ilustracion de enfoque para iniciar una sesion de trabajo');
            botonEnfoque.setAttribute('aria-pressed', 'true');
            anunciar('Modo enfoque activado.');
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `;
            banner.setAttribute('alt', 'Ilustracion de pausa corta para recuperar energia');
            botonCorto.setAttribute('aria-pressed', 'true');
            anunciar('Modo descanso corto activado.');
            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie.<strong class="app__title-strong"> Haz una pausa larga.</strong>
            `;
            banner.setAttribute('alt', 'Ilustracion de pausa larga para descanso profundo');
            botonLargo.setAttribute('aria-pressed', 'true');
            anunciar('Modo descanso largo activado.');
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    // Descuenta un segundo y finaliza al llegar a cero.
    if(tiempoTranscurridoEnSegundos <= 0){
        reproducir(audioTiempoFinalizado);
        anunciar('Tiempo finalizado.');
        const enfoqueActivo = html.getAttribute('data-contexto') === 'enfoque';
        if (enfoqueActivo) {
            //
            //Broadcast event
            const evento = new CustomEvent('EnfoqueFinalizado');
            document.dispatchEvent(evento);
        };
        reiniciar();
        return;
    }
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
};

botonIniciarPausar.addEventListener('click', iniciarOpausar);

function iniciarOpausar() {
    // Si el temporizador esta activo, lo pausa; si no, lo inicia.
    if(idIntervalo){
        reproducir(audioPausa);
        reiniciar();
        return;
    }
    reproducir(audioPlay);
    idIntervalo = setInterval(cuentaRegresiva, 1000);
    textoIniciarPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src', `./imagenes/pause.png`);
    botonIniciarPausar.setAttribute('aria-label', 'Pausar temporizador');
    anunciar('Temporizador iniciado.');
}

function reiniciar() {
    // Detiene el intervalo y restaura la interfaz del boton principal.
    clearInterval(idIntervalo); 
    textoIniciarPausar.textContent = "Comenzar";
    iconoIniciarPausar.setAttribute('src', `./imagenes/play_arrow.png`);
    botonIniciarPausar.setAttribute('aria-label', 'Comenzar temporizador');
    idIntervalo = null;
}

function mostrarTiempo() {
    // Convierte segundos a mm:ss y actualiza el contador visible.
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-ES', {minute: '2-digit', second: '2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
    tiempoEnPantalla.setAttribute('aria-label', `Tiempo restante ${tiempoFormateado}`);
}

// Render inicial del tiempo al cargar la pagina.
mostrarTiempo();
