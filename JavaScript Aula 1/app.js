
// UMA FORMA DE MOSTRAR COISAS NA TELA PRINCIPAL

// let titulo = document.querySelector('h1'); // Metodo para pegar algo de um outro arquivo nesse caso o titulo do arquivo html linha 22 .HTML
// titulo.innerHTML = 'Adivinhações';

// let paragrafo = document.querySelector('p'); // linha 23 .HTML
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10.';


// A FUNÇÃO ABAIXO SUBSTITUI TODAS AS LINHAS ACIMA

function exibirTextoNaTela (tag, texto) { // não usar aspas nessa paramentros da função
   let campo = document.querySelector(tag); // função somente para alterar e mostrar algo na tela
   campo.innerHTML = texto;
   responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate : 1.2}); // quando abrir a pagina vai abrir uma caixinha pedindo apra habilitar o som ou não, comando linkado com o html para dar audio aos textos
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Game de Adivinhações'); // parametro inicial é de qual parte do arquivo vai pegar para substituir no titulo
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10.'); // parametro depois é o que vai colocar no caso uma mensagem para referencia
};

mensagemInicial();

let listaSorteados = [];
let maxList = 100

function numberAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * maxList + 1); // gera um numero aleatorio e armazena na variavel.
    let qntNumLista = listaSorteados.length; // para contar a quantidade de numeros dentro da lista
    if (qntNumLista == maxList) { // se a qnt chegar ao maximo, a função aqui limpa a lista garantindo que cada ciclo nunca se repetira os numeros.
        listaSorteados = [];
    };
    if (listaSorteados.includes(numeroEscolhido)) { // includes verifica se o numero escolhido já esta na lista, se esta, retorna a chamada da função.
        return numberAleatorio(); // essa, para gerar un novo numero
    } else {
        listaSorteados.push(numeroEscolhido); // caso o numero não está na lista, esse comando adiciona o numero na lista 
        console.log(listaSorteados);
        return numeroEscolhido;
    }
};

let numeroSecreto = numberAleatorio(); // chamou a função para ser executada e armazena o numero em uma variável  

let tentativas = 0;
function verificarChute() { // função linkada la com o html para ser executada somente quano clicar no botão chutar
    let chute = document.querySelector('input').value; // metodo para pegar o valor digitado dentro do campo input

    tentativas ++; // para somar aquantidade de vezes até acertar o número

    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // operador ternario lesse assim: caso tentativas > 1 tentativas senão ":" tentativa tem que ser entro da função para poder pegar o num armazendado da tentativa
    let quantidadeTentativas = `Você precisou de ${tentativas} ${palavraTentativa} para ganhar o jogo.`; // variavel para não escrever todo rexto no () da função   

    if (chute == numeroSecreto) {        
        exibirTextoNaTela('h1', 'PARABÉNS!!! ');
        exibirTextoNaTela('p', quantidadeTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); // ativar botão de novo jogo quando acertamos a tentativa.
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'Tente algum número menor.');
        } else {
            exibirTextoNaTela('p', 'Tente algum número maior.');
        };
        limparCampo(); // função gerada para limpar campo caso erramos o número
    };
};

function limparCampo() { // função para limpar o campo quando digita um numero errado
    chute = document.querySelector('input');
    chute.value = '';
};

function atualizarPag() { // função para reiniciar o jogo quando acertamos o numero secreto.
    numeroSecreto = numberAleatorio();
    limparCampo();
    tentativas = 0;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // metodo para desabilitar o botã ode novo jogo enquanto não acertar o resultado
};
