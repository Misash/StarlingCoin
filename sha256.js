
// Step1: pre-processing

txt = "hello world"

binaryTxt = ""
for ( const elem of txt){
    //char to binary 
    binaryTxt += elem.charCodeAt(0).toString(2) + " ";
}

console.log(binaryTxt)

//append a bit

binaryTxt += "1"

console.log(binaryTxt)


// c = 'ab'
// x = 256

// console.log(c.charCodeAt(0).toString(2))
// console.log(x.toString(2))