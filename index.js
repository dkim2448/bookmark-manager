// Creating variables
let myTabs = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"));
const tabBtn = document.getElementById("tab-btn");

// if items in localStorage, save them to tabs array
if (tabsFromLocalStorage) {
    myTabs = tabsFromLocalStorage;
    render(myTabs);
}

// pushes tabs into array when SAVE TAB button is clicked, saved in localStorage as well
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myTabs.push(tabs[0].url);
        localStorage.setItem("myTabs", JSON.stringify(myTabs));
        render(myTabs);
    })
})

// rendering tabs to show in chrome extension below buttons
function render(tabs) {
    let listItems = "";
    for (let i = 0; i < tabs.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${tabs[i]}'>
                    ${tabs[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;
}

// clears tabs when DELETE ALL is clicked
deleteBtn.addEventListener("click", function() {
    localStorage.clear();
    myTabs = [];
    render(myTabs);
})

// saves typed input into localStorage, adds it to array, and displays typed input in extension
inputBtn.addEventListener("click", function() {
    myTabs.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myTabs", JSON.stringify(myTabs));
    render(myTabs);
})