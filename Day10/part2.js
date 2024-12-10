import fs from "fs";

const csvContent = fs.readFileSync('Day10.csv', 'utf8');
const rows = csvContent.trim().split('\n');
let count = 0;

let array = []
for(let i = 0; i < rows.length; i++) {
    array.push(rows[i].split('').map(Number));
}

let grandTotal = 0
for(let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {

        let starting = array[i][j]
        if(starting !== 0) {
            continue;
        }
        grandTotal+=findPath(array,0,i,j)
        refreshArray()

    }
}
console.log(grandTotal)
function refreshArray(){
    array.length = 0
    for(let i = 0; i < rows.length; i++) {
        array.push(rows[i].split('').map(Number));
    }
}

function findPath(array, value, x, y){
    let total = 0
    if(value === 9){
        //array[x][y] = 'X'
        return 1
    }
    if(array[x] && array[x][y+1]){
        if(array[x][y+1] === (value+1)){
            total += findPath(array, value+1, x, y+1);
        }
    }
    if(array[x] && array[x][y-1]) {
        if(array[x][y-1] === (value+1)){
            total += findPath(array, value + 1, x, y - 1);
        }
    }
    if(array[x+1] && array[x+1][y]){
        if(array[x+1][y] === (value+1)){
            total += findPath(array, value+1, x+1, y);
        }
    }
    if(array[x-1] && array[x-1][y]) {
        if(array[x-1][y] === (value+1)){
            total += findPath(array, value + 1, x - 1, y);
        }
    }
    return total
}


function move(startingPosition){
    if(startingPosition.d === 'UP'){
        const newLocation = {x: startingPosition.x-1, y: startingPosition.y, d: 'UP'}
        if(newLocation.x < 0 || newLocation.y < 0 || !rows[startingPosition.y] || !rows[startingPosition.y][newLocation.x]){
            return {newLocation,d: 'DONE'};
        }
        if(rows[newLocation.x][newLocation.y] === '#'){
            return {x: startingPosition.x, y: startingPosition.y, d: 'RIGHT'}
        }
        if(rows[startingPosition.x][startingPosition.y] !== 'X'){
            rows[startingPosition.x][startingPosition.y] = 'X'
        }
        return newLocation;
    }
    if(startingPosition.d === 'RIGHT'){
        const newLocation = {x: startingPosition.x, y: startingPosition.y+1, d: 'RIGHT'};
        if(newLocation.x < 0 || newLocation.y < 0 || !rows[startingPosition.y] || !rows[startingPosition.y][newLocation.x]){
            return {newLocation,d: 'DONE'};
        }
        if(rows[newLocation.x][newLocation.y] === '#'){
            return {x: startingPosition.x, y: startingPosition.y, d: 'DOWN'}
        }
        if(rows[startingPosition.x][startingPosition.y] !== 'X'){
            rows[startingPosition.x][startingPosition.y] = 'X'
        }
        return newLocation;
    }
    if(startingPosition.d === 'DOWN'){
        const newLocation = {x: startingPosition.x+1, y: startingPosition.y, d: 'DOWN'};
        if(newLocation.x < 0 || newLocation.y < 0 || !rows[startingPosition.y] || !rows[startingPosition.y][newLocation.x]){
            return {newLocation,d: 'DONE'};
        }
        if(rows[newLocation.x][newLocation.y] === '#'){
            return {x: startingPosition.x, y: startingPosition.y, d: 'LEFT'}
        }
        if(rows[startingPosition.x][startingPosition.y] !== 'X'){
        }
        return newLocation;
    }
    if(startingPosition.d === 'LEFT'){
        const newLocation = {x: startingPosition.x, y: startingPosition.y-1, d: 'LEFT'};
        if(newLocation.x < 0 || newLocation.y < 0 || !rows[startingPosition.y] || !rows[startingPosition.y][newLocation.x]){
            return {newLocation,d: 'DONE'};
        }
        if(rows[newLocation.x][newLocation.y] === '#'){
            return {x: startingPosition.x, y: startingPosition.y, d: 'UP'}
        }
        if(rows[startingPosition.x][startingPosition.y] !== 'X'){
            rows[startingPosition.x][startingPosition.y] = 'X'
        }
        return newLocation;
    }
}

function checkAround(rows, i, j){
    return {
        left: {x: i, y: j-1,
            value: rows[i]?.[j - 1] ?? undefined
        },
        right: {x: i, y: j+1,value: rows[i]?.[j + 1] ?? undefined},
        bottom: {x: i+1, y: j,value:rows[i + 1]?.[j] ?? undefined},
        up: {x: i-1, y: j,value:rows[i - 1]?.[j] ?? undefined},
    };
}