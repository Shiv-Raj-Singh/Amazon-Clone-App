// // const validPhone = (x)=>{
// //     // const rg = /^[6-9]{1}[0-9]{9}$/
// //     // const rg = /^[INR]*$/i
// //     const rg = /^[₹]*$/i
// //     return rg.test(x.trim())
// // }
// // console.log(validPhone("     ₹            "))

// // // const abc= `{"a" : 2}`
// // const abc= '["a", "x"]'
// // // const abd= {"x" : 2}
// // console.log(typeof abc)
// // const xyz = JSON.parse(abc)
// // // const xy = JSON.parse(abd)
// // Array.isArray(xyz)
// // console.log(xyz , typeof xyz , Array.isArray(xyz) ) 

// // const abc = ["XL" ,"X"]
// // console.log(JSON.parse(abc))

// // const arr = "[ 'abc' , 'av' , 'x' ]"
// // // const a = arr.split(' ') || arr.split(',')
// // // // const a = (arr.split('')[0])
// // // console.log(a.length)

// // // const arr = [{
// // //     a : "id",
// // //     q : "quanity"
// // // }]
// // // const arr = [{
// // //     a : "1",
// // //     q : 3
// // // }]
// // const arr = [ { a: 'xyz', q: 3 }, { a: "abc", q: 5 } ]
// // // console.log(arr)

// // // let obj = {
// // //     a : 5,
// // //     q : 1
// // // }
// // let qu = 0
// // console.log(qu)
// // // for(let i =0 ; i < arr.length ; i++){
// // //     // console.log()
// // //     qu = qu + arr[i].q
// // // }
// // arr.forEach(x=>{
// //         qu = qu + x.q
// // })
// // console.log(qu)
// // console.log(['pending' , 'completed' , 'canceled'].includes(("PENDING").toLowerCase()))
// // console.log(arr)
// // const abc = arr.find(a=> a.a==5)
// // console.log(abc)
// // if(!abc){
// //     arr.push(obj)
// // }
// // console.log(arr)





// // // let arr = [1,2,3,4,5,6,7,8,9]
// // let arr = "Mangal".toUpperCase()
// // for ( let i = arr.length - 1 ; i!=-1 ; i--){
// //     var s = ""
// //      s = arr[i] + " "
// //     }
// // console.log(s)
// // // console.log(arr[4])

// // for(let j = 0; j < 5; j++){
// //     // console.log("$".repeat(j))
// //     console.log(j.repeat(j))    
// // }




// // const auth = (req , res)=>{
// //     try {
// //         const token = req.headers
// //         jwt.verify(token , SECRET_KEY , (err , data)=>{
// //             if(err){
// //                 if(err.message == 'jwt expirein'){
// //                     return res.status(400).
// //                 }
// //             }
// //         })
// //     } catch (error) {
        
// //     }
// // }
// // console.log(p)

// // var a =0 
// const func = function(){
//     const x = "ABC"
//     return this
//     // console.log(x)
//     // return ()=>{
//     //     console.log(x)
//     // }
// }


// // const a = func().x
// func.prototype.abc = '123'
// console.log(func())
// // console.log(func.prototype)



// const word = "DATe"
// const abc = (a)=>{
//     let wrd = a.toUpperCase()
//     if(a === a.toUpperCase() || a === a.toLowerCase()){
//         return true
//     }
//     let x = ""

//     for (let i of a){
//         for (let j of wrd){
//             if(i[0]===j[0] && i===j){
//                 x+=i
//             }
//         }
//     }
//     if(x === a){
//         return true
//     }
//     return false
// }
// console.log(abc(word))

// let x = 'abc'
// let y = "ABC"
// console.log(x===y)


// var twoSum = function(nums, target) {
//     var arr = []
//     for (let i = 0 ; i < nums.length ; i++){
//         for (let j = i+1 ;j < nums.length ; j++ ){
//             console.log(i , j)
//             if(nums[i]+nums[j] === target){
//                 arr.push(i)
//                 arr.push(j)
//             }
//         }
//     }
//     return arr.join('')
//     // return [ arr[0], arr[1]]
// };

// console.log(twoSum([1,2,3,4] , 7))

// import {  } from 'material';


// let x = -"ram"
// let y = "ram"
// // if(x >= y ){
// //     console.log(true);
// // }else{
// //     console.log(false);

// // }
// // x.sort()
// console.log(x===y)



// for (let i in 100){
//     console.log(i);
// }

// const Abc = ()=>{
//     let i = 0
//     while(i !==101){
//         i++
//         yield (i);
//     }
// }
// console.log(abc())
// model.find({age : {$lte : 20 , $gte :10}})


// class Student{
//     constructor(name , age , phone , email){
//         this.name = name
//         this.age = age 
//         this.phone = phone 
//         this.email = email
//     }
// }

// let subhho = new Student("Subho Yadav" , 22 , 123344566 , "mananhn@shsh")
// console.log(subhho);

function objCreater(x,y,z){
    let obj = {}
    obj.name = x
    obj.age = y
    obj.email = z
    // obj.is!8 = function()
    return 
}
console.log(objCreater("Ankush" , 22, "abcfvabvba"));
  

