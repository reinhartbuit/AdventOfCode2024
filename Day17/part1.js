import fs from "fs";


let A = 0
let B = 0
let C = 0
let pointer = 0
let instruction = [2,4,1,5,7,5,1,6,0,3,4,1,5,5,3,0]
let outputValue = ''

let con = false
//let counter = BigInt(14_000_900_000_000_0)
//let counter = BigInt(3_518_437_200_000_0)
let counter = BigInt(0)

while(!con){
    con = arraysEqual()
    if(con){
        console.log("Counter: ",A)
    }
    counter = BigInt(counter + BigInt(1))
    A = counter
    //console.log("Counter: ",A)


    pointer = 0
    outputValue = ''
    while(pointer < instruction.length) {
        call(instruction[pointer],instruction[pointer+1])
    }
    console.log(outputValue, outputValue.split(',').length, counter)
    writeMultidimensionalArrayToFile(outputValue, 'output.txt')
    // console.log("After Instructions: ", A)
}



console.log(outputValue)
console.log(A)
console.log(B)
console.log(C)

function arraysEqual() {
    let a = instruction
    let b = outputValue.split(',').map(Number)
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}

function call(opCode, operand){
    switch(opCode){
        case 0:
            adv_0(operand);
            break
        case 1:
            bxl_1(operand);
            break
        case 2:
            bst_2(operand);
            break
        case 3:
            jnz_3(operand);
            break
        case 4:
            bxc_4(operand);
            break
        case 5:
            out_5(operand);
            break
        case 6:
            bdv_6(operand);
            break
        case 7:
            cdv_7(operand);
            break
    }
}

function adv_0(operand){
    let numerator = A;
    let denominator = 2 ** getComboOperand(operand);
    A = BigInt(BigInt(numerator) / BigInt(denominator));
    pointer += 2
    return A
}

function bxl_1(operand){
    B = BigInt(B) ^ BigInt(operand);
    pointer += 2
    return B;
}

function bst_2(operand){
    B = getComboOperand(operand) % BigInt(8);
    pointer += 2
    return B;
}

function jnz_3(operand){
    if(A !== BigInt(0)){
        pointer = operand;
    } else {
        pointer += 2;
    }
}

function bxc_4(operand){
    B = B ^ C
    pointer += 2
    return B
}

function out_5(operand){
    if(outputValue === ''){
        outputValue += getComboOperand(operand) % BigInt(8);
    } else{
        outputValue += "," + getComboOperand(operand) % BigInt(8);
    }

    pointer += 2
    return B
}

function bdv_6(operand){
    let numerator = A;
    let denominator = 2 ** getComboOperand(operand);
    B = numerator / denominator;
    pointer += 2
    return B
}

function cdv_7(operand){
    let numerator = A;
    let denominator = BigInt(2) ** BigInt(getComboOperand(operand));
    C = numerator/ denominator;
    pointer += 2
    return C
}

function getComboOperand(operand){
    switch(operand){
        case 0:
            return 0
        case 1:
            return 1
        case 2:
            return 2
        case 3:
            return 3
        case 4:
            return A
        case 5:
            return B
        case 6:
            return C
    }
}

function writeMultidimensionalArrayToFile(array, filePath) {
    try {
        // Convert the array into a string representation
        //const content = array.map(row => Array.isArray(row) ? row.join('') : row).join('\n');

        fs.appendFileSync(filePath, array, 'utf8');
        fs.appendFileSync(filePath, '\n', 'utf8');

        console.log(`Array successfully written to ${filePath}`);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}