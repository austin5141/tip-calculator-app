// Inputs
const dollar_input = document.querySelector('.dollar-input')
const percentages = document.querySelectorAll('.percentage')
const people_input = document.querySelector('.amount-of-people')
const custom_input = document.querySelector('.custom-input')
// Grid
const grid = document.querySelector('.grid')

// Totals
const amount = document.querySelector('#amount')
const total = document.querySelector('#total')

// Default values
let percent = 0
let price = 0
let people = 0

// Reset buttons
const reset = document.querySelector('.reset-btn')

// Error txt
const bill_error = document.querySelector('.bill-error')
const percent_error = document.querySelector('.percentage-error')
const people_error = document.querySelector('.people-error')

// Dollar formatter
const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
})


// Page handler
function renderInfo(percentage, price, people) {

    // Check if the price input is above 0
    if (price > 0) {
        dollar_input.classList.remove('error')
        bill_error.innerText = ""
    } else {
        dollar_input.classList.add('error')
        bill_error.innerText = "Can't be zero"
        amount.textContent = formatter.format(0)
        total.textContent = formatter.format(0)
        reset.classList.remove('active')
    }

    // Check if a percentage is selected
    if (percentage > 0) {
        grid.classList.remove('error')
        percent_error.innerText = ""
    } else {
        grid.classList.add('error')
        percent_error.innerText = "Please select one"
        amount.textContent = formatter.format(0)
        total.textContent = formatter.format(0)
        reset.classList.remove('active')
    }
    
    // Check if the people input is above 0
    if (people > 0) {
        people_input.classList.remove('error')
        people_error.innerText = ""
    } else {
        people_input.classList.add('error')
        people_error.innerText = "Can't be zero"
        amount.textContent = formatter.format(0)
        total.textContent = formatter.format(0)
        reset.classList.remove('active')
    }
    
    // Set the totals
    if (people > 0 && price > 0 && percentage > 0) {
        let amount_per_person = percentage / 100 * price
        let total_per_person = percentage / 100 * price * people

        amount.textContent = formatter.format(amount_per_person)
        total.textContent = formatter.format(total_per_person)
        reset.classList.add('active')
    }
}


dollar_input.addEventListener('input', function(e) {
    price = e.target.value
    renderInfo(percent, price, people)
})

function setPercent(elem) {
    percent = elem.innerText.replace(/\%/g, "")
    for (i = 0; i < percentages.length; i++) {
        percentages[i].classList.remove('selected')
    }
    elem.classList.add('selected')
    renderInfo(percent, price, people)
}

custom_input.addEventListener('click', function() {
    for (i = 0; i < percentages.length; i++) {
        percentages[i].classList.remove('selected')
    }
    percent = this.value
    renderInfo(percent, price, people)
})

custom_input.addEventListener('input', function(e) {
    percent = e.target.value
    renderInfo(percent, price, people)
})


people_input.addEventListener('input', function(e) {
    people = e.target.value
    renderInfo(percent, price, people)
})

// Reset button functionality
reset.addEventListener('click', function() {
    if (this.classList.contains('active')) {
        percent = 0;
        price = 0;
        people = 0;
    
        dollar_input.value = null
    
        for (i = 0; i < percentages.length; i++) {
            percentages[i].classList.remove('selected')
        }
    
        custom_input.value = null
        people_input.value = null
        amount.textContent = formatter.format(0)
        total.textContent = formatter.format(0)
    
        people_input.classList.remove('error')
        dollar_input.classList.remove('error')
        custom_input.classList.remove('error')
    } else {
        return
    }
})