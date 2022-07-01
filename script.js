let particles = [];
let n_elements = 100;
let G = 0;


/* [radius, mass, poX, poY, acX, acY] */

for(let i = 0; i < n_elements; i++){
    let obj = [2, 3, random(1000, 0), random(1000, 0), random(10, -10), random(10, -10)]
    particles.push(obj);
}

function random(e1, e2){
     return Math.floor(Math.random() * (e1 - e2) + e2);
}