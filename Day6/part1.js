import fs from "fs";

const rulesCSV = fs.readFileSync('Day6.csv', 'utf8');
const rows = rulesCSV.split('\n');

let array = []
for(let i = 0; i < rows.length; i++) {
    const items = rows[i].split('');
    let newArray = [];
    items.forEach(item => {
        newArray.push(item)
    })
    array.push(newArray);
}

function findStart(){
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[i].length; j++) {
            if(array[i][j] === '^'){
                return {x: i, y: j, d: 'UP'}
            }
            if(array[i][j] === '>'){
                return {x: i, y: j, d: 'RIGHT'}
            }
            if(array[i][j] === 'v'){
                return {x: i, y: j, d: 'DOWN'}
            }
            if(array[i][j] === '<'){
                return {x: i, y: j, d: 'DOWN'}
            }
        }
    }
}


let moveCount = 1;

    function move(startingPosition){
        if(startingPosition.d === 'UP'){
            const newLocation = {x: startingPosition.x-1, y: startingPosition.y, d: 'UP'}
            if(newLocation.x < 0 || newLocation.y < 0 || !array[startingPosition.y] || !array[startingPosition.y][newLocation.x]){
                return {newLocation,d: 'DONE'};
            }
            if(array[newLocation.x][newLocation.y] === '#'){
                return {x: startingPosition.x, y: startingPosition.y, d: 'RIGHT'}
            }
            if(array[startingPosition.x][startingPosition.y] !== 'X'){
                array[startingPosition.x][startingPosition.y] = 'X'
                moveCount++
            }
            return newLocation;
        }
        if(startingPosition.d === 'RIGHT'){
            const newLocation = {x: startingPosition.x, y: startingPosition.y+1, d: 'RIGHT'};
            if(newLocation.x < 0 || newLocation.y < 0 || !array[startingPosition.y] || !array[startingPosition.y][newLocation.x]){
                return {newLocation,d: 'DONE'};
            }
            if(array[newLocation.x][newLocation.y] === '#'){
                return {x: startingPosition.x, y: startingPosition.y, d: 'DOWN'}
            }
            if(array[startingPosition.x][startingPosition.y] !== 'X'){
                array[startingPosition.x][startingPosition.y] = 'X'
                moveCount++
            }
            return newLocation;
        }
        if(startingPosition.d === 'DOWN'){
            const newLocation = {x: startingPosition.x+1, y: startingPosition.y, d: 'DOWN'};
            if(newLocation.x < 0 || newLocation.y < 0 || !array[startingPosition.y] || !array[startingPosition.y][newLocation.x]){
                return {newLocation,d: 'DONE'};
            }
            if(array[newLocation.x][newLocation.y] === '#'){
                return {x: startingPosition.x, y: startingPosition.y, d: 'LEFT'}
            }
            if(array[startingPosition.x][startingPosition.y] !== 'X'){
                array[startingPosition.x][startingPosition.y] = 'X'
                moveCount++
            }
            return newLocation;
        }
        if(startingPosition.d === 'LEFT'){
            const newLocation = {x: startingPosition.x, y: startingPosition.y-1, d: 'LEFT'};
            if(newLocation.x < 0 || newLocation.y < 0 || !array[startingPosition.y] || !array[startingPosition.y][newLocation.x]){
                return {newLocation,d: 'DONE'};
            }
            if(array[newLocation.x][newLocation.y] === '#'){
                return {x: startingPosition.x, y: startingPosition.y, d: 'UP'}
            }
            if(array[startingPosition.x][startingPosition.y] !== 'X'){
                array[startingPosition.x][startingPosition.y] = 'X'
                moveCount++
            }
            return newLocation;
        }
    }


let currentPosition = findStart();


        do{
            currentPosition = move(currentPosition);
        } while (currentPosition.d !== 'DONE')



console.log(moveCount);






