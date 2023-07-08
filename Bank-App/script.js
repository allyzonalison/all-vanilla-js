'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Aira Claveria',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//DISPLAYING THE MOVEMENTS
const displayMovements = function(movements, sort = false) {

  const movs = sort ? movements.slice().sort((a,b) => a-b) : movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

};

displayMovements(account1.movements);


//LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUSD = 1.1;

const movUSD = movements.map((mov) => {return Math.trunc(mov * euroToUSD)});

console.log(`MAP METHOD: ${movUSD}`);

const displayBalance = function(kanino) {

  labelBalance.innerHTML = ' €';

  const total_balance = kanino.reduce(function(acc, cur) {
    return acc + cur;
  }, 0);

  labelBalance.insertAdjacentHTML('beforeend', total_balance);
};

displayBalance(account1.movements);


const accountOwners = [account1.owner, account2.owner, account3.owner, account4.owner];

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
      acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');   
  });
};
createUsernames(accounts);

const updateUI = function(acc) {
      //Display movements
      displayMovements(acc.movements);
      //Display balance
      displayBalance(acc.movements);
      //Display summary
      display_summary(acc);
}

//Event Handler function
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  //this prevent form from submitting
  e.preventDefault();
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if(currentAccount.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message  
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    updateUI(currentAccount);
  }
});



console.log(`CHAINING METHODS`);


//TOTAL AMOUNT OF DEPOSITS
const display_summary = function(acc) {

  const incomes = acc.movements
.filter(mov => mov > 0)
.map(mov => mov * euroToUSD)
.reduce((acc, mov) => acc + mov, 0);

const outcomes = acc.movements
.filter(mov => mov < 0)
.reduce((acc, mov) => acc + mov, 0);

const interest = acc.movements
.filter(mov => mov > 0)
.map(deposit => deposit * acc.interestRate / 100)
.reduce((acc, int) => acc + int, 0);

labelSumIn.textContent = `€${Math.trunc(incomes)}`;
labelSumOut.textContent = `€${Math.trunc(Math.abs(outcomes))}`;
labelSumInterest.textContent = `€${Math.trunc(interest)}`;
}

//TRANSFER MONEY FEATURE
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  console.log(amount, receiverAcc);
});


//REQUESTING LOAN
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

    //add this to the array
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});


btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    //deleting an object in an array
    accounts.splice(index, 1);

    //hiding the UI / LOGOUT
    containerApp.style.opacity = 0;
  }
});


//FINDING THE OVERALL BALANCE, flat() method application
const overall_balance = accounts.map(acc => acc.movements).flat().reduce((acc, curr) => acc + curr, 0);
console.log(`OVERALL BALANCE ${overall_balance}`);


let sorted = false;
//SORTING EVENT BUTTON
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  //intindihin bukas to
  sorted = !sorted;
});

//we can also generate
const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length: 7}, function(curr, index) {
  return index + 1;
});
console.log(z);

const random_hundred = Array.from({length: 100}, function() {
  return Math.trunc(Math.random() * 100);
});
console.log(random_hundred);

const random_two = Array.from({length: 100}, () => Math.trunc(Math.random() * 100));
console.log(random_two);

console.log(`----------ARRAY METHODS PRACTICE----------`);

//1
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(function(mov) {
  return mov > 0;
}).reduce((acc, mov) => acc + mov, 0);
 
console.log(`TOTAL DEPOSITS: ${bankDepositSum}`);

//2
const atleast_1000 = accounts.flatMap(acc => acc.movements).reduce(function(acc, curr) {
  return curr >= 1000 ? ++acc : acc;
}, 0);
console.log(`DEPOSITS WITH ATLEAST 1K: ${atleast_1000}`);

//3 - more advance case - MY OWN CODE
const deposits = accounts.flatMap(acc => acc.movements).filter(mov => mov > 1).reduce((acc, curr) => acc + curr, 0);
const withdrawls = accounts.flatMap(acc => acc.movements).filter(mov => mov < 1).reduce((acc,curr) => acc + curr, 0);

const creating_the_object = function(object_name, property_value1, property2) {
  object_name = new Object();
  object_name.deposit_sum = property_value1;
  object_name.withdrawals_sum = property2;

  console.log(object_name);
}

creating_the_object('my_object', deposits, withdrawls);


//3 - using reduce(), creating an object with the sum of deps and withds
const sums = accounts.flatMap(acc => acc.movements).reduce(function(acc, curr) {
  curr > 0 ? acc.deposit += curr : acc.withdrawal += curr;
  return acc;
}, {deposit: 0, withdrawal: 0});

console.log(sums);

const {deposit, withdrawal} = sums;
console.log(deposit, withdrawal);

//4


//FINAL CODING CHALLENGE

//1
const dogs = [
  {weight: 22, curFood: 250, owners: ['Alice', 'Bob']},
  {weight: 8, curFood: 200, owners: ['Matilda']},
  {weight: 13, curFood: 273, owners: ['Sarah', 'John']},
  {weight: 32, curFood: 340, owners: ['Michael']},
];

for(const dog of dogs) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
  console.log(`${dog.weight}kg | ${dog.recommendedFood}grams`);
}

//2
//console.loggin the object with .owners == 'Sarah' 
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);

console.log(dogSarah.curFood > dogSarah.recommendedFood ? 'Eats too much' : 'Eats too little');

//3
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recommendedFood).flatMap(i => i.owners).join(' and ');
const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recommendedFood).flatMap(i => i.owners).join(' and ');

//4
console.log(`${ownersEatTooMuch}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle}'s dogs eat too little!`);

//5
const is_there = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(`SOME METHOD: ${is_there}`);

//6
const check_eatingOkay =function(dog) {
  return dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)
}
console.log(dogs.some(check_eatingOkay));

//7 - an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition in 6)
const filtered = dogs.filter(check_eatingOkay); 
console.log(filtered);

//8
const dogs_rec_foods = dogs.flatMap(dog => dog.recommendedFood);
const dogs_asc = dogs_rec_foods.sort((a,b) => a-b);
const dogs_desc = dogs_rec_foods.sort((a,b) => b-a);
console.log(`AS: ${dogs_asc}`);
console.log(`DESC: ${dogs_desc}`);

//sorting the whole objects via recommendedFood value
const dogsAsc = dogs.slice().sort((a,b) => a.recommendedFood - b.recommendedFood);
console.log(dogsAsc);
const dogDesc = dogs.slice().sort((a,b) => b.recommendedFood - a.recommendedFood);
console.log(dogDesc);

//NICE DONE SECTION 11