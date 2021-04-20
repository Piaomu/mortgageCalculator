    class row {
    constructor(month, payment, principal, interest, totalInterest, balance) {
        this.month = month,
        this.payment = payment,
        this.principal = principal,
        this.interest = interest,
        this.totalInterest = totalInterest,
        this.balance = balance
    }
}

//(When the user clicks the button)
function buildPaymentSchedule() {
    // Get some values
    let balance = parseInt(document.getElementById("newAmount").value);
    let term = parseInt(document.getElementById("newTerm").value) * 12;
    let rate = parseFloat(document.getElementById("newInterest").value)/100;
    let paymentArray = getPayments(balance, term, rate);
    
    displayData(paymentArray, balance);
}


function getPayments(balance, term, rate) {
    let res = [];
    let totalInterest = 0;
    let prevBalance = balance;
    let payment = calcPayment(balance, term, rate);
    let remainingBalance = balance;
    for(let i = 1; i <= term; i++) {
        let interest = calcInterest(prevBalance, rate);
        let principal = calcPrincipal(payment, interest);
        totalInterest += interest;
        remainingBalance -= principal;
        prevBalance = remainingBalance;
        res.push(new row(i, payment, principal, interest, totalInterest, remainingBalance))
    }
    return res;
}

//This function calculates the payments
function calcPayment(balance, term, rate) {
    let payment = balance * (rate / 12) / (1 - (1 + rate / 12) ** (0-term));
    return payment;
}

//This function calculates the interest
function calcInterest(prevBalance, rate) {
    return (prevBalance * rate / 12)
}

//This function calculates the principal
function calcPrincipal(payment, interest) {
    return payment - interest;
}

function displayData(payments, totalPrincipal) {
    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById('resultsBody');
    //Clear teable
    resultsBody.innerHTML = "";

    for (let i = 0; i < payments.length; i++) {
    const dataRow = document.importNode(template.content, true);

    //Grab the nodes that create the table rows
    dataRow.getElementById("templateMonth").textContent = payments[i].month;
    dataRow.getElementById("templatePayment").textContent = `$${payments[i].payment.toFixed(2)}`;
    dataRow.getElementById("templatePrincipal").textContent = `$${payments[i].principal.toFixed(2)}`;
    dataRow.getElementById("templateInterest").textContent = `$${payments[i].interest.toFixed(2)}`;
    dataRow.getElementById("templateTotalInterest").textContent = `$${payments[i].totalInterest.toFixed(2)}`;
    dataRow.getElementById("templateBalance").textContent = `$${payments[i].balance.toFixed(2)}`;

    //Append the nodes to the page
    resultsBody.appendChild(dataRow);
    }

    //Add the totals to the right side of the table
    document.getElementById("monthly-payment").innerText = `$${payments[0].payment.toFixed(2)}`;
    document.getElementById("final-principal").innerText = `$${totalPrincipal.toFixed(2).toLocaleString()}`;
    let totalInterest = parseFloat(payments[(payments.length - 1)].totalInterest).toFixed(2).toLocaleString();
    document.getElementById("final-interest").innerText = `$${totalInterest}`;
    let totalCost = (totalPrincipal + totalInterest);
    totalCost = totalCost.toFixed(2);
    document.getElementById("final-cost").innerText = `$${totalCost.toLocaleString()}`;

}