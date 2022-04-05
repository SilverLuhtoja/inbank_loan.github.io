import loan_service from './loan_service.js';
import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;
const loanService = new loan_service();

app.use(
  cors({
    origin: 'http://localhost:8000',
  })
);

app.get('/api/loan', (req, res) => {
  if (loanService.validateData(req.query)) {
    const { code, period, amount } = req.query;
    const loan = loanService.calculateLoan(code, period, amount);
    res.send({ loan });
  } else {
    res.send({
      loan: {
        message: 'Invalid Data',
        approved: false,
      },
    });
  }
});

app.listen(port, () => {
  console.log('SERVER RUNNING ON :', port);
});
