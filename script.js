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
  function verificar () {
    let divQuiz = document.querySelector('.quest-quizz');
    let naoSelecionado = divQuiz.querySelectorAll('.opcao');
    console.log(naoSelecionado);

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
}

/*let quizzPadrão = [
  {
    title: "Você sabe tudo sobre Naruto?",
	image: "https://static.quizur.com/i/b/58e7df25bf6916.5963426758e7df25a17155.50133024.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#434CA0",
			answers: [
				{
					text: "q1",
					image: "https://img.quizur.com/f/img60d1eff41b8e33.49831758.jpg?lastEdited=1624371190",
					isCorrectAnswer: true
				},
				{
					text: "q2",
					image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2w2Qw-Yv2D7cDDrqqrXQbhmKyrDh3CUAI3Q&usqp=CAU",
					isCorrectAnswer: false
				},
        {
					text: "q3",
					image: "https://img.quizur.com/f/img60d20fc08d9583.72398191.jpeg?lastEdited=1624379724",
					isCorrectAnswer: false
				},
				{
					text: "q4",
					image: "https://img.quizur.com/f/img63cb444ddb2836.98942715.png?lastEdited=1674265691",
					isCorrectAnswer: false
				}
			]
		}
  ]
  }
]
let requisicaoQuiz = axios.post('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes', quizzPadrão);
requisicaoQuiz.then();
requisicaoQuiz.catch();



let quizzExibido = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
quizzExibido.then(exibirQuizz);
quizzExibido.catch(erroExibirQuizz);

function exibirQuizz (foi) {
  console.log(foi);
  let quizz = document.getElementById('screen2');
  console.log(quizz);

}
function erroExibirQuizz () {
  alert('Ocorreu um erro');
}*/
//let quizzEscolhido = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/ID_DO_QUIZZ')



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