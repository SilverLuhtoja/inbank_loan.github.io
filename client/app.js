let submit = document.getElementById('submit')
let result = document.getElementById('result');
submit.addEventListener('click', async () =>{
  // let code = document.querySelector('.personal_code_input').value;
  // let months = document.querySelector('.months_input').value;
  // let amount = document.querySelector('.amount_input').value;
  // months > 60 ? months =60 : months < 12 ? months = 12 : months;
  // amount > 10000 ? (amount = 10000) : amount < 2000 ? (amount = 2000) : amount;

  let code = 49002010976;
  let period = 20
  let amount= 2000
  console.log(`INPUTS : code ${code} , period ${period} , amount ${amount}`);
  let response = await fetch(`http://localhost:3000/api/loan?code=${code}&period=${period}&amount=${amount}`).then(res => res.json())
  handleResponse(response)
  
  
})

function handleResponse(response){
  const {amount,period,approved} = response.loan
  result.innerHTML = response.loan.amount
}

function checkInp(input) {
  var regex = /^[0-9]+$/;
  if (input.match(regex)) {
    return true;
  }
}