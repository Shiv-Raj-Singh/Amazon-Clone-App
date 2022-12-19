import aws from "aws-sdk"
import AppError from "../validator/AppError.js";

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

const uploadFile = (file)=>{
    return  new Promise((resolve , reject)=>{
        const s3 = new aws.S3({apiVersion: '2006-03-01'}); 

        const fileParams= {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",  //HERE
            Key: "Profile-Image -project -05 " + file.originalname, //HERE 
            Body: file.buffer  
        }
        s3.upload(fileParams , (err , data)=>{
            if(err)  return reject(new AppError(err.message , 500))
            // console.log(data)
            return resolve(data.Location)
        })
    })
}

export default uploadFile