let submit = document.getElementById('submit');
let result = document.getElementById('result');
submit.addEventListener('click', async () => {
  let code = document.querySelector('.personal_code_input');
  let period = document.querySelector('.months_input');
  let amount = document.querySelector('.amount_input');
  let response = await fetch(
    `http://localhost:3000/api/loan?code=${code.value}&period=${period.value}&amount=${amount.value}`
  ).then(res => res.json());
  handleResponse(response);

  code.value = '';
  period.value = '';
  amount.value = ""
});

function handleResponse(response) {
  result.classList.remove('hide');
  const { amount, approved, message, period } = response.loan;
  const approved_id = document.getElementById('approved');
  const message_id = document.getElementById('message');
  const period_id = document.getElementById('period');
  const amount_id = document.getElementById('amount');
  approved_id.textContent = approved;
  message_id.textContent = message;
  period_id.textContent = period;
  amount_id.textContent = amount;
}
