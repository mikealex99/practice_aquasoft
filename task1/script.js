        // ----------------      TASK 1        ----------------



// 1. metode de ES6 


//forEach method
const array = [1, 2, 4 ];

let sum = 0 ;
array.forEach(item => {
    sum += item;
})

console.log("The sum with forEach method: "+sum)

//filter method
const players = [
    {name: 'Ronaldo', age:37},
    {name: 'Neymar', age:26},
    {name: 'Tanase', age:27},
    {name: 'Buffon', age:40},
    {name: 'Messi', age:36},
    {name: 'Suarez', age:31},
]
const filteredPlayers = players.filter((item) =>{
    return item.age < 30
})
console.log(filteredPlayers)

//map method
const listPlayers = players.map((item) =>{
    return item.name
})
console.log(listPlayers)

//find method
const findPlayers = players.find((item) =>{
    return item.name === 'Ronaldo'
})
console.log(findPlayers)

//some method
const somePlayers = players.some((item) =>{
    return item.age >30
})
console.log(somePlayers)

//every method
const everyPlayers = players.every((item) =>{
    return item.age >30
})
console.log(everyPlayers)


//reduce method
const totalAgePlayers = players.reduce((total, item) =>{
    return item.age + total
}, 0)
console.log(totalAgePlayers)


//Object.assign() 
const newObj=Object.assign(array)
console.log("Assign() method: ",newObj) // '[ 1, 2, 4 ]'

//Object.entries() 
console.log("Entries() method: ",Object.entries(array)) // '[ [ '0', 1 ], [ '1', 2 ], [ '2', 4 ] ]'

//Object.getOwnPropertyDescriptors()
console.log("getOwnPropertyDescriptors() method: ",Object.getOwnPropertyDescriptors(array)) 
/* Output: '{
    '0': { value: 1, writable: true, enumerable: true, configurable: true },      
    '1': { value: 2, writable: true, enumerable: true, configurable: true },      
    '2': { value: 4, writable: true, enumerable: true, configurable: true },      
    length: { value: 3, writable: true, enumerable: false, configurable: false }  
  }' */

  // Array.includes()
  const myArr=array.includes(99)
  console.log("After includes() method: ", myArr)

    // Array.find()
    const Arrr = ['Football','Tennis', 2021, 1999,'Rugby']
    console.log(Arrr.find(x => x==='Football'))
    console.log(Arrr.find(x=> x <2021))

    // Array.findIndex()
    console.log(Arrr.findIndex(x=> x ==2021))

    // Array.entries()
    console.log(Arrr.findIndex(x=> x ==2021))


// 2. ----------- VAR-LET-CONST -------------

// var ---> can be re-declared and updated
// var ---> hoisting
// let-const ---> block-scoped
// let ---> can be updated but not re-declared.
// const ---> cannot be updated or re-declared
let x = 10
const y = 20
var z= 30

function printXandY(){
    x=11
   // y = 12 Assignment to constant variable error
    z=13

    console.log("Let x este "+x+", const y este "+ y+", iar var z este "+z)
}
printXandY()

const pet = {
    name: "Bruno",
    color: "white"
}
console.log("Const: " +pet.name)

console.log ("Var is "+test); //var is undefined
var test = "Hello world"



// 3. Spread Operator

const vector = [1, 2, 3, 4, 5]
const combined = [...vector, 6, 7, 8, 9, 10]
console.log("Spread operator combined:", combined)

function spreadop(a, b, ...c){
    console.log(c)
}
spreadop(1,2,3,4,5,6,7,8,9,10) // [3, 4, 5, 6, 7, 8, 9, 10]

var colors = ['blue', 'black', 'white', 'red']
var morecolors = ['green', 'pink']
colors.push(...morecolors)
console.log("Spread operator: ", colors)



// 4. Obiecte - cum iterezi un obiect, deep copy

class Dog {
    constructor(name, color) {
       this.name = name
       this.color = color
    }
    getName() {
      console.log("Name: " + this.name)
    }
    getColor(){
      console.log("Color: " + this.color)
    }
 }
 const dog = new Dog("Bruno", "black")
 dog.getName()
 dog.getColor()

const Dogg = { 
    name: "Bruno", 
    color: "black", 
    age: 3
}


console.log("Name: ", Dogg.name)
console.log("Color: ", Dogg.color)
console.log("Age: ", Dogg.age)

  // clonning an Object
 var arr1 = { name:"Bruno", color:"black" }; 
 var arr2 = Object.assign({}, arr1); 
 console.log("Array 1: ",arr1);  
 console.log("Array 2: ",arr2);  
 for (let val in arr2) { 
    console.log(arr2[val]) 
 }

    // deep copy - recursive function
    const deepCopyFunction = (inObject) => {
        let outObject, value, key
      
        if (typeof inObject !== "object" || inObject === null) {
          return inObject 
        }
      
        outObject = Array.isArray(inObject) ? [] : {}
      
        for (key in inObject) {
          value = inObject[key]
      
          outObject[key] = deepCopyFunction(value)
        }
      
        return outObject
      }

let originalArray = [10, 20, 30, 40 , 50]
console.log("Original array:", originalArray) 

let deepCopiedArray = deepCopyFunction(originalArray)
console.log("Deep copy:", deepCopiedArray)



// 5. arrays - accesor, iteration, mutator methods (care sunt, cum se folosesc)

let football = [ "rapid", "uta", "cfr", "fcsb" ]


for(const val of football){
    console.log(val)
}

console.log("Afisare cu map(): ")
football.map( (n) => console.log(n))


let coach = ["mourinho", 'guardiola', 'lucescu']
let Concat = football.concat(coach) 
console.log("Concat: " ,Concat)

let Join = football.join() // Join the elements of an array into a string
console.log("Join: ", Join) 

let Slice = football.slice(1,2)
console.log("Slice: ",Slice)

let IndexOf = football.indexOf("cfr")
console.log("IndexOf: ",IndexOf)

let LastIndexOf = football.indexOf("uta")
console.log("LastIndexOf: ",LastIndexOf)


football.pop() //remove an item from the end of an array
console.log("After pop() method: ")
for(const val of football){
    console.log(val)
}

football.shift() //remove an item from the beginning of an array
console.log("After shift() method: ")
for(const val of football){
    console.log(val)
}

football.push("dinamo") //add an item to the end of an array
console.log("After push() method: ")
for(const val of football){
    console.log(val)
}

football.unshift("craiova") //add an item to the beginning of an array
console.log("After unshift() method: ")
for(const val of football){
    console.log(val)
}

football.splice(1,0,"petrolul","fcsb2" ) // (index number, number of items to remove, items to add)
console.log("After splice() method: ")
for(const val of football){
    console.log(val)
}

football.reverse() // reverse the array
console.log("After reverse() method: ")
for(const val of football){
    console.log(val)
}

football.fill("liverpool") //Replace all values in the array with "liverpool"
console.log("After fill() method: ")
for(const val of football){
    console.log(val)
}

football.splice(0,4,"petrolul","fcsb2","dinamo","rapid" ) // (index number, number of items to remove, items to add)
console.log("After splice() method: ")
for(const val of football){
    console.log(val)
}

football.sort() //sort items
console.log("After sort() method: ")
for(const val of football){
    console.log(val)
}



// 6. promise,callback

// ---------- promises
let promise = new Promise((res, err) => {
    let x = 5
    if (x == 5){
        res('Correct')
    }else{
        err('Incorrect')
    }
})

promise.then((message)=>{
    console.log('Then message: ' , message)
}).catch((message) => {
    console.log('Catch message ' , message)
})
        // ---------- callbacks
const variable = false
const othervariable = false
function callBack(callback, errcallback){
    if(variable){
        errcallback({
            name: 'Error variable',
            message: 'this is an error'
        })
    }else if(othervariable){
        errcallback({
            name: 'Error OtherVariable',
            message: 'this is another error'
        })
    }else{
        callback("Correct variable")
    }
}

callBack((message) => {
    console.log('Succes: ', message)
}, (error) =>{
    console.log(error.name, ' ', error.message)
}
)



// 7. async, await

async function asyncawait() {

    let promise = new Promise((res, err) => {
      setTimeout(() => res("It worksssss"), 1000)
    });
  
    let result = await promise; // wait promise
    console.log(result) 
  }
  
  asyncawait(); // 'It worksssss'



  // 8. closures

  function closure(){
      let player = 'Ronaldo'
      function getName(){
          console.log(player)
      }
      return getName
  }

  const player = closure()
  player()




var first = 1;
var start;
function app(){
    var second = 2;
        function add(){
            var third = first + second;
            console.log(third);
        }
    start = add();
}
const startt = app()
console.log(start)