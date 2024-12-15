import fs from "fs";

const csvContent = fs.readFileSync('Day14.txt', 'utf8');
const rows = csvContent.split('\n');

let boardX = 101
let boardY = 103
let beginArray = []
let positions = []
for(let i = 0; i < rows.length ; i++){
    let records = rows[i].split(' ');

    let x = Number(records[0].substring(records[0].indexOf('p=')+2,records[0].indexOf(',')));
    let y = Number(records[0].substring(records[0].indexOf(',')+1));

    let xV = Number(records[1].substring(records[1].indexOf('v=')+2,records[1].indexOf(',')));
    let yV = Number(records[1].substring(records[1].indexOf(',')+1));

    beginArray.push({x: x, y: y, xV: xV, yV: yV});

}
for(let j = 0; j < 10000; j++) {
    let positions = []
    for(let rec of beginArray){
        let x = rec.x
        let y = rec.y
        let xV = rec.xV
        let yV = rec.yV
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
        positions.push({x, y, xV: xV, yV: yV});
        // let xMiddle = Math.floor(boardX/2)
        // let yMiddle = Math.floor(boardY/2)
        // if(x >= 0 && x < xMiddle && y >= 0 && y < yMiddle){
        //     positions.push({x, y, q: 1, xV: xV, yV: yV});
        // } else if (x > xMiddle && y >= 0 && y < yMiddle){
        //     positions.push({x, y, q: 2,xV: xV, yV: yV});
        // } else if (x >= 0 && x< xMiddle && y > yMiddle){
        //     positions.push({x, y, q: 3,xV: xV, yV: yV});
        // } else if (x > xMiddle && y > yMiddle){
        //     positions.push({x, y, q: 4,xV: xV, yV: yV});
        // }
    }

    beginArray = JSON.parse(JSON.stringify(positions));
    let array = []

    for(let i = 0; i < boardY ; i++){
        array.push([])
        for(let j = 0; j < boardX; j++){
            array[i][j] = '.'
        }
    }
    for(let pos of positions){
        array[pos.y][pos.x] = 'X';
    }


    //console.log(array)
   writeMultidimensionalArrayToFile(array, `Output.txt`, j);


}
console.log(positions);




function writeMultidimensionalArrayToFile(array, filePath, frame) {
    try {
        // Convert the array into a string representation
        const content = array.map(row => Array.isArray(row) ? row.join('') : row).join('\n');

        fs.appendFileSync(filePath, `Frame: ${frame} \n`, 'utf8');
        fs.appendFileSync(filePath, content, 'utf8');
        fs.appendFileSync(filePath, '\n', 'utf8');

        console.log(`Array successfully written to ${filePath}`);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}






