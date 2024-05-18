import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';


const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'uploads', 
            filename: `${Date.now()}-${file.originalname}`, 
        };
    },
});
const upload = multer({ storage });

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
    res.status(200).json({ file: req.file });
});

export const config = {
    api: {
        bodyParser: false, 
    },
};