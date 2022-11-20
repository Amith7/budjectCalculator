
// creating object
var state = {
    balance: 1,
    income: 10,
    expence: 100,
    today: 5,
    transactions: [//Array

    ]
}
var balanceEl = document.querySelector('#balance');
var incomeEl = document.querySelector('#income');
var expenceEl = document.querySelector('#expence');
var transactionsEl = document.querySelector('#transaction');
var nameInputEl = document.querySelector('#name')
var amountInputEl = document.querySelector('#amount')
var today= new Date();
function init() {
    var localState = JSON.parse(localStorage.getItem('expenceTrackerState'))
    if (localState !== null) {
        state = localState;
    }
    updateState();
}
function AddIncome() {
    addtransaction(nameInputEl.value, amountInputEl.value, 'income',today)
    // validating
}
function addtransaction(name, amount, type,today) {
    if (name !== '' && amount !== ' ') {
        var transaction = {
            name: name,
            amount: parseInt(amount),
            type: type,
            today:today
        };
        state.transactions.push(transaction)
        updateState();

    }else {
        alert("please enter  validate name and amount  or Insufficient balance");
    }
    // console.log('income',nameInputEl.value,amountInputEl.value);
    //for Clearing
    nameInputEl.value = '';
    amountInputEl.value = '';

}
function AddExpence() {
    addtransaction(nameInputEl.value, amountInputEl.value, 'expence',today)
}


function updateState() {
    var balance = 0, income = 0, expence = 0

    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];
        if (item.type === 'income') {
            income += item.amount;
        } else if (item.type === 'expence') {
            expence += item.amount;
        }

    }
    balance = income - expence
    // console.log(balance,income,expence);
    state.balance = balance;
    state.income = income
    state.expence = expence;
    state.today=today;
    //local storage
    localStorage.setItem('expenseTrackerState', JSON.stringify(state))//store
    render();
}

function render() {
    //balance
    balanceEl.innerHTML = `$${state.balance}`;
    incomeEl.innerHTML = `$${state.income}`;
    expenceEl.innerHTML = `$${state.expence}`;
    today.innerHTML=`${state.today}`
    //to display in html
    var transactionEl, containerEl, amountEl, item;
    transactionsEl.innerHTML = '';
    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(item.name);
        transactionsEl.appendChild(transactionEl);
        //for getting element
        containerEl = document.createElement('div');
        amountEl = document.createElement('span');
        //checking item is income or expence
        if (item.type === 'income') {
            amountEl.classList.add('income-amt')
        } else if (item.type === 'expence') {
            amountEl.classList.add('expence-amt')
        }
        amountEl.innerHTML = `$${item.amount}`;
        containerEl.appendChild(amountEl);
        transactionEl.appendChild(containerEl);
    }

}
init();

