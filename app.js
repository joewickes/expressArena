const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/sum', (req, res) => {
  const { a, b } = req.query;
  const sum = parseInt(a)+parseInt(b);
  res.send(`The sum of ${a} and ${b} is ${sum.toString()}`);
});

app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;

  const encrypted = text.split('').map(letter => {
    const code = letter.charCodeAt(0);

    if (code >=65 && code <= 90) {
      if ((code + parseInt(shift)) > 90) {
        return String.fromCharCode((code + parseInt(shift)) - 26);
      } else {
        return String.fromCharCode(code + parseInt(shift));
      }
    } else if (code >= 97 && code <= 122) {
      if ((code + parseInt(shift)) > 122) {
        return String.fromCharCode((code + parseInt(shift)) - 26);
      } else {
        return String.fromCharCode(code + parseInt(shift));
      }
    }
  });

  res.send(`${encrypted.join('')}`);
});

app.get('/lotto', (req, res) => {
  const { nums } = req.query;
  const parsedNums = nums.map(num => parseInt(num));

  const randomNums = [];
  for (let i = 0; i < 6; i++) {
    randomNums.push(Math.ceil(Math.random() * 20));
  }

  const matched = randomNums.reduce((acc, randomNum, idx) => {
    if (randomNum === parsedNums[idx]) {
      return acc + 1;
    } else {
      return acc + 0;
    }
  }, 0);

  const result = matched === 4 ? 'Congratulations, you win a free ticket' 
    : matched === 5 ? 'Congratulations! You win $100!'
      : matched === 6 ? 'Wow! Unbelievable! You could have won the mega millions!' 
        : 'Sorry, you lose'
  ;

  res.send(`${result}`);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

