import fs from "fs";

const csvContent = fs.readFileSync('Day12.txt', 'utf8');
const rows = csvContent.split('\n');

let array = []
let alreadyDone = []
let counter = 0

for(let i = 0; i < rows.length; i++){
        array.push(rows[i].split(''));
}
let finalArray = [];
for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array[i].length; j++) {
        counter = 0
        let current = array[i][j]
        if(current.slice(0,1) !== 'XX'){
            let perim = getNext(current, i, j);

            finalArray.push({plant: current, perim: perim, counter: counter});
            //finalArray.push(obj);
        }

    }
}
console.log(array);
let totalPrice =0
for(let value of finalArray){
    console.log(value)
    if(value.plant.length === 1){
        totalPrice +=value.counter * value.perim
    }

}




console.log(totalPrice)

function getNext(current , i , j, cameFromDirection){
    alreadyDone.push({x: i,y: j})
    let around = checkAround(array, i,j)
    array[i][j] = 'XX' + current
    let count = 4
    counter++
    let noMore = true
    for(let key in around){
        if(around[key].value === ('XX'+current)) {
            count--
        }
        if(around[key].value === current){
            count--
            noMore = false
            if(alreadyDone.find(item => item.x === around[key].x && item.y === around[key].y) === undefined){
                count += getNext(around[key].value, around[key].x, around[key].y, key);
            }

        }
    }
    return count;

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

