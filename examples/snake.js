let steps = 20;
let ws = c.w / steps;
let hs = c.h / steps;

let r = () => Math.floor(Math.random() * steps);

if(!(c.t % 150)){
    if(!c.fp){
        c.fp = [r(), r()];
    }
}

if(!(c.t % 30)){
    if(!c.sp){
        c.sp = [[steps/2, steps/2]];
    }
    
    if(!c.d){
        c.d = [0, 1];
    }
    
    if(!c.z){
        c.z = 3;
    }
    
    if(c.e.k[37]){ c.d = [-1, 0] }
    if(c.e.k[38]){ c.d = [0, -1] }
    if(c.e.k[39]){ c.d = [1, 0] }
    if(c.e.k[40]){ c.d = [0, 1] }
    
    let [x, y] = c.sp[c.sp.length - 1];
    c.sp.push([x + c.d[0], y + c.d[1]]);
    
    while(c.sp.length > c.z){
        c.sp.shift();
    }
    
    c.r();
    
    let count = 0;
    let [xl, yl] = c.sp[c.sp.length - 1];

    for(let [x, y] of c.sp){
        c.q(x * ws, y * ws, ws, hs);
        
        if(c.fp && x == c.fp[0] && y == c.fp[1]){
            c.z += 1;
            c.fp = false;
        }
        
        count += x == xl && y == yl;
    }

    if(count > 1){
        alert("You died!");

        c.z = 3;
        c.d = [0, 1];
        c.sp = [[steps/2, steps/2]];
    }

    c.c(c.fp[0] * ws + ws / 2, c.fp[1] * hs + hs / 2, ws / 3);
}