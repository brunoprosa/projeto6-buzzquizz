axios.defaults.headers.common['Authorization'] = 'QvrjsZKGJ1H8evjKA56QR65s';

let informacaoBasic = {};
let questions = [];
let answers = [];
let levels = [];
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
let contarQuest = 0;

let contar = 0;

let acertos = 0;
let qtdeRespostas = 0;


function scroll () {
  let proxDiv = document.getElementsByClassName("quest-quizz")[contar];
  console.log(proxDiv);
  proxDiv.scrollIntoView({ behavior: 'smooth'});
  
console.log(contar);
console.log(acertos);
console.log(qtdeRespostas);
}
let naoSelecionado = [];
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
        </div>`
        aleatorio = [];
    }
    
    
  }
  
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
    image: url,
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
      <input type="text" id="Cresposta${i}1" placeholder="Resposta correta">
      <input type="text" id="imgResposta${i}1" placeholder="URL da imagem">
      <h1>Respostas incorretas</h1>
      <input type="text" id="Cresposta${i}2" placeholder="Resposta incorreta 1">
      <input type="text" class="margin32" id="imgResposta${i}2" placeholder="URL da imagem 1">

      <input type="text" id="Cresposta${i}3" placeholder="Resposta incorreta 2">
      <input type="text" class="margin32" id="imgResposta${i}3" placeholder="URL da imagem 2">

      <input type="text" id="Cresposta${i}4" placeholder="Resposta incorreta 3">
      <input type="text" id="imgResposta${i}4" placeholder="URL da imagem 3">
    </div>
    `;
  }
  showScreen32();
}

function criarPerguntas(){
  let pergunta = {};
  let resposta = {};
  for(i = 1; i <= informacaoBasic.quantPerguntas; i++){
    for(j = 1; j < 5; j++){
      if(document.querySelector(`#Cresposta${i}${j}`).value !== none || document.querySelector(`#imgResposta${i}${j}`).value !== none){
        resposta = {
          text: document.querySelector(`#Cresposta${i}${j}`).value,
          image: document.querySelector(`#imgResposta${i}${j}`).value,
          isCorrectAnswer: j === 1
        };
        answers.push(resposta);
      }
    }
    pergunta = {
      title: document.querySelector(`#textPergunta${i}`).value,
      color: document.querySelector(`#colorPergunta${i}`).value,
      answers: answers
    }
    questions.push(pergunta);
    console.log(questions);
    answers = [];
  }

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

function criarNiveis(){
  let niveis = {};
  for(i = 1; i <= informacaoBasic.qntdniveis; i++){
    niveis = {
      title: document.querySelector(`#tituloDoNivel${i}`).value,
      image: document.querySelector(`#imgNivel${i}`).value,
      text: document.querySelector(`#textNivel${i}`).value,
      minValue: Number(document.querySelector(`#notaMinima${i}`).value)
    };
    levels.push(niveis);
  }
  const quizz = {
    title: informacaoBasic.title,
    image: informacaoBasic.image,
    questions: questions,
    levels: levels
  }

  console.log(quizz);

  questions = [];
  levels = [];

  const promise = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', quizz);
  promise.then(showScreen34);
  promise.catch(erroDeEnvio);


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