import menuArray from "./data.js"

const paymentModal = document.getElementById('payment-modal')
const paymentForm = document.getElementById('payment-form')

let myOrder = []

document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        handleAddItemBtnClick(e.target.dataset.add)
    }
    else if (e.target.dataset.remove) {
        handleRemoveItemBtnClick(e.target.dataset.remove)
    }
    else if (e.target.id === "complete-order-btn") {
        paymentModal.style.display ='block'
    }
})

function handleAddItemBtnClick(itemId) {
    const targetItemObj = menuArray.filter(function(menuItem){
        return menuItem.id === Number(itemId)
    })[0]
    myOrder.push(targetItemObj)
    render()
}

function handleRemoveItemBtnClick(itemId) {
    myOrder.splice(itemId, 1)
    render()
}

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('fullName')

    getMessage(fullName)

    myOrder = []
    paymentForm.reset()
    paymentModal.style.display = 'none'
})

function getTotalPrice() {
    const totalPrice = myOrder.reduce((total, currentItem) => total + currentItem.price, 0)
    return totalPrice
}

function getMessage(name) {
    document.getElementById('order-container').innerHTML = `
    <div class="message-container">
        <h3 id="order-message"></h3>
    </div>
    `
    document.getElementById('order-message').textContent = `Thanks, ${name}! Your order is on its way!`
}

function getMenuHtml(menuItems) {
    return menuItems.map( menuItem => {
        const { 
            name, 
            ingredients, 
            price, 
            emoji, 
            id
        } = menuItem
        return `
            <div class="menu-item">
                <p class="icon">${emoji}<p>
                <div>
                    <h3>${name}</h3>
                    <p class="ingredients">${ingredients.join(', ')}</p>
                    <h4 class="menu-price">$${price}</h4>
                </div>
                <button class="add-btn align-right" data-add="${id}">+</button>
            </div>
        `
    }).join('')
}

function getOrderHtml(){
    return myOrder.map( (orderItem, index) => 
        `
            <div class="order-item">
                <h3>${orderItem.name}</h3>
                <button class="remove-btn" data-remove="${index}">remove</button>
                <h4 class="align-right">$${orderItem.price}</h4>
            </div>
        `
    ).join('')
}

document.getElementById('menu-container').innerHTML = getMenuHtml(menuArray)

function render() {
    if (myOrder.length === 0) {
        document.getElementById('order-container').innerHTML = ''
    }
    else {
        document.getElementById('order-container').innerHTML = `
            <h3 class="order-title">Your order</h3>
            <div class="order-items">
                ${getOrderHtml()}
            </div>
            <h3 class="total-price">Total price: <span class="align-right order-price">$${getTotalPrice()}</span></h3>
            <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
        `
    }
}