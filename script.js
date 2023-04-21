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
let quizzEscolhido = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/ID_DO_QUIZZ')



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