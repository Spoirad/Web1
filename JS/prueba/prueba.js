console.log("hello world");

// let      --> variables que cambien
// const    --> variables que no cambien

let variable  = 8;
variable = {Name: "cosa", Age: 123};

const constante = "Constante";

console.log(variable);
console.log(constante);

const Object = {
    name: "John Wick",
    age: 30
};

console.log(Object.name.split(" ")[1]); // 2nd nombre



Object.age = 27; // permitido
/*
Object = { // No permitido
 ///
 ///
};
*/
console.log(Object);

let string1 = "Esto es una variable";

console.log(string1);

let string2 = 'Esto es otra variable';

console.log(string2);

let string3 = `Esto tambien es otra variable`;

console.log(string3);
console.log(string3.length);

console.log(`Hello ${Object.name}`);

let colors = ["blue", "green", "yellow"];
let matrices = [[2,1][3,3]];
let mix = ["Londres", 1934, -8.78];


weekend = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
weekend.forEach(element => {
    console.log(element);
});

function divide(arriba, abajo) {
    if(abajo == 0)
        throw new Error("Expected > 0");

    if(abajo == undefined)
        throw new Error("Syntax error");
    console.log(arriba / abajo);
}

let myNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let mySquares = [];


mySquares = myNumbers.map(x => x*x);

console.log(mySquares.toString());






//Pruba del Divide
try {
    divide(8,4);
    divide(4);
    divide(3,0);
}catch(error) {
    console.log("Error -> ", error.message);
}