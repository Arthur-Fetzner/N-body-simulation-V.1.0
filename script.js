let particles = [];
let newparticles = [];
let n_elements = 100;
let radius = 2;
let mass = 3;
let G = 1.4;

/* [radius, mass, poX, poY, acX, acY] */

for(let i = 0; i < n_elements; i++){
    let obj = [radius, mass, random(1000, 0), random(1000, 0), random(10, -10), random(10, -10)]
    particles.push(obj);
}

function random(e1, e2){
     return Math.floor(Math.random() * (e1 - e2) + e2);
}

function gravity(){
    for(let i = 0; i < particles.length; i++){
        let acX = particles[i][4];
        let acY = particles[i][5];

        for(let j = 0; j < particles.length; j++){
            let xd = true;
            let yd = true;

            let x1 = 0;
            let x2 = 0;
            let y1 = 0;
            let y2 = 0;

            let ca = 0;
            let co = 0;

            if(particles[i][3] < 1){
                x1 = particles[i][3] * -1; 
            }

            if(particles[j][3] < 1){
                x2 = particles[j][3] * -1; 
            }

            if(particles[i][3] < 1){
                y1 = particles[i][3] * -1; 
            }

            if(particles[j][3] < 1){
                y2 = particles[j][3] * -1; 
            }

            if(x1 > x2){
                ca = x1 - x2;
            }else{
                ca = x2 - x1;
                xd = false;
            }

            if(y1 > y2){
                co = y1 - y2;
            }else{
                co = y2 - y1;
                yd = false;
            }

            let dist = Math.sqrt(Math.pow(ca, 2) + Math.pow(co, 2));
            
            let a = (G * (particles[i][2] * particles[j][2] / dist)) / particles[i][2] 

            let new_ca = ca/dist*a
            let new_co = co/dist*a  

            if(xd == false){
                new_ca = new_ca*-1;
            }

            if(yd == false){
                new_co = new_co*-1;
            }

            acX += new_ca;
            acY += new_co
        }
        
        let o = particles;
        o[2] += acX;
        o[3] += acY;
        o[4] = acX;
        o[5] = acY;
    }
}