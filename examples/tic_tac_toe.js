let w3 = c.w / 3;
let h3 = c.h / 3;

if(c.f){
    c.f = c.b = c.p = 0;
    c.r();
}

if(!c.p){
    c.p = 0;
}

if(!c.b){
    c.b = [
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0]
    ]
    
    // Board drawing
    c.l(w3, 0, w3, c.w)
    c.l(w3*2, 0, w3*2, c.w)
    c.l(0, h3, c.h, h3)
    c.l(0, h3*2, c.h, h3*2)
}

// Piece drawing functions
let draw_x = (x, y, s) => {
    c.l(x - s, y - s, x + s, y + s);
    c.l(x + s, y - s, x - s, y + s);
};

// Click events
if(c.e.c.length){
    let [x, y] = c.e.c.pop();
    [x, y] = [Math.floor(x/w3), Math.floor(y/h3)]
    
    if(!c.b[x][y]){
        ((++ c.p) % 2? draw_x : c.c)((x + 1)*w3 - w3/2, (y + 1)*h3 - h3/2, w3/3)
    
        c.e.c = [];
        c.b[x][y] = (c.p % 2) + 1;
    }
}

for(let wpos of [
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]]){
        
    let pieces = wpos.map(([x, y]) => c.b[x][y])
    
    if(pieces.every(i => i == pieces[0] && i)){
        alert("WON")
        c.f = 1;
        break;
    }
}

let draw = 0;

for(let row of c.b){
    for(let p of row){
        draw |= !p;
    }
}

if(!draw){
    alert("DRAW")
    c.f = 1;
}