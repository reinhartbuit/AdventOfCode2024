import fs from "fs";

const csv = fs.readFileSync('Day9.csv', 'utf8');

let id = 0
let conStr = []

for(let i = 0; i < csv.length; i+=2) {
    //Create Block Space
    for(let j = 0; j < csv[i]; j++) {
        conStr.push(id)
    }
    for(let j = 0; j < csv[i+1]; j++) {
        conStr.push('.')
    }
    id++
}
console.log(conStr.length-1)
let count = 1
let nextRecord = conStr[conStr.length-1];
let t0 = performance.now();

let maximum = {start: 0, count: 0};
let freeCounter = 0
for(let i = conStr.length-1; i >= 0; i--) {
    nextRecord = conStr[i-1]
    // if(conStr[i] === 8){
    //     console.log(conStr,i)
    // }

    if(conStr[i] === '.' && nextRecord === '.'){
        continue
    }
    if(conStr[i] === '.' && nextRecord !== '.'){
        continue
    }
    if(conStr[i] === nextRecord){
        count++
        continue
    } else {
        //count++
        let indexer =  0
        // do {

            const freeSpace = getNextFreeSpace(indexer, count)
            freeCounter++
            if (freeSpace && freeSpace.end <= i) {
                let ind = i
                //maximum.start = freeSpace.start
                //maximum.count = count
                for (let j = freeSpace.start; j < freeSpace.start + count; j++) {
                    //console.log(conStr)
                    conStr[j] = conStr[ind]
                    conStr[ind] = '.'
                    ind++
                }
                indexer += conStr.length
            } else {
                indexer+=count
            }

        // }while (indexer < conStr.length)
        //console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);


        count = 1

       // console.log(conStr)
    }
    nextRecord = conStr[i]
    if((conStr.length - i) % 5000 === 0){
        console.log(i)
        const t1 = performance.now();
        console.log(`Call to doSomething took ${t1 - t0} milliseconds.${freeCounter}`);
        freeCounter = 0
        t0 = performance.now();
    }

}
console.log(conStr)

let grandTotal = 0
for(let j = 0; j < conStr.length; j++) {
    if(conStr[j] !== '.'){
        grandTotal += (j * conStr[j])
    }
}
console.log(grandTotal)

function findFirstFreeSpace(){
    for(let i = 0; i < conStr.length; i++){
        if(conStr[i] === '.'){
            return i
        }
    }
}

function getNextFreeSpace(startingPoint ,amount){
    let start = startingPoint;
    let end = startingPoint;

    let count =0
    let index = 1
    let next = start + 1
        do{
            if(conStr[start] !== '.' && conStr[next] === '.'){
                count++
                start = next
                end = next
                next = next + 1
            } else if(conStr[start] === '.' && conStr[next] === '.'){
                count++
                end = next
                next = next + 1
            } else if(conStr[start] === '.' && conStr[next] !== '.'){
                end = next-1
                if(count>= amount){
                    return {start: start, end: end}
                }
                start = next
                count = 0
            } else{
                start = next
                next = next + 1
            }

            index++
        } while ((index < conStr.length));

    //console.log(index)
}