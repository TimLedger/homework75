import express, { Request, Response } from 'express';

const Vigenere = require('caesar-salad').Vigenere;
const app = express();
const port = 8000;

app.use(express.json());

app.post('/encode', (req: Request, res: Response) => {
    const { password, message } = req.body;
    const encryptedText = Vigenere.Cipher(password).crypt(message);
    res.json({ encoded: encryptedText });
});

app.post('/decode', (req: Request, res: Response) => {
    const { password, message } = req.body;
    const decryptedText = Vigenere.Decipher(password).crypt(message);
    res.json({ decoded: decryptedText });
});

app.listen(port, () => {
    console.log('Server online on http://localhost:' + port);
});