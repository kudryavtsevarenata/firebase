import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCNaXyr3xLQ97gLprHtrOJ_QP-FcnYKK20",
    authDomain: "grosery-list-e52ca.firebaseapp.com",
    databaseURL: "https://grosery-list-e52ca-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "grosery-list-e52ca",
    storageBucket: "grosery-list-e52ca.appspot.com",
    messagingSenderId: "52863388412",
    appId: "1:52863388412:web:039d4e4f4337d9d702a579"
  };

const app = initializeApp(firebaseConfig);

// console.log(app);
const shoppingListEl = document.getElementById('shopping-list');
const database = getDatabase(app);
const thingsFromDb = ref(database, "list");
const inputField = document.getElementById('input-field');
const but = document.getElementById('add-button');

but.onclick = function(){
    let inputValue = inputField.value;
    push(thingsFromDb, inputValue);
    clearInputField();
}
function clearInputField(){
    inputField.value = "";
}
function appendItem(inputValue, inputID){
    let newEl = document.createElement("li");
    newEl.textContent = inputValue;
    newEl.id = inputID;
    newEl.addEventListener('click', function(){
        let exactLocation = ref(database, `list/${inputID}`);
        remove(exactLocation);
    });
    shoppingListEl.append(newEl);
}

onValue(thingsFromDb, function(snapshot){
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());
        clearShoppingList();
        for (let i = 0; i < itemsArray.length; ++i){
            let currentItem = itemsArray[i];
            let currentID = currentItem[0];
            let currentValue = itemsArray[i][1];
            appendItem(currentValue, currentID);
        }
    }else{
        // нет элементов
        shoppingListEl.innerHTML = "<p>А списочек-то пустой🤷‍♀️</p>";
    }
});
function clearShoppingList(){
    shoppingListEl.innerHTML = "";
}