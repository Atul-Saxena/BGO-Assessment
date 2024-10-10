import express, { Request, Response } from 'express';
import 'dotenv/config'
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const messages: { [key: string]: string } = {
    diamonds: "Diamonds are a girl's best friend! They are timeless and elegant.",
    jewelery: "Gold jewelry is classic and versatile. It never goes out of style.",
    silver: "Silver jewelry is a great choice for those who love a more understated look." 
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express!');
});

app.post('/messages/responses', (req: Request, res: Response) => {
    let reply = "I'm not sure about that. Can you please specify?";

    const userMessage = (req.body.message as string).toLowerCase();

    if (userMessage.includes('hi') || userMessage.includes('hello') || userMessage.includes('hey')) {
        reply = "Hello, how are you?";
    }
    if (userMessage.includes('goodbye') || userMessage.includes('bye')) {
        reply = "Thank you for chatting! Have a great day!" ;
    }
    if (userMessage === 'diamonds') {
        reply = messages.diamonds;
    } else if (userMessage === 'jewelery') {
        reply = messages.jewelery;
    } else if (userMessage === 'silver') {
        reply = messages.silver;
    }
    res.json({reply});
    console.log(req.body.message);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });