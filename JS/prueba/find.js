const students = [
    { name: 'John Doe', age: 18 },
    { name: 'Jane Smith', age: 17 },
    { name: 'Alice Johnson', age: 19 },
    { name: 'Bob Brown', age: 16 },
    { name: 'Charlie Davis', age: 20 }
];

const john = students.find(item => item.name == 'John Doe');

console.log(john); // { name: 'John Doe', age: 18 }



