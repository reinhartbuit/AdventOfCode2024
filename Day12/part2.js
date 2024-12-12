import fs from "fs";

const csvContent = fs.readFileSync('Day12.txt', 'utf8');
const rows = csvContent.split('\n');

let array = []
let alreadyDone = []
let counter = 0

let mapping = []

for(let i = 0; i < rows.length; i++){
        array.push(rows[i].split(''));
}
let finalArray = [];
for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array[i].length; j++) {
        counter = 0
        let current = array[i][j]
        mapping.length = 0
        if(current.slice(0,1) !== 'XX'){
            let perim = getNext(current, i, j);
            console.log(mapping);
            let totalSides = 0
            totalSides += getSidesUP(mapping);
            console.log(getSidesUP(mapping));
            totalSides += getSidesDOWN(mapping);
            console.log(getSidesDOWN(mapping));
            totalSides += getSidesRIGHT(mapping);
            console.log(getSidesRIGHT(mapping));
            totalSides += getSidesLEFT(mapping);
            console.log(getSidesLEFT(mapping));

            console.log(totalSides);

            finalArray.push({plant: current, perim: totalSides, counter: counter});
            //finalArray.push(obj);
        }

    }
}
console.log(finalArray);
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
        mapping.push({value: current, x: i,y: j, location: key})
        if(around[key].value === ('XX'+current)) {
            count--
            mapping.forEach((item, index) => {
                if (item.value === current && item.x === i && item.y === j && item.location === key) {
                    mapping.splice(index, 1);
                }
            });
        }
        if(around[key].value === current){
            count--
            noMore = false
            mapping.forEach((item, index) => {
                if (item.value === current && item.x === i && item.y === j && item.location === key) {
                    mapping.splice(index, 1);
                }
            });
            if(alreadyDone.find(item => item.x === around[key].x && item.y === around[key].y) === undefined){
                count += getNext(around[key].value, around[key].x, around[key].y, key);
                mapping.forEach((item, index) => {
                    if (item.value === current && item.x === i && item.y === j && item.location === key) {
                        mapping.splice(index, 1);
                    }
                });
            }
        } else {

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

function getSidesUP(mapping){
    let totalSide = 0
    for(let i = 0; i < array.length; i++){
        let tempArray = mapping.filter(item => item.location === 'up' && item.x === i);
        tempArray.sort((a, b) => a.y - b.y);
        console.log(tempArray);
        if(tempArray.length === 0){
            continue
        }
        if(tempArray.length === 1){
            totalSide++
            continue;
        }
        totalSide++
        let tempValue = tempArray[0]
        for(let item of tempArray){
            if( item.y - tempValue.y > 1){
                totalSide++
            }
            tempValue = item
        }
    }

    return totalSide;
}

function getSidesDOWN(mapping){
    let totalSide = 0
    for(let i = 0; i < array.length; i++){
        let tempArray = mapping.filter(item => item.location === 'bottom' && item.x === i);
        tempArray.sort((a, b) => a.y - b.y);
        if(tempArray.length === 0){
            continue
        }
        if(tempArray.length === 1){
            totalSide++
            continue;
        }
        totalSide++
        let tempValue = tempArray[0]
        for(let item of tempArray){
            if( item.y - tempValue.y > 1){
                totalSide++
            }
            tempValue = item
        }
    }

    return totalSide;
}

function getSidesRIGHT(mapping){
    let totalSide = 0
    for(let i = 0; i < array.length; i++){
        let tempArray = mapping.filter(item => item.location === 'right' && item.y === i);
        tempArray.sort((a, b) => a.x - b.x);

        if(tempArray.length === 0){
            continue
        }
        if(tempArray.length === 1){
            totalSide++
            continue;
        }
        totalSide++
        let tempValue = tempArray[0]
        for(let item of tempArray){
            if( item.x - tempValue.x > 1){
                totalSide++
            }
            tempValue = item
        }

    }

    return totalSide;
}

function getSidesLEFT(mapping){
    let totalSide = 0
    for(let i = 0; i < array.length; i++){
        let tempArray = mapping.filter(item => item.location === 'left' && item.y === i);
        tempArray.sort((a, b) => a.x - b.x);
        if(tempArray.length === 0){
            continue
        }
        if(tempArray.length === 1){
            totalSide++
            continue;
        }
        totalSide++
        let tempValue = tempArray[0]
        for(let item of tempArray){
            if( item.x - tempValue.x > 1){
                totalSide++
            }
            tempValue = item
        }

    }

    return totalSide;
}

