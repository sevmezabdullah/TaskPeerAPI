import multer from 'multer';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {



        cb(null, file.originalname);
    }
});


export const upload = multer({ storage: storage }, { limits: { fileSize: 1000000 } });
