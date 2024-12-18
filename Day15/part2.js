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
    c++
} while (c < rows.length && row.length !== 0);
map.length = c-1;


do{
    row = rows[c].split('')
    positions.push(...row)
    c++
} while (c < rows.length && row.length !== 0);

let newMap = [];
for(let i = 0; i < map.length; i++){
    newMap.push([])
    for(let j = 0; j < map.length*2; j++) {
        newMap[i].push('.')
    }
}
console.log(newMap)


for(let i = 0; i < map.length; i++){
    for(let j = 0; j < map.length; j++){
        if(map[i][j] === '@'){
            newMap[i][j+j] = '@'
            startingX = j+j
            startingY = i
            newMap[i][j+1+j] = '.'
        }
        if(map[i][j] === '.'){
            newMap[i][j+j] = '.'
            newMap[i][j+j+1] = '.'
        }
        if(map[i][j] === '#'){
            newMap[i][j+j] = '#'
            newMap[i][j+j+1] = '#'
        }
        if(map[i][j] === 'O'){
            newMap[i][j+j] = '['
            newMap[i][j+j+1] = ']'
        }
    }
}


console.log(newMap)
writeMultidimensionalArrayToFile(newMap, 'output.txt')

console.log(startingX, startingY);
//positions.length = 11
for(let pos of positions){
    let newPos = next(startingX, startingY, pos);
    console.log(newPos)
    if(isWall(newPos.x, newPos.y)){
        continue
    }
    if(isEmpty(newPos.x, newPos.y, pos)){
        newMap[newPos.y][newPos.x] = '@'
        newMap[startingY][startingX] = '.'
    } else {
        let n = returnBox(newPos.x, newPos.y, pos)

        // newPos.x = n.x
        // newPos.y = n.y
    }

    startingX = newPos.x
    startingY = newPos.y
    writeMultidimensionalArrayToFile(newMap, 'output.txt', pos)
   // console.log(map)

}
let total = 0
for(let i = 0; i < newMap.length; i++){
    for(let j = 0; j < newMap[i].length; j++){
        if(newMap[i][j] === 'O'){
            //console.log(i,j)
            total += 100 * i + j
        }
    }

}
console.log(total)

function isWall(x,y){
    return newMap[y][x] === '#';
}
function isEmpty(x,y){
    return newMap[y][x] === '.';
}
function returnBox(x,y, pos){
    if(newMap[y][x] !== '['  || newMap[y][x+1] !== ']'){
        return false;
    }
    if(pos === '^' && newMap[y][x] === '['){
        let n = next(x,y, pos);
        if(newMap[n.y][n.x] === '.'){
            newMap[n.y][n.x] = '['
            newMap[y][x] = '.'
            newMap[y][x] = '@'
            newMap[y+1][x] = '.'
            newMap[n.y][n.x+1] = ']'
            newMap[y][x+1] = '.'
        }
        n = next(n.x,n.y, pos);

    }

    // console.log(pos, x , y)
    // if(map[y][x] !== '[' && map[y][x+1] === ']'){
    //     return false;
    // }
    // if(isWall(x, y)){
    //     return false;
    // }
    // let n = next(x+1,y, pos);
    // console.log(n)
    // if(isEmpty(n.x, n.y)){
    //     return {x: n.x, y: n.y};
    // }
    // return returnBox(n.x, n.y, pos);
}

function getNextDot(x,y, pos){
    let value = newMap[y][x];
    if(value === '.'){
        return {x:x,y:y};
    }
    if(pos === '^'){
        return getNextDot(x,y-1, pos);
    }
    if(pos === 'v'){
        return getNextDot(x,y+1, pos);
    }
    if(pos === '<'){
        return getNextDot(x-1,y, pos);
    }
    if(pos === '>'){
        return getNextDot(x+1,y, pos);
    }
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



