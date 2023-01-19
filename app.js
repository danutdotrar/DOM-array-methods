const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Put all of the people
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


// Fetch random user and add money

// Make function async
async function getRandomUser() {
    // Store result from fetch req into a variable
    // 'fetch' is asynchronous, so we need to await to finish
    const res = await fetch('https://randomuser.me/api');

    // Get the data by calling res.json()
    // This will return a promise so we need to await
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: `${Math.floor(Math.random() * 1000000)}`
    }

    addData(newUser)
}

// Add new object to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    // Output a new element for each items
    providedData.forEach(item => {
        const element = document.createElement('div');

        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;

        main.appendChild(element);
    });
}

// Format number as money
function formatMoney(number) {
    return '$' + Number(number).toLocaleString();
}

// Double everyones money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2};
    });
    
    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a,b) => b.money - a.money);

    updateDOM();
}

// Filter only millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 999999);

    updateDOM();
}

// Calculate all users wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += +user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

    main.appendChild(wealthEl);
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);



