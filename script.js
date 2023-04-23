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
/*---------------------------------------------- screen 1 ----------------------------------------------------*/
function getQuizzes(){
      const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
      promise.then( getOK );
      promise.catch( getErro );
  }
  
  function getOK(resp){
      console.log(resp.status);
      console.log(resp.statusText);
      console.log(resp.data);
      quiz = resp.data;

      renderQuizzes()
  }
  
  function getErro(resp){
      console.log(resp.response.status);
  }

  getQuizzes();

function renderQuizzes(){

  const ulQuizz = document.querySelector('.others-quiz');
   ulQuizz.innerHTML = '';

  for(let i = 0; i < quiz.length; i++){
    ulQuizz.innerHTML += `
      <li data-test="others-quiz" class ="quizz quizz${i+1}" style="
        background:linear-gradient(180deg,rgba(255,255,255,0)0%,rgba(0,0,0,0.5)64.58%, #000000 100%), url(${quiz[i].image});
        background-size:cover;"
        onclick="showScreen2()">
        <h1 class="quizz-title" >${quiz[i].title}</h1>
      </li>        
    `; 
  }
}

/*---------------------------------------------- screen 1 ----------------------------------------------------*/  
/*---------------------------------------------- screen 2 ----------------------------------------------------*/  
function showScreen2() {
    document.querySelector('#screen1').classList.add('escondido');
    document.querySelector('#screen2').classList.remove('escondido');
    document.querySelector('#screen3').classList.add('escondido');
  }

let contarSelecionado = 0;
let contarQuest = 0;

let contar = 0;

let acertos = 0;
let qtdeRespostas = 0;

let total = 0;
let qtdeNivel = [];

let naoSelecionado = [];


function resultado (resul) {
  
  console.log(total);
  console.log(resul); 
  let qtdeAcerto = (acertos / qtdeRespostas)*100;
  let valorArredondado = Math.round(qtdeAcerto);
  console.log(valorArredondado);
  
}

function scroll () {
  let proxDiv = document.getElementsByClassName("quest-quizz")[contar];
  proxDiv.scrollIntoView({behavior: 'smooth'});
  //console.log(quizzEscolhido.data.questions.length);
  
  //resultado(quizzEscolhido);
  /*console.log(contar);
  console.log(acertos);
  console.log(qtdeRespostas);*/
}

  function verificar (seletor) {
    let naoSelecionado = seletor.querySelectorAll('.opcao');

    for (let i = 0; i < naoSelecionado.length; i ++) {
      if (naoSelecionado[i].classList.contains('selecionada') === false) {
      naoSelecionado[i].classList.add('opacidade');
    }
    if (naoSelecionado[i].classList.contains('true') === true) {
      naoSelecionado[i].classList.add('certa');
    } else {
      naoSelecionado[i].classList.add('errada');
    }
  } 
  contar++;
  contarSelecionado = 0;
  setTimeout (scroll, 2000)
}

  function marcarResposta (seletor) {
      
    if (seletor.classList.contains('.selecionada') !== true && contarSelecionado === 0){
      if (seletor.classList.contains('true') === true) {
        seletor.classList.add('selecionada');
        acertos++;
        qtdeRespostas++;
        contarSelecionado++;
      } else {
        seletor.classList.add('selecionada');
        qtdeRespostas++;
        contarSelecionado++;
      }
    }
    verificar (seletor.parentNode);
  }
  

//Exibir quiz escolhido pelo usuário
let quizzEscolhido = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/55');
console.log(quizzEscolhido);
quizzEscolhido.then(renderizarQuiz);
quizzEscolhido.catch(erroRenderizarQuiz);

let aleatorio = [];
function renderizarQuiz (quiz) {
  let banner = document.querySelector('.banner');
  banner.innerHTML = '';
  banner.innerHTML += `<img src="${quiz.data.image}"/>
  <p>${quiz.data.title}</p>`

  let rendQuiz = document.querySelector('.quiz');
  rendQuiz.innerHTML = '';
  for (let i = 0; i < quiz.data.questions.length; i++ ) {
    if (quiz.data.questions[i].answers.length === 2) {
      for (let c = 0; c < quiz.data.questions[i].answers.length; c++) {
        aleatorio.push(c);
      }
      aleatorio.sort(function () {
        return 0.5 - Math.random();
      })
      rendQuiz.innerHTML += `
        <div class="quest-quizz">
        <div class="quest"><p>${quiz.data.questions[i].title}</p></div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[0]].isCorrectAnswer}" onclick="marcarResposta (this)">
            <img src="${quiz.data.questions[i].answers[aleatorio[0]].image}"/>
            <p>${quiz.data.questions[i].answers[aleatorio[0]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[1]].isCorrectAnswer}" onclick="marcarResposta (this)">
            <img src="${quiz.data.questions[i].answers[aleatorio[1]].image}"/>
            <p>${quiz.data.questions[i].answers[aleatorio[1]].text}</p>
          </div>
        </div>`
        aleatorio = [];
      }

    else if (quiz.data.questions[i].answers.length === 3) {
      for (let c = 0; c < quiz.data.questions[i].answers.length; c++) {
        aleatorio.push(c);
      }
      aleatorio.sort(function () {
        return 0.5 - Math.random();
      })
      rendQuiz.innerHTML += `
        <div class="quest-quizz">
        <div class="quest"><p>${quiz.data.questions[i].title}</p></div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[0]].isCorrectAnswer}" onclick="marcarResposta (this)">
            <img src="${quiz.data.questions[i].answers[aleatorio[0]].image}"/>
            <p>${quiz.data.questions[i].answers[aleatorio[0]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[1]].isCorrectAnswer}" onclick="marcarResposta (this)">
            <img src="${quiz.data.questions[i].answers[aleatorio[1]].image}"/>
            <p>${quiz.data.questions[i].answers[aleatorio[1]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[2]].isCorrectAnswer}" onclick="marcarResposta (this)">
            <img src="${quiz.data.questions[i].answers[aleatorio[2]].image}"/>
            <p>${quiz.data.questions[i].answers[aleatorio[2]].text}</p>
          </div>
        </div>`
        aleatorio = [];
    } else if (quiz.data.questions[i].answers.length === 4) {
      for (let c = 0; c < quiz.data.questions[i].answers.length; c++) {
        aleatorio.push(c);
      }
      aleatorio.sort(function () {
        return 0.5 - Math.random();
      })
      rendQuiz.innerHTML += `
        <div class="quest-quizz">
        <div class="quest"><p>${quiz.data.questions[i].title}</p></div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[0]].isCorrectAnswer}" onclick="marcarResposta (this)">
            <img src="${quiz.data.questions[i].answers[aleatorio[0]].image}"/>
            <p>${quiz.data.questions[i].answers[aleatorio[0]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[1]].isCorrectAnswer}" onclick="marcarResposta (this)">
            <img src="${quiz.data.questions[i].answers[aleatorio[1]].image}"/>
            <p>${quiz.data.questions[i].answers[aleatorio[1]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[2]].isCorrectAnswer}" onclick="marcarResposta (this)">
            <img src="${quiz.data.questions[i].answers[aleatorio[2]].image}"/>
            <p>${quiz.data.questions[i].answers[aleatorio[2]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[3]].isCorrectAnswer}" onclick="marcarResposta (this)">
            <img src="${quiz.data.questions[i].answers[aleatorio[3]].image}"/>
            <p>${quiz.data.questions[i].answers[aleatorio[3]].text}</p>
          </div>
        </div>
        <div class="quest-quizz"</div>`
        aleatorio = [];
    }  
  }
  let resultado = document.querySelector('.caixa-resultado');
  resultado.innerHTML = '';
  total = `${quiz.data.levels.length}`;

}



function erroRenderizarQuiz () {
  alert('Ocorreu um erro ao selecionar o quiz. Por favor, tente mais tarde!')
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