let tableHeaders = ["Prénom", "Nom", "Rôles", "Actions"]

const createuserboardTable = (userDiv) => {
    userDiv =  document.getElementById("userboard")
   /*  var d =  document.getElementById('userTable')
    if (d != null) {
        d.parentNode.removeChild(d)
    } */
    while (userDiv.firstChild) userDiv.removeChild(userDiv.firstChild) 
  
    let userboardTable = document.createElement('table') // Create the table itself
    userboardTable.className = 'table table-bordered'
    userboardTable.id = 'userTable'
    userboardTable.style ='margin: 2em;text-align:center;'

    let userboardTableHead = document.createElement('thead') // Creates the table header group element
   
    let userboardTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers


    // Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
    tableHeaders.forEach(header => {
        let userHeader = document.createElement('th') // Creates the current header cell during a specific iteration
        userHeader.innerText = header
        userHeader.scope = 'col'
        userboardTableHeaderRow.append(userHeader) // Appends the current header cell to the header row
    })

    userboardTableHead.append(userboardTableHeaderRow) // Appends the header row to the table header group element
    userboardTable.append(userboardTableHead)

    let userboardTableBody = document.createElement('tbody') // Creates the table body group element
    userboardTableBody.id = 'userBody'

    userboardTable.append(userboardTableBody) // Appends the table body group element to the table
    userDiv.append(userboardTable) // Appends the table to the scoreboard div
}

// The function below will accept a single score and its index to create the global ranking
const appendUsers = (user, userIndex) => {
    const userboardTableBody = document.getElementById('userBody')

    let userboardTableBodyRow = document.createElement('tr') // Create the current table row

    let FirstName = document.createElement('td')
    FirstName.innerText = user.first_name

    let LastName = document.createElement('td')
    LastName.innerText = user.last_name

    let roles = document.createElement('td')
    joinedRoles = user.roles.join()
    console.log(joinedRoles)
    roles.innerText = joinedRoles

    let action = document.createElement('td')
    
    var deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.style = 'margin-right:1em';
   // deleteBtn.id = 
    deleteBtn.onclick = function(){deleteUser(user.id); getUsers()};
    action.appendChild(deleteBtn);

    var modifyBtn = document.createElement('button');
    modifyBtn.type = 'button';
    modifyBtn.className = 'btn btn-primary';
    modifyBtn.id = user.id
    modifyBtn.textContent = 'Modifier';
    modifyBtn.onclick = function(){fillUpadteModale(user); getUsers()};
    action.appendChild(modifyBtn);

    userboardTableBodyRow.append(FirstName, LastName, roles, action) // Append all 5 cells to the table row
    userboardTableBody.append(userboardTableBodyRow) // Append the current row to the scoreboard table body
}

const getUsers = () => {
    userDiv =  document.getElementById("userboard")
   

    options = {
        url: 'http://localhost:8081/auth/users',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': sessionStorage.getItem('token'),
        },
    };

    axios(options)
    .then(response =>  {
        createuserboardTable(userDiv) 
        console.log(response.status);
        for (const user of response.data) {
            appendUsers(user) // Creates and appends each row to the table body
        }
    }).catch((error) => {
        console.log("error" + error)
        alert(error)
        window.location = 'http://localhost:8080/auth/login'
    });
}

function fillUpadteModale(user){
    $("#modalUpdateUser").modal();
    document.getElementById('firstNameUpdate').value = user.first_name
    document.getElementById('lastNameUpdate').value = user.last_name
    document.getElementById('actualRoles').value = user.roles[0]
    document.getElementById('userIDUpdate').value = user.id
}