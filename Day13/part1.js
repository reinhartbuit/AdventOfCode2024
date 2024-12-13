import fs from "fs";

const csvContent = fs.readFileSync('Day12.txt', 'utf8');
const rows = csvContent.split('\n');

let array = []

for(let i = 0; i < rows.length ; i+=4){
    let btnA_X = Number(rows[i].substring(rows[i].indexOf('X+')+2,rows[i].indexOf(',')));
    let btnA_Y = Number(rows[i].substring(rows[i].indexOf('Y+')+2));

    let btnB_X = Number(rows[i+1].substring(rows[i+1].indexOf('X+')+2,rows[i+1].indexOf(',')));
    let btnB_Y = Number(rows[i+1].substring(rows[i+1].indexOf('Y+')+2));

    let prize_X = Number(rows[i+2].substring(rows[i+2].indexOf('X=')+2,rows[i+2].indexOf(',')));
    let prize_Y = Number(rows[i+2].substring(rows[i+2].indexOf('Y=')+2));

    let totalPrize = 0
    let maxBtnB_X = Math.floor(prize_X/btnB_X)
    let maxBtnB_Y = Math.floor(prize_Y/btnB_Y)

    let maxBtnB = (maxBtnB_X < maxBtnB_Y ?  maxBtnB_X : maxBtnB_Y) > 100 ? 100:  (maxBtnB_X < maxBtnB_Y ?  maxBtnB_X : maxBtnB_Y)

    for(let i = maxBtnB;i >= 0; i--){
        let combo = canGet(i, btnA_X, btnA_Y, btnB_X, btnB_Y, prize_X, prize_Y);
        if(combo){
            array.push(combo);
            break
        }
    }




    // for(let a = 0; a < 100 ; a++){
    //     for(let b = 0; b < 100; b++){
    //
    //     }
    // }

}
let total = 0
for(let arr of array){
    total += arr.totalPrize;
}
console.log(total)

function canGet(countB, btnA_X, btnA_Y, btnB_X, btnB_Y, prize_X, prize_Y){
    let totalPrize = 0
    if(countB * btnB_X === prize_X &&  countB * btnB_Y === prize_Y){
        totalPrize = countB
        return {countA: 0, countB: countB, totalPrize: totalPrize}
    }
    let remainderX = prize_X - (countB * btnB_X)
    let remainderY = prize_Y - (countB * btnB_Y)

    let maxBtnA_X = Math.floor(remainderX/btnA_X)
    let maxBtnA_Y = Math.floor(remainderY/btnA_Y)

    let maxBtnA = maxBtnA_X < maxBtnA_Y ?  maxBtnA_X : maxBtnA_Y
    maxBtnA = maxBtnA > 100 ? 100 : maxBtnA

    if(maxBtnA * btnA_X === remainderX &&  maxBtnA * btnA_Y === remainderY){
        totalPrize = countB + maxBtnA * 3
        return {countA: countB, countB: maxBtnA, totalPrize: totalPrize}
    }

    return null
}

function pushButton(x,y,amount){
    return {x: amount * x, y: amount * y};
}

