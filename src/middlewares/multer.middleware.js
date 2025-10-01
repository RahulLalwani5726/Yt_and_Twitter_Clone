import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null, "./public/temp")
    },
    filename: function(req , file , cb){
        cb(file.originalname+Date.now());
    }
})

export const Upload = multer({storage})
