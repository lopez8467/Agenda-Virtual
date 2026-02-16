/* ================= RELOJ ================= */
setInterval(() => {
    document.getElementById("reloj").textContent = new Date().toLocaleTimeString();
}, 1000);

window.onload = () => {
    cargarTareas();
    cargarNotas();
    crearCalculadora();
    nuevaFrase();
    generarClima();
    cargarTemaGuardado(); // Recuperar el color del tema
};

/* Ayuda para presionar ENTER en inputs */
function handleEnter(e, func) {
    if (e.key === "Enter") func();
}

/* ================= TAREAS ================= */
function actualizarContador() {
    document.getElementById("contador").textContent =
        document.querySelectorAll("#listaTareas li").length;
}

function addTask() {
    let input = document.getElementById("tareaInput");
    let txt = input.value.trim(); // Trim quita espacios vacíos
    if (!txt) return;

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push(txt);
    localStorage.setItem("tareas", JSON.stringify(tareas));

    crearTarea(txt);
    input.value = "";
    input.focus();
}

function crearTarea(txt) {
    let li = document.createElement("li");
    li.innerHTML = `<span>${txt}</span> <button style="background:#ff4d4d; color:white; padding:5px 10px; margin:0;">🗑</button>`;

    li.querySelector("button").onclick = () => {
        li.remove();
        borrarTarea(txt);
        actualizarContador();
    };

    document.getElementById("listaTareas").appendChild(li);
    actualizarContador();
}

function cargarTareas() {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach(t => crearTarea(t));
}

function borrarTarea(txt) {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    // Filtramos solo la primera coincidencia para evitar borrar duplicados si los hubiera
    let index = tareas.indexOf(txt);
    if (index > -1) {
        tareas.splice(index, 1);
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

/* ================= NOTAS ================= */
function guardarNota() {
    let input = document.getElementById("nota");
    let texto = input.value.trim();
    if (!texto) return;

    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    notas.push(texto);
    localStorage.setItem("notas", JSON.stringify(notas));

    crearNota(texto);
    input.value = "";
}

function crearNota(texto) {
    let li = document.createElement("li");
    // Cortamos el texto si es muy largo para la vista previa
    let preview = texto.length > 30 ? texto.substring(0, 30) + "..." : texto;
    li.innerHTML = `<span title="${texto}">${preview}</span> <button style="background:#ff4d4d; color:white; padding:5px 10px; margin:0;">❌</button>`;

    li.querySelector("button").onclick = () => {
        li.remove();
        borrarNota(texto);
    };

    document.getElementById("listaNotas").appendChild(li);
}

function cargarNotas() {
    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    notas.forEach(n => crearNota(n));
}

function borrarNota(txt) {
    let notas = JSON.parse(localStorage.getItem("notas"));
    let index = notas.indexOf(txt);
    if (index > -1) notas.splice(index, 1);
    localStorage.setItem("notas", JSON.stringify(notas));
}

/* ================= CALCULADORA ================= */
function crearCalculadora() {
    // Agregué 'C' para limpiar
    let botones = ["7","8","9","/", "4","5","6","*", "1","2","3","-", "C","0",".","+","="]; 
    let cont = document.querySelector(".calcBtns");
    cont.innerHTML = ""; // Limpiar por si acaso

    botones.forEach(b => {
        let btn = document.createElement("button");
        btn.textContent = b;
        
        if(b === "=") {
            btn.style.gridColumn = "span 2"; // El igual ocupa 2 espacios
            btn.style.background = "#00ffd5";
        }
        
        btn.onclick = () => calc(b);
        cont.appendChild(btn);
    });
}

function calc(v) {
    let display = document.getElementById("calc");

    if (v === "=") {
        try {
            // Evaluamos y limitamos decimales si es necesario
            display.value = eval(display.value); 
        } catch {
            display.value = "Error";
            setTimeout(() => display.value = "", 1500);
        }
    } else if (v === "C") {
        display.value = "";
    } else {
        display.value += v;
    }
}

/* ================= TEMPORIZADOR ================= */
let tiempo = 0;
let intervalo = null; // Inicializamos como null para control

function iniciar() {
    if (intervalo) return; // FIX: Si ya existe intervalo, no hace nada

    intervalo = setInterval(() => {
        tiempo++;
        let m = Math.floor(tiempo / 60).toString().padStart(2, "0");
        let s = (tiempo % 60).toString().padStart(2, "0");
        document.getElementById("timer").textContent = `${m}:${s}`;
    }, 1000);
}

function detener() {
    clearInterval(intervalo);
    intervalo = null; // FIX: Liberamos la variable
}

function reset() {
    detener();
    tiempo = 0;
    document.getElementById("timer").textContent = "00:00";
}

/* ================= FRASES ================= */
const frases = [
    "🚀 Confía en ti",
    "🌞 Hoy será un gran día",
    "💼 El éxito es la suma de pequeños esfuerzos",
    "🧠 Nunca te rindas",
    "💻 Tú puedes lograrlo",
    "📚 Cada error es una lección"
];

function nuevaFrase() {
    let f = frases[Math.floor(Math.random() * frases.length)];
    document.getElementById("frase").textContent = f;
}

/* ================= CLIMA ================= */
function generarClima() {
    let temp = Math.floor(Math.random() * 15) + 15;
    let estados = ["Soleado ☀", "Lluvioso 🌧", "Nublado ☁", "Tormenta ⛈", "Ventoso 💨"];
    let estado = estados[Math.floor(Math.random() * estados.length)];

    document.getElementById("clima").textContent = `${temp}°C - ${estado}`;
}

/* ================= TEMA (Usando Variables CSS) ================= */
const temas = [
    "#ff00cc", // Default
    "#1e3a8a", // Azul oscuro
    "#065f46", // Verde bosque
    "#7c2d12", // Marrón
    "#4c1d95", // Violeta
    "#be185d", // Rosa fuerte
    "#000000"  // Modo Oscuro total
];

let indiceTema = localStorage.getItem("temaIndex") || 0;

function cargarTemaGuardado(){
    // Aplicamos el tema guardado al cargar
    document.documentElement.style.setProperty('--primary-color', temas[indiceTema]);
}

function cambiarTema() {
    indiceTema++;
    if (indiceTema >= temas.length) indiceTema = 0;

    // Actualizamos la variable CSS en lugar de sobrescribir el background completo
    document.documentElement.style.setProperty('--primary-color', temas[indiceTema]);
    
    localStorage.setItem("temaIndex", indiceTema);
}