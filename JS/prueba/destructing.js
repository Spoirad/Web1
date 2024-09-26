//destructing sin acabar

const students = { name: 'John Doe', age: 18 };
const {name, group } = students;

// rest parameters
console.log("rest parameters");

const myFunction = (...myParameters) =>{
    console.log(myParameters);
    myParameters.forEach((item, index)=> console.log(index, item));
}

myFunction(1, 'two', {name : "three", group : "treeGroup"});

//Spread

console.log("Spread");

const groupC = ["Maya", "Mary", "Bob"];
const students1 = ["John", "Peter", "Rachel", ...groupC];
students1.forEach((item, i)=> console.log(`Student ${i + 1} : ${item}`));
