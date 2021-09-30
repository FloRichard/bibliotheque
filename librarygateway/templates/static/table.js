let tableHeaders = ["First name", "Last name", "Roles"]

const createuserboardTable = (userDiv) => {
    //while (userDiv.firstChild) userDiv.removeChild(userDiv.firstChild) // Remove all children from scoreboard div (if any)
    let userboardTable = document.createElement('table') // Create the table itself
    userboardTable.className = 'userboardTable'

    let userboardTableHead = document.createElement('thead') // Creates the table header group element
    userboardTableHead.className = 'userboardTableHead'

    let userboardTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
    userboardTableHeaderRow.className = 'userboardTableHeaderRow'

    // Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
    tableHeaders.forEach(header => {
        let scoreHeader = document.createElement('th') // Creates the current header cell during a specific iteration
        scoreHeader.innerText = header
        userboardTableHeaderRow.append(scoreHeader) // Appends the current header cell to the header row
    })

    userboardTableHead.append(userboardTableHeaderRow) // Appends the header row to the table header group element
    userboardTable.append(userboardTableHead)

    let userboardTableBody = document.createElement('tbody') // Creates the table body group element
    userboardTableBody.className = "userboardTable-Body"
    console.log(userboardTable)
    userboardTable.append(userboardTableBody) // Appends the table body group element to the table
    userDiv.append(userboardTable) // Appends the table to the scoreboard div
}

// The function below will accept a single score and its index to create the global ranking
const appendScores = (user, userIndex) => {
    const userboardTable = document.querySelector('.userboardTable') // Find the table we created
    
    let userboardTableBodyRow = document.createElement('tr') // Create the current table row
    userboardTableBodyRow.className = 'userboardTableBodyRow'
    // Lines 72-85 create the 5 column cells that will be appended to the current table row
    let FirstName = document.createElement('td')
    FirstName.innerText = user.first_name

    let LastName = document.createElement('td')
    LastName.innerText = user.last_name

    let roles = document.createElement('td')
    roles.innerText = user.roles[0]

    userboardTableBodyRow.append(FirstName, LastName, roles,) // Append all 5 cells to the table row
    userboardTable.append(userboardTableBodyRow) // Append the current row to the scoreboard table body
}

const getScores = () => {
    userDiv =  document.getElementById("userboard")
   
    fetch('http://localhost:8082/auth/user/') // Fetch for all scores. The response is an array of objects that is sorted in decreasing order
    .then(res => res.json())
    .then(users => {
    createuserboardTable(userDiv) // Clears scoreboard div if it has any children nodes, creates & appends the table
    // Iterates through all the objects in the scores array and appends each one to the table body
    for (const user of users) {
        appendScores(user) // Creates and appends each row to the table body
    }
    })
}