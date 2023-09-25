import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); 

app.post('/submitForm', async (req, res) => {
  const data = req.body;
  const endpoint = 'https://forms.maakeetoo.com/formapi/785';
  const accessCode = '7A75T83FNDCFTF9MKSBWIU1FX';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Code': accessCode
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    res.send(responseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error submitting the form');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
