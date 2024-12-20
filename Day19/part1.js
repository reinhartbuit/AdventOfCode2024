import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";



// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const csvContent = fs.readFileSync(path.join(__dirname, "Day19.txt"), "utf8");
const rows = csvContent.split('\n');
let options = []
let patterns = []

options = rows[0].split(', ')
console.log(options)

for(let i = 2; i < rows.length; i++){
    patterns.push(rows[i])
}
console.log(patterns)



let counter = 0
for(let pat of patterns){

    if(find(pat, 0, pat.length)){
        counter++
    }
}
console.log(counter)

function find(substr, pointer, size){
    if(substr === ''){
        return true
    }
    if(pointer === size){
        return false
    }
    let found = false
    for(let option of options){
        if (substr.slice(0, option.length) === option) {
            let newSubstr = substr.slice(option.length)
            found = find(newSubstr, pointer+option.length, size)
        }
    }
    return found
}

