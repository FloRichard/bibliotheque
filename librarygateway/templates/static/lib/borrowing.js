window.onload = function() {
  getUsers();
  fillSelectUsers();
  options = {
    url: 'http://localhost:8081/borrowing/',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': sessionStorage.getItem('token')
    }
  }
  axios(options)
    .then(response => {
      buildHtmlTable(response.data, '#borrowingDataTable')
    });
};

function getUsers(){
  var x = 0;
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
      $('#storeUsers').append('<input id="length" type="text" value="'+response.data.length+'" hidden>');
      for (const user of response.data) {
        $('#storeUsers').append('<input id="'+x+'" type="text" value="'+user.id+';'+user.first_name+' '+user.last_name+'" hidden>');
        x+=1;
      }
    }).catch((error) => {
        console.log("error" + error)
        alert(error)
        window.location = 'http://localhost:8080/auth/login'
    });
}


// Builds the HTML Table out of myJson.
function buildHtmlTable(myJson,selector) {
  var columns = getAllColumnHeaders(myJson);
  columns.push('returned')
  var length = $('#length').val();
  $(selector).append('<th scope="col">Nom emprunteur</th><th scope="col">Nom Livre</th><th scope="col">Date emprunt</th><th scope="col">Date retour</th><th scope="col">Rendu</th>')
  for (var i = 0; i<myJson.length; i++){
    var row$ = $('<tr/>');
    for (var j = 0; j<columns.length+1; j++){
      var cellValue = myJson[i][columns[j]];
      if(cellValue == null) {
        if(columns[j] == 'returned'){
          row$.append($('<td/>').html('<button class="btn btn-primary" onclick="submitDeleteBorrowing(event);">Livre récupéré</button>'))
        }
      }

      else if(columns[j] == 'idBorrowing') {
        row$.append('<input value="'+cellValue+'" hidden></input>')
      }
      else if(columns[j] == 'idUser'){
        for (var k = 0; k < length; k++) {
          var value = $('#'+k).val();
          var values = value.split(';')
          if(values[0]==cellValue)
            row$.append($('<td/>').html(values[1]));
        }
      }
      else if(columns[j] == 'book'){
        row$.append($('<td/>').html(cellValue.title));
      }
      else{
        row$.append($('<td/>').html(cellValue));
      }

    }
    $(selector).append(row$);
  }
}

function getAllColumnHeaders(myJson) {
  var columnSet = [];

  for (var i = 0; i < myJson.length; i++) {
    var rowHash = myJson[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
      }
    }
  }

  return columnSet;
}

function fillSelectUsers(){
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
    .then(response => {
      for (const user of response.data) {
        $('#inputUser').append('<option value="'+user.id+'">' + user.first_name + " " + user.last_name + '</option>');
      }
    });
}

function sendSearchById(){
  var id = $('#inputUser').val();
  $('#borrowingDataTable').empty();
  options = {
    url: 'http://localhost:8081/borrowing/?byId='+id,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': sessionStorage.getItem('token')
    }
  }
  axios(options)
    .then(response => {
      buildHtmlTable(response.data, '#borrowingDataTable')
    });
}

function submitDeleteBorrowing(event){
  var row = event.target.parentNode.parentNode;
  var value = row.childNodes[0].value;
  options = {
    url: 'http://localhost:8081/borrowing/'+value,
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': sessionStorage.getItem('token')
    }
  }
  axios(options)
    .then(response => {
      window.alert("Livre rendu avec succès");
        location.reload();
      }).catch(err => {
        window.alert("Erreur lors du rendu du livre !");
      });
}