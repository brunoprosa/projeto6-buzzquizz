axios.defaults.headers.common['Authorization'] = 'QvrjsZKGJ1H8evjKA56QR65s';

let informacaoBasic = {};
let questions = [];
let answers = [];
let screen32 = document.querySelector('.container-criar-pergunta');
let screen33 = document.querySelector('.container-criar-niveiss');
let screen34 = document.querySelector('#screen34');

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
  
/*----------------------------------------------screen 3 ------------------------------------------------------*/

function informacaoBasica(){
  const titulo = document.querySelector('#titulo').value;
  const url = document.querySelector('#url').value;
  const qntdperguntas = Number(document.querySelector('#qntdPerguntas').value);
  const qntdniveis = Number(document.querySelector('#qntdNiveis').value);
  informacaoBasic = {
    title: titulo,
    url: url,
    quantPerguntas: qntdperguntas,
    quantNiveis: qntdniveis
  };
  
  screen32.innerHTML = ''
  for(i = 1; i <= qntdperguntas; i++){
    screen32.innerHTML += `
    <div class="previa-pergunta${i} container-input">
      <h1>Pergunta ${i}</h1>
      <ion-icon class="expandir" name="create-outline" onclick="expandir('pergunta${i}')"></ion-icon>
    </div>
    <div class="criar-pergunta${i} container-input escondido">
      <h1>Pergunta ${i}</h1>
      <input type="text" id="textPergunta${i}" placeholder="Texto da pergunta">
      <input type="text" id="colorPergunta${i}" placeholder="Cor de fundo da pergunta">
      <h1>Resposta correta</h1>
      <input type="text" id="respostaCerta${i}" placeholder="Resposta correta">
      <input type="text" id="imgCerta${i}" placeholder="URL da imagem">
      <h1>Respostas incorretas</h1>
      <input type="text" id="respostaErrada${i}1" placeholder="Resposta incorreta 1">
      <input type="text" class="margin32" id="imgErrada${i}1" placeholder="URL da imagem 1">

      <input type="text" id="respostaErrada${i}2" placeholder="Resposta incorreta 2">
      <input type="text" class="margin32" id="imgErrada${i}2" placeholder="URL da imagem 2">

      <input type="text" id="respostaErrada${i}3" placeholder="Resposta incorreta 3">
      <input type="text" id="imgErrada${i}3" placeholder="URL da imagem 3">
    </div>
    `;
  }
  showScreen32();
}

function criarPerguntas(){


  screen33.innerHTML = '';
  for(i = 1; i <= informacaoBasic.qntdniveis; i++){
    screen33.innerHTML += `
    <div class="previa-nivel${i} container-input">
      <h1>Nível ${i}</h1>
      <ion-icon class="expandir" name="create-outline" onclick="expandir('nivel${i}')"></ion-icon>
    </div>
    <div class="criar-nivel${i} container-input escondido">
      <h1>Nível ${i}</h1>
      <input type="text" id="tituloDoNivel${i}" placeholder="Título do nível">
      <input type="text" id="notaMinima${i}" placeholder="% de acerto mínima">
      <input type="text" id="imgNivel${i}" placeholder="URL da imagem do nível">
      <input type="text" id="textNivel${i}" placeholder="Descrição do nível">
    </div>
    `;
  }
  showScreen33();
}

/*----------------------------------------------screen 3 ------------------------------------------------------*/

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