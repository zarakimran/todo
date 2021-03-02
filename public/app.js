
var list = document.getElementById("list");


firebase.database().ref('Task').on('child_added' , function(data){


    // create li tag with text node
    var li = document.createElement('li')
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)

    // create delete button
    var delBtn = document.createElement("button")
    var delText = document.createTextNode("DELETE")
    delBtn.setAttribute("class", "btn")
    delBtn.setAttribute('id' , data.val().key)
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delText)

    // create edit button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT")
    editBtn.appendChild(editText)
    editBtn.setAttribute("class", "btn")
    editBtn.setAttribute('id' , data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)")

    



    li.appendChild(delBtn)
    li.appendChild(editBtn)
    
    list.appendChild(li)
    
    
   

})

function addTodo() {
    var todo_item = document.getElementById("todo-item");

    var key = firebase.database().ref('Task').push().key;

    var todo = {
        value: todo_item.value,
        key: key
    }

    firebase.database().ref('Task').child(key).set(todo)



    

    todo_item.value = ""
}

function deleteItem(e) {
    firebase.database().ref('Task').child(e.id).remove();
    e.parentNode.remove()
}

function editItem(e) {
    
  var val = prompt("Enter updated value",e.parentNode.firstChild.nodeValue)
  var editTodo = {
      value: val,
      key: e.id
  }

  firebase.database().ref('Task').child(e.id).set(editTodo)
  e.parentNode.firstChild.nodeValue = val;
}

function deleteAll() {
    firebase.database().ref('Task').remove()
    list.innerHTML = ""
}