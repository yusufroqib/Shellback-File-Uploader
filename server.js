const express = require('express')
const app = express();
const fileUpload = require('express-fileupload')
const path = require('path');
const filePayloadExist = require('./middleware/filesPayloadExist');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');
const PORT = process.env.PORT || 3500

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post('/upload', 
    fileUpload({createParentPath: true}),
    filePayloadExist,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files
        console.log(files)

        return res.json({status: 'logged', message: 'logged'})
    }
    
)

app.listen(PORT, () => console.log(`Shellback running on PORT ${PORT}`))