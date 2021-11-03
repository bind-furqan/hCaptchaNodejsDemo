const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {verify} = require('hcaptcha');

// your hcaptcha secret key
const SECRET = process.env.HCAPTCHA_SECRET_KEY || '';
const PORT = process.env.PORT || 5000;

const app = express()

// middleware
app.use(cors());
app.use(bodyParser.json()); // required by express-hcaptcha

app.post('/verify', async (req, res) => {
    //console.log("token : ", req.body.token)

    try {
        let { success } = await verify(SECRET, req.body.token);
        if (success) {
            console.log("hcaptcha success : ", success)
            return res.status(200).json({result : "Verified"});
        }
        else {
            console.log("hcaptcha error : ", success)
            return res.status(400).json({result : "Invalid Captcha"});
        }
    }
    catch (e) {
        return res.status(400).json({error : e});
    }
});

app.listen(PORT, () => {
    console.log(`listening on http://0.0.0.0:${PORT}`);
});