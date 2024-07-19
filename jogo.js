//alert('TESTE')
// desafio encontrar altura e largura
// através do página, através do objeto window
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search // traz o resultado com ? (?normal)
nivel.replace('?', '') // removendo o ? substindo o ? para ''

if(nivel === 'normal'){
	//1500 = 1,5 segundos
	criaMosquitoTempo = 1500
}else if(nivel === 'dificil'){
	//1000 = 1 segundo 
	criaMosquitoTempo = 1000
}else if (nivel === 'chucknorris'){
	//750 milesegundos
	criaMosquitoTempo = 750
}	



// criação das variáveis fora do escopo da função para poder afetar as variáveis do escopo global.
// criamos a função abaixo para encapsular a lógica
// para ajustar o tamanho do palco do jogo

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight // recuperando altura
	largura = window.innerWidth // recuperando largura

	console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function(){

    tempo -= 1
	if(tempo < 0){
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		//alert('vitoria')
		window.location.href = "vitoria.html"
	}else{
	document.getElementById('cronometro').innerHTML = tempo
	}
	
}, 1000)


// criando posição randomica do mosquito

function posicaoRandomica(){

	// remover o mosquito anterior (caso exista) na primeira chamada não existe mosquito
	if(document.getElementById('mosquito')){ // testando se existe elemento
		document.getElementById('mosquito').remove()
        
		//console.log('elemento selecionado foi: v' + vidas)
		if(vidas > 3){

			//alert('Interromper o jogo (game over)')
			window.location.href = "fim_de_jogo.html"
		}else{
		document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"

		vidas++
		}
	}
	

	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90
    
    // decremento de 90 px para evitar o estouro , e não ultrapassar tela

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	// usei o ternário caso a seja 0 receber 0 para não sumir a imagem
	// evitando posições negativas sendo criadas aleatória.

	console.log(posicaoX, posicaoY)

	//CRIAR O ELEMENTO HTML USANDO O DOM

	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png' // aqui está sendo criado de forma programática , dinâmica através do javascript e na sequencia estamos incluido no body da página
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function(){
		this.remove() // this. referência ao próprio elemento ajusta o contexto
		//alert('Elemento clicado a tempo')
	}

	document.body.appendChild(mosquito) // adicionando um filho para o body
    
	//console.log(ladoAleatorio())

}

// criando vários tamanhos do mosquito
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	console.log(classe)

	switch(classe){
		case 0:
			return 'mosquito1'
		
		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}

}

// criação e alteração de lado
function ladoAleatorio(){
	var classe = Math.floor(Math.random() * 2)
	console.log(classe)

	switch(classe){
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'

	}


}

/// executar automaticamente usando 