import fs from "fs";

const csvContent = fs.readFileSync('Day14.txt', 'utf8');
const rows = csvContent.split('\n');

let boardX = 101
let boardY = 103

let positions = []
for(let i = 0; i < rows.length ; i++){
    let records = rows[i].split(' ');

    let x = Number(records[0].substring(records[0].indexOf('p=')+2,records[0].indexOf(',')));
    let y = Number(records[0].substring(records[0].indexOf(',')+1));

    let xV = Number(records[1].substring(records[1].indexOf('v=')+2,records[1].indexOf(',')));
    let yV = Number(records[1].substring(records[1].indexOf(',')+1));



    for(let j = 0; j < 100; j++){
        x += xV
        y += yV

        if(x >= boardX){
            x =  x - boardX
        }
        if(x < 0){
            x = boardX + x
        }

        if(y >= boardY){
            y = y - boardY
        }
        if(y < 0){
            y = boardY + y
        }
    }
    let xMiddle = Math.floor(boardX/2)
    let yMiddle = Math.floor(boardY/2)
    if(x >= 0 && x < xMiddle && y >= 0 && y < yMiddle){
        positions.push({x, y, q: 1});
    } else if (x > xMiddle && y >= 0 && y < yMiddle){
        positions.push({x, y, q: 2});
    } else if (x >= 0 && x< xMiddle && y > yMiddle){
        positions.push({x, y, q: 3});
    } else if (x > xMiddle && y > yMiddle){
        positions.push({x, y, q: 4});
    }



}

console.log(positions);

let q1 = 0
let q2 = 0
let q3 = 0
let q4= 0

for(let pos of positions){
    if(pos.q === 1){
        q1++
    }
    if(pos.q === 2){
        q2++
    }
    if(pos.q === 3){
        q3++
    }
    if(pos.q === 4){
        q4++
    }
}

console.log(q1 * q2 * q3 * q4);


let array = []

for(let i = 0; i < boardY ; i++){
    array.push([])
    for(let j = 0; j < boardX; j++){
        array[i][j] = 0
    }
}
for(let pos of positions){
    array[pos.y][pos.x]++;
}

//console.log(array);






function strSplice (str, i,j){
    let newStr = str.split(''); // or newStr = [...str];
    newStr.splice(i,j);
    newStr = newStr.join('');
    return newStr;
}

