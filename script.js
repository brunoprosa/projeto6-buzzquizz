axios.defaults.headers.common['Authorization'] = 'QvrjsZKGJ1H8evjKA56QR65s';


function showScreen1() {
    document.querySelector('#screen1').classList.remove('escondido');
    document.querySelector('#screen2').classList.add('escondido');
    document.querySelector('#screen3').classList.add('escondido');
    document.querySelector('#screen34').classList.add('escondido');
  }
/*---------------------------------------------- screen 2 ----------------------------------------------------*/  
function showScreen2() {
    document.querySelector('#screen1').classList.add('escondido');
    document.querySelector('#screen2').classList.remove('escondido');
    document.querySelector('#screen3').classList.add('escondido');
  }

let contarSelecionado = 0;

function scroll () {
  window.scrollBy(0, 718);
}

  function verificar () {
    let divQuiz = document.querySelector('.quest-quizz');
    let naoSelecionado = divQuiz.querySelectorAll('.opcao');

    for (let i = 0; i < naoSelecionado.length; i ++) {
      if (naoSelecionado[i].classList.contains('selecionada') === false) {
      naoSelecionado[i].classList.add('opacidade');
    }
    if (naoSelecionado[i].id === 'certa') {
      naoSelecionado[i].classList.add('certa');
    } else {
      naoSelecionado[i].classList.add('errada');
    }
  } 
  setTimeout (scroll, 2000)
}

  function marcarResposta (seletor) {
    
    if (seletor.classList.contains('selecionada') !== true && contarSelecionado === 0){
      if (seletor.id === 'certa') {
        seletor.classList.add('certa');
        seletor.classList.add('selecionada');
        contarSelecionado++;
      } else {
        seletor.classList.add('errada');
        seletor.classList.add('selecionada');
        contarSelecionado++;
      }
    }
    verificar ();
  }
  


//Exibir quiz escolhido pelo usuário
let quizzEscolhido = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/55');
quizzEscolhido.then(deuCerto);
quizzEscolhido.catch(deuRuim);


function deuCerto (certo) {
  let banner = document.querySelector('.banner');
  banner.innerHTML = '';
  banner.innerHTML += `<img src="${certo.data.image}"/>
  <p>${certo.data.title}</p>`

  let quiz = document.querySelector('.quiz');
  let qtdeOpcao = certo.data.questions;
  quiz.innerHTML = '';
  for (let i = 0; i < qtdeOpcao.length; i++ ) {
  quiz.innerHTML += `
    <div class="quest-quizz">
    <div class="quest"><p>${certo.data.questions[i].title}</p></div>
    <div class="opcao" onclick="marcarResposta (this)"></div>
    </div>`
    let respostas = qtdeOpcao[i].answers;
    let opcao = document.querySelector('.opcao');
    console.log(opcao);
    opcao.innerHTML = '';
    for (let c = 0; c < respostas.length; c++) {
      opcao.innerHTML += `
      <img src="${respostas[c].image}"/>
      <p>${respostas[c].text}</p>`
      
    }
    
  }
  
}


/*function renderizarOpcao (qtdeOpcao) {
  let respostas = qtdeOpcao;
  let opcao = document.querySelector('.opcao');
  opcao.innerHTML = '';
  for (let c = 0; c < respostas.length; c++) {
    opcao.innerHTML += `
    <img src="${respostas[c].image}"/>
    <p>${respostas[c].text}</p>`
    
  }
}
function mostrarImg (opcao) {
  let alternativa = document.querySelector('.opcao');
  alternativa.innerHTML = '';
  console.log(opcao);
}*/


function deuRuim (ruim) {
  console.log(ruim);
}


/*----------------------------------------------screen 2 ------------------------------------------------------*/
  function showScreen3() {
    document.querySelector('#screen1').classList.add('escondido');
    document.querySelector('#screen2').classList.add('escondido');
    document.querySelector('#screen3').classList.remove('escondido');
    document.querySelector('#screen31').classList.remove('escondido');
  }

  function showScreen32(){
    document.querySelector('#screen31').classList.add('escondido');
    document.querySelector('#screen32').classList.remove('escondido');
  }

  function showScreen33(){
    document.querySelector('#screen32').classList.add('escondido');
    document.querySelector('#screen33').classList.remove('escondido');
  }

  function showScreen34(){
    document.querySelector('#screen33').classList.add('escondido');
    document.querySelector('#screen34').classList.remove('escondido');
  }
  function expandir(indice){
    document.querySelector(`.previa-${indice}`).classList.add('escondido');
    document.querySelector(`.criar-${indice}`).classList.remove('escondido');
  }