
setInterval(()=>{
document.getElementById("reloj").textContent=
new Date().toLocaleTimeString();
},1000);



window.onload=()=>{
cargarTareas();
cargarNotas();
crearCalculadora();
nuevaFrase();
generarClima();
};


/* ================= TAREAS ================= */

function actualizarContador(){
document.getElementById("contador").textContent=
document.querySelectorAll("#listaTareas li").length;
}

function addTask(){
let txt=document.getElementById("tareaInput").value;
if(!txt)return;

let tareas=JSON.parse(localStorage.getItem("tareas"))||[];
tareas.push(txt);
localStorage.setItem("tareas",JSON.stringify(tareas));

crearTarea(txt);
document.getElementById("tareaInput").value="";
}

function crearTarea(txt){
let li=document.createElement("li");
li.innerHTML=`${txt} <button>✔</button>`;

li.querySelector("button").onclick=()=>{
li.remove();
borrarTarea(txt);
actualizarContador();
};

document.getElementById("listaTareas").appendChild(li);
actualizarContador();
}

function cargarTareas(){
let tareas=JSON.parse(localStorage.getItem("tareas"))||[];
tareas.forEach(t=>crearTarea(t));
}

function borrarTarea(txt){
let tareas=JSON.parse(localStorage.getItem("tareas"));
tareas=tareas.filter(t=>t!==txt);
localStorage.setItem("tareas",JSON.stringify(tareas));
}


/* ================= NOTAS ================= */

function guardarNota(){
let texto=document.getElementById("nota").value;
if(!texto)return;

let notas=JSON.parse(localStorage.getItem("notas"))||[];
notas.push(texto);
localStorage.setItem("notas",JSON.stringify(notas));

crearNota(texto);
document.getElementById("nota").value="";
}

function crearNota(texto){
let li=document.createElement("li");
li.innerHTML=`${texto} <button>❌</button>`;

li.querySelector("button").onclick=()=>{
li.remove();
borrarNota(texto);
};

document.getElementById("listaNotas").appendChild(li);
}

function cargarNotas(){
let notas=JSON.parse(localStorage.getItem("notas"))||[];
notas.forEach(n=>crearNota(n));
}

function borrarNota(txt){
let notas=JSON.parse(localStorage.getItem("notas"));
notas=notas.filter(n=>n!==txt);
localStorage.setItem("notas",JSON.stringify(notas));
}


/* ================= CALCULADORA ================= */

function crearCalculadora(){
let botones="789/456*123-0.=+";
let cont=document.querySelector(".calcBtns");

botones.split("").forEach(b=>{
let btn=document.createElement("button");
btn.textContent=b;
btn.onclick=()=>calc(b);
cont.appendChild(btn);
});
}

function calc(v){
let display=document.getElementById("calc");

if(v=="="){
try{ display.value=eval(display.value); }
catch{ display.value="Error"; }
}else{
display.value+=v;
}
}


/* ================= TEMPORIZADOR ================= */

let tiempo=0;
let intervalo;

function iniciar(){
intervalo=setInterval(()=>{
tiempo++;
let m=Math.floor(tiempo/60).toString().padStart(2,"0");
let s=(tiempo%60).toString().padStart(2,"0");
document.getElementById("timer").textContent=`${m}:${s}`;
},1000);
}

function detener(){ clearInterval(intervalo); }

function reset(){
clearInterval(intervalo);
tiempo=0;
document.getElementById("timer").textContent="00:00";
}


/* ================= FRASES ================= */

const frases=[
"Confía en ti",
"Hoy será un gran día",
"El éxito es constancia",
"Nunca te rindas",
"Tú puedes lograrlo",
"Cada día mejoras"
];

function nuevaFrase(){
let f=frases[Math.floor(Math.random()*frases.length)];
document.getElementById("frase").textContent=f;
}


/* ================= CLIMA ================= */

function generarClima(){
let temp=Math.floor(Math.random()*15)+15;
let estados=["Soleado ☀","Lluvioso 🌧","Nublado ☁","Tormenta ⛈"];
let estado=estados[Math.floor(Math.random()*estados.length)];

document.getElementById("clima").textContent=
temp+"°C - "+estado;
}


/* ================= TEMA ================= */

const temas = [
"#111",
"#1e3a8a",
"#065f46",
"#7c2d12",
"#4c1d95",
"#be185d"
];

let indiceTema = localStorage.getItem("tema") || 0;

document.querySelector(".bg").style.background = temas[indiceTema];

function cambiarTema(){
indiceTema++;

if(indiceTema >= temas.length) indiceTema = 0;

document.querySelector(".bg").style.background = temas[indiceTema];
localStorage.setItem("tema", indiceTema);
}


