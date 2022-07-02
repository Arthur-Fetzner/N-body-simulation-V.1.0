let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let particulas = [];
let numeroDeParticulas = 200;
let forcaGravitacional = 0.1;

const random = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const criarParticula = () => {
    const particula = {
        raio: 8,
        massa: random(100, 1),
        posicaoX: random(3000, 0),
        posicaoY: random(3000, 0),
        velocidadeX: random(10, -10),
        velocidadeY: random(10, -10)
    }

    particulas.push(particula);
}

const distanciaParticulas = (p1, p2) => {
    const distanciaX = particulas[p1].posicaoX > particulas[p2].posicaoX ? particulas[p1].posicaoX - particulas[p2].posicaoX : particulas[p2].posicaoX - particulas[p1].posicaoX;
    const distanciaY = particulas[p1].posicaoY > particulas[p2].posicaoY ? particulas[p1].posicaoY - particulas[p2].posicaoY : particulas[p2].posicaoY - particulas[p1].posicaoY;
    return Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
}

const gravidadeEntreParticulas = (p1, p2, dist) => {
    const gravidade = forcaGravitacional * ((particulas[p1].massa * particulas[p2].massa) / dist);
    return gravidade;
}

const velocidadeGravidadeEmPX = (p1, gravidade) => {
    const GravidadeEmPX = gravidade / particulas[p1].massa;
    return GravidadeEmPX;
}

const mudancaEmX = (p1, p2, distancia, velocidadeGravidade) => {
    const distanciaX = particulas[p1].posicaoX - particulas[p2].posicaoX;
    const mudancaX = (distanciaX / distancia) * velocidadeGravidade;
    return mudancaX;
}

const mudancaEmY = (p1, p2, distancia, velocidadeGravidade) => {
    const distanciaY = particulas[p1].posicaoY - particulas[p2].posicaoY;
    const mudancaY = (distanciaY / distancia) * velocidadeGravidade;
    return mudancaY;
}

const novoX = (p1, mudancaEmX) => {
    const novoX = particulas[p1].posicaoX - mudancaEmX;
    return novoX;
}

const novoY = (p1, mudancaEmY) => {
    const novoY = particulas[p1].posicaoY - mudancaEmY;
    return novoY;
}   

const desenhar = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particulas.length; i++) {
        ctx.beginPath();
        ctx.arc(particulas[i].posicaoX, particulas[i].posicaoY, particulas[i].raio, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
        ctx.closePath();
    }
}

const inicializar = () => {
    for (let i = 0; i < numeroDeParticulas; i++) {
        criarParticula();
    }

    const atualizar = () => {    
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
        }

        particulas = novasParticulas;
        desenhar();
    }

    setInterval(atualizar, 30);
}

inicializar();