let g = 1;

if(!c.o){
    c.o = []
}

if(c.e.c.length){
    let [x, y] = c.e.c.pop();
    c.o.push([x, y, 30, 0, 0])
}

c.r();

for(let i = 0; i < c.o.length; i ++){
    // Gravity
    c.o[i][4] += g;

    // Floor
    if(c.o[i][1] > c.h - 30){
        c.o[i][1] = c.h - 30;
        c.o[i][4] = -c.o[i][4] * 0.7
    }

    // Left wall
    if(c.o[i][0] < 30){
        c.o[i][0] = 30;
        c.o[i][3] = -c.o[i][3] * 0.7
    }

    // Right wall
    if(c.o[i][0] > c.w - 30){
        c.o[i][0] = c.w - 30;
        c.o[i][3] = -c.o[i][3] * 0.7
    }

    // Collisions
    for(let j = 0; j < c.o.length; j ++){
        if(i != j){
            let d = Math.sqrt((c.o[i][0] - c.o[j][0]) ** 2 + (c.o[i][1] - c.o[j][1]) ** 2)

            if(d < 60){
                let [vx, vy] = [c.o[i][0] - c.o[j][0], c.o[i][1] - c.o[j][1]]
                let f = ((60 - d) / 60) * 0.75;
                
                c.o[i][3] += vx * f;
                c.o[i][4] += vy * f;
                c.o[j][3] -= vx * f;
                c.o[j][4] -= vy * f;
            }
        }
    }

    // Friction
    c.o[i][3] *= 0.95
    c.o[i][4] *= 0.95

    // Velocity increase
    c.o[i][0] += c.o[i][3];
    c.o[i][1] += c.o[i][4];

    // Draw circle
    c.c(c.o[i][0], c.o[i][1], c.o[i][2]);
}