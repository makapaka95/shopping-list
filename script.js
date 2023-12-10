const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false

function displayItems() {
    const itemsFromStorage = getItemsFromStorage()

    itemsFromStorage.forEach(item => addItemToDOM(item))
    resetUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();
    let newItem = itemInput.value;

    //Basic Validation
    if(itemInput.value === ''){
        alert('Please enter item!')
        return;
    }

    //Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode')

        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false;
    } else {
        if (checkForDuplicate(newItem)){
            alert('That item alredy exist!')
            return;
        }
    }

    addItemToDOM(newItem)
    
    addItemToStorage(newItem)
   
    itemInput.value = ''

    resetUI()
}


function addItemToDOM(item) {
    const li = document.createElement('li')
    const btn = createBtn("remove-item btn-link text-red")
    
    li.appendChild(document.createTextNode(item))
    li.appendChild(btn)
    
    //Add li to DOM
    itemList.appendChild(li)
}

function createBtn (className) {
    const btn = document.createElement('button')
    btn.className = className
    const icon = createIcon("fa-solid fa-xmark")
    btn.appendChild(icon)
    return btn;
}

function createIcon(className) {
    const i = document.createElement('i')
    i.className = className
    return i;  
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage()

    //Add new item to array
    itemsFromStorage.push(item)

    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage(){
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage;
}

function onItemClick(e) {
    if(e.target.className.includes("fa-solid fa-xmark")){
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target)
    }
}

function checkForDuplicate(item){
    const itemsFromStorage = getItemsFromStorage()

    if(itemsFromStorage.includes(item)){
        return true;
    } else {
        return false;
    }
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))

    item.classList.add('edit-mode')
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent
}

function removeItem (item){
   if(confirm('Are you sure?')) {
    //Remove from DOM
    item.remove();

    //Remove from storage
    removeItemFromStorage(item.textContent)

    resetUI();
   }
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage()

    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

    //reset to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearAll() {
    const itemList = document.getElementById('item-list')
    itemList.innerHTML = ''
    localStorage.clear()
    
    resetUI()
}

function filterItems(e) {
    e.preventDefault()
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase()

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
        
    }) 
    
}

function resetUI() {
    itemInput.value = ''

    const items = itemList.querySelectorAll('li')
    if(items.length === 0){
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }
    formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333'

    isEditMode = false;
}

function init() {
itemForm.addEventListener('submit', onAddItemSubmit)
itemList.addEventListener('click', onItemClick)
clearBtn.addEventListener('click', clearAll)
itemFilter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)

resetUI()
}

init()

