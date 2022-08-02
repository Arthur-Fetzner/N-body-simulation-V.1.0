let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let particulas = [];
let numeroDeParticulas = 0;
let forcaGravitacional = 0;
let massaMaxima = 0;
let aceleracaoMaximaInicial = 0;
let Vkey = false;
let Hkey = false;

function random(max, min){
    return Math.floor(Math.random() * (max - min)) + min;
}

function criarParticula(){
    const particula = {
        raio: 1,
        massa: random(massaMaxima, 1),
        posicaoX: random(canvasWidth, 0),
        posicaoY: random(canvasHeight, 0),
        velocidadeX: random(aceleracaoMaximaInicial+1, -aceleracaoMaximaInicial),
        velocidadeY: random(aceleracaoMaximaInicial+1, -aceleracaoMaximaInicial)
    }

    particulas.push(particula);
}

function distanciaParticulas(p1, p2){
    const distanciaX = particulas[p1].posicaoX > particulas[p2].posicaoX ? particulas[p1].posicaoX - particulas[p2].posicaoX : particulas[p2].posicaoX - particulas[p1].posicaoX;
    const distanciaY = particulas[p1].posicaoY > particulas[p2].posicaoY ? particulas[p1].posicaoY - particulas[p2].posicaoY : particulas[p2].posicaoY - particulas[p1].posicaoY;
    return Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
}

function gravidadeEntreParticulas(p1, p2, dist){
    const gravidade = forcaGravitacional * ((particulas[p1].massa * particulas[p2].massa) / dist);
    return gravidade;
}

function velocidadeGravidadeEmPX(p1, gravidade){
    const GravidadeEmPX = gravidade / particulas[p1].massa;
    return GravidadeEmPX;
}

function mudancaEmX(p1, p2, distancia, velocidadeGravidade){
    const distanciaX = particulas[p1].posicaoX - particulas[p2].posicaoX;
    const mudancaX = (distanciaX / distancia) * velocidadeGravidade;
    return mudancaX;
}

function mudancaEmY(p1, p2, distancia, velocidadeGravidade){
    const distanciaY = particulas[p1].posicaoY - particulas[p2].posicaoY;
    const mudancaY = (distanciaY / distancia) * velocidadeGravidade;
    return mudancaY;
}

function novoX(p1, mudancaEmX){
    const novoX = particulas[p1].posicaoX - mudancaEmX;
    return novoX;
}

function novoY(p1, mudancaEmY){
    const novoY = particulas[p1].posicaoY - mudancaEmY;
    return novoY;
}   

function desenhar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particulas.length; i++) {
        ctx.beginPath();
        ctx.arc(particulas[i].posicaoX, particulas[i].posicaoY, particulas[i].raio, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.closePath();
    }
}

function inicializar(){
    particulas = [];

    for (let i = 0; i < numeroDeParticulas; i++) {
        criarParticula();
    }

    function atualizar(){    
        let novasParticulas = particulas;
        for(let i = 0; i < particulas.length; i++) {
            let velocidadeEmX = particulas[i].velocidadeX;
            let velocidadeEmY = particulas[i].velocidadeY;

            for(let j = 0; j < particulas.length; j++) {
                const distanciaElementos = distanciaParticulas(i, j);
                const forcaNEntreParticulas = gravidadeEntreParticulas(i, j, distanciaElementos);
                const GravidadeEmPX = velocidadeGravidadeEmPX(i, forcaNEntreParticulas);
                const mudancaX = mudancaEmX(i, j, distanciaElementos, GravidadeEmPX);
                const mudancaY = mudancaEmY(i, j, distanciaElementos, GravidadeEmPX);

                velocidadeEmX += distanciaElementos == 0 ? 0 : mudancaX;
                velocidadeEmY += distanciaElementos == 0 ? 0 : mudancaY;
            }

            const novaPosicaoX = novoX(i, velocidadeEmX);
            const novaPosicaoY = novoY(i, velocidadeEmY);

            novasParticulas[i].posicaoX = novaPosicaoX;
            novasParticulas[i].posicaoY = novaPosicaoY;
            novasParticulas[i].velocidadeX = velocidadeEmX;
            novasParticulas[i].velocidadeY = velocidadeEmY;

            if(Hkey == "right"){
                novasParticulas[i].posicaoX --;
            }else if(Hkey == "left"){
                novasParticulas[i].posicaoX ++;
            }

            if(Vkey == "up"){
                novasParticulas[i].posicaoY ++;
            }else if(Vkey == "down"){
                novasParticulas[i].posicaoY --;
            }

            if(novaPosicaoX <= 0 || novaPosicaoX >= canvasWidth || novaPosicaoY <= 0 || novaPosicaoY >= canvasHeight){
                novasParticulas[i].velocidadeX = 0;
                novasParticulas[i].velocidadeY = 0;
            }

            if(novaPosicaoX <= 0) {
                novasParticulas[i].posicaoX = 0;
            }else if(novaPosicaoX >= canvasWidth) {
                novasParticulas[i].posicaoX = canvasWidth;
            }

            if(novaPosicaoY <= 0) {
                novasParticulas[i].posicaoY = 0;
            }else if(novaPosicaoY >= canvasHeight) {
                novasParticulas[i].posicaoY = canvasHeight;
            }
        }

        particulas = novasParticulas;
        desenhar();
    }

    setInterval(atualizar, 30);
}

function keydown(e){
    if(e.keyCode == 39){
        Hkey = "right";
    }else if(e.keyCode == 37){
        Hkey = "left";
    }

    if(e.keyCode == 38){
        Vkey = "up";
    }else if(e.keyCode == 40){
        Vkey = "down";
    }
}

function keyup(e){
    if(e.keyCode == 39 || e.keyCode == 37){
        Hkey = false;
    }

    if(e.keyCode == 38 || e.keyCode == 40){
        Vkey = false;
    }
}

function botoes(acao, n){
    if(acao == "defNumeroDeParticulas"){
        numeroDeParticulas = n
    }else if(acao == "defMassaMaxima"){
        massaMaxima = n
    }else if(acao == "defAceleracaoMaxima"){
        aceleracaoMaximaInicial = n
    }else if(acao == "defGravidade"){
        forcaGravitacional = n
    }

    inicializar();
}