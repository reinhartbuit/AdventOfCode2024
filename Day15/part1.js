import fs from "fs";

const csvContent = fs.readFileSync('Day15.txt', 'utf8');
const rows = csvContent.split('\n');

Object.defineProperty(process.stdout, 'columns', { value: 200 });

let map = []
let positions = []
let c = 0
let row
let startingX = 0
let startingY = 0
do{
    row = rows[c].split('')
    map.push(row)
    for(let i = 0; i < row.length; i++){
        if(row[i] === '@'){
            startingX = i
            startingY = c
        }
    }
    c++
} while (c < rows.length && row.length !== 0);
map.length = c-1;


do{
    row = rows[c].split('')
    positions.push(...row)
    c++
} while (c < rows.length && row.length !== 0);

console.log(startingX, startingY);
//positions.length = 11
for(let pos of positions){
    let newPos = next(startingX, startingY, pos);
    console.log(newPos)
    console.log(pos)
    if(isWall(newPos.x, newPos.y)){
        continue
    }
    if(isEmpty(newPos.x, newPos.y, pos)){
        map[newPos.y][newPos.x] = '@'
        map[startingY][startingX] = '.'
    } else {
        let n = returnBox(newPos.x, newPos.y, pos)
        if(n){
            map[n.y][n.x] = 'O'
            map[startingY][startingX] = '.'
            map[newPos.y][newPos.x] = '@'
        } else {
            continue
        }

        // newPos.x = n.x
        // newPos.y = n.y
    }

    startingX = newPos.x
    startingY = newPos.y
    writeMultidimensionalArrayToFile(map, 'output.txt', pos)
   // console.log(map)

}
let total = 0
for(let i = 0; i < map.length; i++){
    for(let j = 0; j < map[i].length; j++){
        if(map[i][j] === 'O'){
            console.log(i,j)
            total += 100 * i + j
        }
    }

}
console.log(total)

function isWall(x,y){
    return map[y][x] === '#';
}
function isEmpty(x,y){
    return map[y][x] === '.';
}
function returnBox(x,y, pos){
    console.log(pos, x , y)
    if(map[y][x] !== 'O'){
        console.log(map[y][x]);
        return false;
    }
    if(isWall(x, y)){
        return false;
    }
    let n = next(x,y, pos);
    console.log(n)
    if(isEmpty(n.x, n.y)){
        return {x: n.x, y: n.y};
    }
    return returnBox(n.x, n.y, pos);
}

function next(x,y,pos){
    let xx = x
    let yy = y
    if(pos === '^'){
        yy = y - 1
    }
    if(pos === 'v'){
        yy = y + 1
    }
    if(pos === '>'){
        xx = x + 1
    }
    if(pos === '<'){
        xx = x - 1
    }
    return {x: xx, y: yy}
}

function writeMultidimensionalArrayToFile(array, filePath, pos) {
    try {
        // Convert the array into a string representation
        const content = array.map(row => Array.isArray(row) ? row.join('') : row).join('\n');

        fs.appendFileSync(filePath, `POS: ${pos} \n`, 'utf8');
        fs.appendFileSync(filePath, content, 'utf8');
        fs.appendFileSync(filePath, '\n', 'utf8');

        console.log(`Array successfully written to ${filePath}`);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}



