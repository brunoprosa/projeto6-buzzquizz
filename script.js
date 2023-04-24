axios.defaults.headers.common['Authorization'] = 'QvrjsZKGJ1H8evjKA56QR65s';

let informacaoBasic = {};
let questions = [];
let answers = [];
let levels = [];
let valorId = [];
const ids = [];
let quiz;
let screen32 = document.querySelector('.container-criar-pergunta');
let screen33 = document.querySelector('.container-criar-niveis');
let screen34 = document.querySelector('#screen34');

let semQuiz = document.querySelector('.seus-quizzes-vazio');
let comQuiz = document.querySelector('.seus-quizzes');

let contarSelecionado = 0;

let contar = 0;

let acertos = 0;
let qtdeRespostas = 0;
let qtdeTotalDeRespostas = 0;
let total = 0;
let qtdeNivel = [];

let naoSelecionado = [];
let lvl = [];


let reiniciarQuiz = [];
let aleatorio = [];
let id;

function showScreen1() {
    document.querySelector('#screen1').classList.remove('escondido');
    document.querySelector('#screen2').classList.add('escondido');
    document.querySelector('#screen3').classList.add('escondido');
    document.querySelector('#screen34').classList.add('escondido');
    yourQuizzes();
  }
/*---------------------------------------------- screen 1 ----------------------------------------------------*/
/*---------------------------Meus Quizzes-----------------------------*/
function yourQuizzes(){
  if (ids.length === 0){
    semQuiz.classList.remove('.escondido');
    comQuiz.classList.add('escondido');
    console.log('não tem quizz');
  }else{
    semQuiz.classList.add('.escondido');
    comQuiz.classList.remove('escondido');
    console.log('tem quizz');
  }
}

yourQuizzes();

/*---------------------------Meus Quizzes-----------------------------*/
/*---------------------------Other Quizzes----------------------------*/
function getQuizzes(){
      const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
      promise.then( getOK );
      promise.catch( getErro );
  }
  
  function getOK(resp){
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
    valorId.push(quiz[i].id);
    ulQuizz.innerHTML += `
  
      <li data-test="others-quiz" id ="${quiz[i].id}" class ="quizz quizz${i+1}" style="
        background:linear-gradient(180deg,rgba(255,255,255,0)0%,rgba(0,0,0,0.5)64.58%, #000000 100%), url(${quiz[i].image});
        background-size:cover;"
        onclick="showScreen2(this)">
        <h1 class="quizz-title" >${quiz[i].title}</h1>
      </li>        
    `; 
  }
}
/*---------------------------Other Quizzes----------------------------*/
/*---------------------------------------------- screen 1 ----------------------------------------------------*/  
/*---------------------------------------------- screen 2 ----------------------------------------------------*/  
function showScreen2(select) {
    select.classList.add('select');
    document.querySelector('#screen1').classList.add('escondido');
    document.querySelector('#screen2').classList.remove('escondido');
    document.querySelector('#screen3').classList.add('escondido');
    renderizarQuizEscolhido ();
}
function reinicia () {
  let restart = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${id}`);
  contarSelecionado = 0;
  contar = 0;
  acertos = 0;
  qtdeRespostas = 0;
  qtdeTotalDeRespostas = 0;
  total = 0;
  qtdeNivel = [];
  let esconderResultado = document.querySelector('.caixa-resultado');
  esconderResultado.classList.add('escondido');
  naoSelecionado = [];
  lvl = [];

  restart.then(renderizarQuiz);
  restart.catch(erroRenderizarQuiz);
}

function resultado (lvl) {
  let qtdeAcerto = (acertos / qtdeRespostas)*100;
  let valorArredondado = Math.round(qtdeAcerto);
  let mostrarResultado = document.querySelector('.caixa-resultado');
  mostrarResultado.classList.remove('escondido');
  mostrarResultado.scrollIntoView({behavior: 'smooth'});
  mostrarResultado.innerHTML = '';
    for (let i = 0; i < total; i++) {
      if (lvl.data.levels[i].minValue === valorArredondado) {
        mostrarResultado.innerHTML += `
        <div class="titulo-resultado" data-test="level-title"><p>${valorArredondado}% de acerto: ${lvl.data.levels[i].title}</p></div>
        <div class="resultado">
          <img src="${lvl.data.levels[i].image}" data-test="level-img"/>
          <p data-test="level-text">${lvl.data.levels[i].text}</p>
        </div>
        `
        
      } else if (lvl.data.levels[i].minValue <= valorArredondado && lvl.data.levels[i + 1].minValue > valorArredondado) {
        mostrarResultado.innerHTML += `
        <div class="titulo-resultado" data-test="level-title"><p>${valorArredondado}% de acerto: ${lvl.data.levels[i].title}</p></div>
        <div class="resultado">
          <img src="${lvl.data.levels[i].image}" data-test="level-img"/>
          <p data-test="level-text">${lvl.data.levels[i].text}</p>
        </div>
        `
      } 
    }
 
  
}

function chamarResultado() {
  resultado (lvl[0]);
}

function scroll () {
  let proxDiv = document.getElementsByClassName("quest-quizz")[contar];
  
  
  contarSelecionado = 0;
  if (qtdeTotalDeRespostas > qtdeRespostas) {
    proxDiv.scrollIntoView({behavior: 'smooth'});
  } else {
    setTimeout (chamarResultado, 2000);
  }
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
  setTimeout (scroll, 2000);
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
function renderizarQuizEscolhido () {
  let select = document.querySelector('.select');
  id = select.id; //${id}
  let quizzEscolhido = axios.get(`https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${id}`);
  quizzEscolhido.then(renderizarQuiz);
  quizzEscolhido.catch(erroRenderizarQuiz);
}
function renderizarQuiz (quiz) {
  window.scrollTo(0, 0);
  lvl.push(quiz);
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
        <div class="quest-quizz" data-test="question">
        <div class="quest" "style="background-color: ${quiz.data.questions[i].color}" data-test="question-title"><p>${quiz.data.questions[i].title}</p></div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[0]].isCorrectAnswer}" onclick="marcarResposta (this)" data-test="answer">
            <img src="${quiz.data.questions[i].answers[aleatorio[0]].image}"/>
            <p data-test="answer-text">${quiz.data.questions[i].answers[aleatorio[0]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[1]].isCorrectAnswer}" onclick="marcarResposta (this)" data-test="answer">
            <img src="${quiz.data.questions[i].answers[aleatorio[1]].image}"/>
            <p data-test="answer-text">${quiz.data.questions[i].answers[aleatorio[1]].text}</p>
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
        <div class="quest-quizz" data-test="question">
        <div class="quest" "style="background-color: ${quiz.data.questions[i].color}" data-test="question-title"><p>${quiz.data.questions[i].title}</p></div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[0]].isCorrectAnswer}" onclick="marcarResposta (this)" data-test="answer">
            <img src="${quiz.data.questions[i].answers[aleatorio[0]].image}"/>
            <p data-test="answer-text">${quiz.data.questions[i].answers[aleatorio[0]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[1]].isCorrectAnswer}" onclick="marcarResposta (this)" data-test="answer">
            <img src="${quiz.data.questions[i].answers[aleatorio[1]].image}"/>
            <p data-test="answer-text">${quiz.data.questions[i].answers[aleatorio[1]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[2]].isCorrectAnswer}" onclick="marcarResposta (this)" data-test="answer">
            <img src="${quiz.data.questions[i].answers[aleatorio[2]].image}"/>
            <p data-test="answer-text">${quiz.data.questions[i].answers[aleatorio[2]].text}</p>
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
        <div class="quest-quizz" data-test="question">
        <div class="quest" style="background-color: ${quiz.data.questions[i].color}" data-test="question-title"><p>${quiz.data.questions[i].title}</p></div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[0]].isCorrectAnswer}" onclick="marcarResposta (this)" data-test="answer">
            <img src="${quiz.data.questions[i].answers[aleatorio[0]].image}"/>
            <p data-test="answer-text">${quiz.data.questions[i].answers[aleatorio[0]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[1]].isCorrectAnswer}" onclick="marcarResposta (this)" data-test="answer">
            <img src="${quiz.data.questions[i].answers[aleatorio[1]].image}"/>
            <p data-test="answer-text">${quiz.data.questions[i].answers[aleatorio[1]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[2]].isCorrectAnswer}" onclick="marcarResposta (this)" data-test="answer">
            <img src="${quiz.data.questions[i].answers[aleatorio[2]].image}"/>
            <p data-test="answer-text">${quiz.data.questions[i].answers[aleatorio[2]].text}</p>
          </div>
          <div class="opcao ${quiz.data.questions[i].answers[aleatorio[3]].isCorrectAnswer}" onclick="marcarResposta (this)" data-test="answer">
            <img src="${quiz.data.questions[i].answers[aleatorio[3]].image}"/>
            <p data-test="answer-text">${quiz.data.questions[i].answers[aleatorio[3]].text}</p>
          </div>
        </div>`
        aleatorio = [];
    }  
  }
  total = `${quiz.data.levels.length}`;
  qtdeTotalDeRespostas = `${quiz.data.questions.length}`;
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
  
  if(titulo.length < 20 || titulo.length > 65 || url.substring(0,5) !== 'https' || qntdperguntas < 3 || qntdniveis < 2){
    alert('Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres. \n URL da Imagem: deve ter formato de URL. \n Quantidade de perguntas: no mínimo 3 perguntas. \n Quantidade de níveis: no mínimo 2 níveis.');
    return
  }

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
      if(document.querySelector(`#Cresposta${i}${j}`).value !== '' && document.querySelector(`#imgResposta${i}${j}`).value !== ''){
        resposta = {
          text: document.querySelector(`#Cresposta${i}${j}`).value,
          image: document.querySelector(`#imgResposta${i}${j}`).value,
          isCorrectAnswer: j === 1
        };
        answers.push(resposta);
      }
    }

    const titulo = document.querySelector(`#textPergunta${i}`).value;
    const cor = document.querySelector(`#colorPergunta${i}`).value;

    if (titulo < 20 || cor.length !== 7 || answers.length < 2 ){
      alert('Texto da pergunta: no mínimo 20 caracteres. \n Cor de fundo: deve ser uma cor em hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F). \n Textos das respostas: não pode estar vazio. \n URL das imagens de resposta: deve ter formato de URL. \n É obrigatória a inserção da resposta correta e de pelo menos 1 resposta errada. Portanto, é permitido existirem perguntas com só 2 ou 3 respostas em vez de 4.');
      answers = [];
      questions = [];
      return;
    }

    pergunta = {
      title: titulo,
      color: cor,
      answers: answers
    };
    questions.push(pergunta);
    console.log(questions);
    answers = [];
  }

  screen33.innerHTML = '';
  for(i = 1; i <= informacaoBasic.quantNiveis; i++){
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
  let zero = 0;
  for(i = 1; i <= informacaoBasic.quantNiveis; i++){
    niveis = {
      title: document.querySelector(`#tituloDoNivel${i}`).value,
      image: document.querySelector(`#imgNivel${i}`).value,
      text: document.querySelector(`#textNivel${i}`).value,
      minValue: Number(document.querySelector(`#notaMinima${i}`).value)
    };

    if(niveis.minValue === 0){
      zero++;
    }

    if(niveis.title.length < 10 || niveis.minValue > 100 || niveis.minValue < 0 || niveis.image.substring(0,5) !== 'https' || niveis.text.length < 30 || i - zero === informacaoBasic.quantNiveis){
      alert('Título do nível: mínimo de 10 caracteres. \n % de acerto mínima: um número entre 0 e 100. \n URL da imagem do nível: deve ter formato de URL. \n Descrição do nível: mínimo de 30 caracteres. \n É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%.');
      levels = [];
      return;
    }
    console.log(niveis);
    levels.push(niveis);
  }
  
  const quizz = {
    title: informacaoBasic.title,
    image: informacaoBasic.image,
    questions: questions,
    levels: levels
  }

  console.log(quizz);

  const promise = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', quizz);
  promise.then(finalizarCriarQuizz);
  promise.catch(erroDeEnvio);


}

function finalizarCriarQuizz(){
  questions = [];
  levels = [];

  showScreen34();
}

function erroDeEnvio(erro){
  console.log(erro);
}

function storingQuiz(){
  const quizzCriado = ids;  // Array que você quer salvar
  const quizzCriadoSerializado = JSON.stringify(quizzCriado); // Array convertida pra uma string
  localStorage.setItem("quiz", quizzCriadoSerializado); // Armazenando a string na chave "quiz" do Local Storage
  const quizSerializada = localStorage.getItem("quiz"); // Pegando de volta a string armazenada na chave "quiz"
  const myquiz = JSON.parse(quizSerializada); // Transformando a string de volta na array original
}
/*----------------------------------------------screen 3 ------------------------------------------------------*/

function showScreen3() {
    document.querySelector('#screen1').classList.add('escondido');
    document.querySelector('#screen2').classList.add('escondido');
    document.querySelector('#screen3').classList.remove('escondido');
    document.querySelector('#screen31').classList.remove('escondido');
    informacaoBasica();
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