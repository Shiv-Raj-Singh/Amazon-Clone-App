// const validPhone = (x)=>{
//     // const rg = /^[6-9]{1}[0-9]{9}$/
//     // const rg = /^[INR]*$/i
//     const rg = /^[₹]*$/i
//     return rg.test(x.trim())
// }
// console.log(validPhone("     ₹            "))

// // const abc= `{"a" : 2}`
// const abc= '["a", "x"]'
// // const abd= {"x" : 2}
// console.log(typeof abc)
// const xyz = JSON.parse(abc)
// // const xy = JSON.parse(abd)
// Array.isArray(xyz)
// console.log(xyz , typeof xyz , Array.isArray(xyz) ) 

// const abc = ["XL" ,"X"]
// console.log(JSON.parse(abc))

// const arr = "[ 'abc' , 'av' , 'x' ]"
// const a = arr.split(' ') || arr.split(',')
// // const a = (arr.split('')[0])
// console.log(a.length)

// const arr = [{
//     a : "id",
//     q : "quanity"
// }]
// const arr = [{
//     a : "1",
//     q : 3
// }]
const arr = [ { a: 'xyz', q: 3 }, { a: "abc", q: 5 } ]
// console.log(arr)

let obj = {
    a : 5,
    q : 1
}
const qu = 0
console.log(qu)
arr.forEach(x=>{
    // console.log(x.a , x.q)
    if(x.a == 'abc'){
        qu = x.q
        x.q = x.q+1
    }

    // else{
    //     arr.push(obj)
    // }
})
console.log(qu)
// console.log(arr)
// const abc = arr.find(a=> a.a==5)
// console.log(abc)
// if(!abc){
//     arr.push(obj)
// }
// console.log(arr)




