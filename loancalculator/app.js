const loanForm = document.getElementById("loan-form");
document.getElementById('results').style.display = "none";













// Event listeners
loanForm.addEventListener('submit', submitLoan);




// functions
function submitLoan(e){
  e.preventDefault();
  const loanAmount = document.getElementById('amount');
  const interestAmount = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculetedInterest = parseFloat(interest.value) / 100 / 12;
  const calculetedPayment = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculetedInterest,calculetedPayment);
  const monthly = (principal*x*calculetedInterest)/(x-1);
  if (isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculetedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculetedPayment)-principal).toFixed(2);
    document.getElementById('loading').style.display = "block";
    setTimeout(() => {
      document.getElementById('loading').style.display = "none";
      document.getElementById('results').style.display = "block";
    }, 2000);
  }else{
    showError('please enter valid numbers!!!');
  }
}
function showError(error){
  let errorL = document.createElement("div");
  errorL.className = "alert alert-danger";
  errorL.appendChild(document.createTextNode(error));
  const cardL = document.querySelector(".card");
  const headingL = document.querySelector(".heading")
  cardL.insertBefore(errorL, headingL);
  setTimeout(() => {
    removeError(errorL);
  }, 4000);
}
function removeError(error){
  error.remove();
};