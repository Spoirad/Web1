const arrayNums = [1,2,3,4,5,6,7,8,9,10,11,12];
const arrayCopy = [...arrayNums];

arrayNums[0] = 7;
arrayCopy[0] = 8;

console.log(arrayNums); // [7, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
console.log(arrayCopy); 