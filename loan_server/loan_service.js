import client_service from './client_service.js';

export default class loan_service {
  constructor() {
    this.client_service = new client_service();
  }
  validateData(req) {
    if (req.code.length != 11) {
      return false;
    } else {
      if (!this.client_service.getClient(req.code)) {
        return false;
      }
    }
    return this.validatePeriod(req.period) && this.validateAmount(req.amount);
  }

  validatePeriod(period) {
    return period >= 12 && period <= 60;
  }

  validateAmount(amount) {
    return amount >= 2000 && amount <= 10000;
  }

  calculateLoan(code, period, amount) {
    let loan = {
      period,
      amount,
      message: '',
      approved: true,
    };
    const client = this.client_service.getClient(code);
    if (client.segment == 0) {
      loan.approved = false;
      loan.message = 'Sorry, you have debts to pay!';
      return loan;
    }
    const modifier = client.modifier;
    let score = (modifier / amount) * period;
    let loanAmount = Math.round(score * amount);
    if (score < 1 && this.validateAmount(loan.amount)) {
      loan.period = Math.round((amount * 1) / modifier);
      if (this.validatePeriod(loan.period)) {
        loan.message = `Can't accept original query. Will accept ${amount}$ with new time period of ${loan.period}.`;
        return loan;
      } else {
        loan.approved = false;
        loan.message = `Sorry, but we can't accept those conditions.`;
        loan.amount = amount;
        return loan;
      }
    } else {
      if (loanAmount > 10000) {
        loan.amount = 10000;
      }else{
        loan.amount = loanAmount
      }
      loan.message = `Maximum loan is ${loanAmount > 10000 ? 10000 : loanAmount} with time period of ${period}`;
      return loan;
    }
  }
}
