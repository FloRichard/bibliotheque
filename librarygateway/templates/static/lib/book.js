window.onload = function() {
  if (!sessionStorage.getItem('roles').includes('contributor')) {
    document.getElementById("addBookBtn").disabled = true;
  }
  let params = (new URL(document.location)).searchParams;
  if(params.has("idAuthor")){
    $('#bookDataTable').empty();
    options = {
      url: 'http://localhost:8081/author/'+params.get('idAuthor')+'/books',
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': sessionStorage.getItem('token')
      }
    }
    axios(options)
      .then(response => {
        buildHtmlTable(response.data, '#bookDataTable')
    });
  }
  else if(params.has("idPublisher")){
    $('#bookDataTable').empty();
    options = {
      url: 'http://localhost:8081/publisher/'+params.get('idPublisher')+'/books',
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': sessionStorage.getItem('token')
      }
    }
    axios(options)
      .then(response => {
        buildHtmlTable(response.data, '#bookDataTable')
    });
  }
  else{
    options = {
      url: 'http://localhost:8081/book/',
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': sessionStorage.getItem('token')
      }
    }
    axios(options)
      .then(response => {
        buildHtmlTable(response.data, '#bookDataTable')
      });
  }
    fillSelectAuthors();
    fillSelectPublishers();
    fillSelectUsers();
};

// Builds the HTML Table out of myJson.
function buildHtmlTable(myJson,selector) {
  var columns = getAllColumnHeaders(myJson);
  columns.push('modify')
  columns.push('delete')
  columns.push('borrow')
  $(selector).append('<th scope="col">Titre</th><th scope="col">Date de publication</th><th scope="col">Description</th><th scope="col">État</th><th scope="col">Éditeur</th><th scope="col">Auteur(s)</th><th scope="col">Modifier</th><th scope="col">Supprimer</th><th scope="col">Emprunter</th>')
  for (var i = 0; i<myJson.length; i++){
    var row$ = $('<tr/>');
    for (var j = 0; j<columns.length+2; j++){
      var cellValue = myJson[i][columns[j]];
      if(cellValue == null) {
        if(columns[j] == 'modify'){
          if(sessionStorage.getItem('roles').includes('contributor') || sessionStorage.getItem('roles').includes('administrator'))
            row$.append($('<td/>').html('<button class="btn btn-primary" onclick="storeUpdateId(event);">Modifier</button>'))
          else
            row$.append($('<td/>').html('<button class="btn btn-primary" disabled>Modifier</button>'))
        }
        if(columns[j] == 'delete'){
          if(sessionStorage.getItem('roles').includes('contributor') || sessionStorage.getItem('roles').includes('administrator'))
            row$.append($('<td/>').html('<button class="btn btn-danger" onclick="deleteBook(event);">Supprimer</button>'))
          else
            row$.append($('<td/>').html('<button class="btn btn-danger" disabled>Supprimer</button>'))
        }
        if(columns[j] == 'borrow'){
          if(sessionStorage.getItem('roles').includes('contributor') || sessionStorage.getItem('roles').includes('administrator') || sessionStorage.getItem('roles').includes('borrow'))
            if(myJson[i]['state']==0){
              row$.append($('<td/>').html('<button class="btn btn-warning" onclick="storeBorrowId(event);">Emprunter</button>'))
            }
          else
            row$.append($('<td/>').html('<button class="btn btn-warning" disabled>Emprunter</button>'))
        }
      }

      else if(columns[j] == 'idBook'){
        row$.append('<input value="'+cellValue+'" hidden></input>')
      }

      else if(columns[j] == 'state'){
        if(cellValue == 0)
          row$.append($('<td/>').html('Disponible'));
        else if(cellValue == 1)
          row$.append($('<td/>').html('Emprunté'));
        else
          row$.append($('<td/>').html('Indisponible'));
      }

      else if(columns[j] == 'publisher') {
        row$.append($('<td/>').html(cellValue['name']));
      }

      else if(columns[j] == 'authors'){
        let res = ''
        for(var k = 0; k < cellValue.length; k++){
          res += cellValue[k]['name'];
          if(k!=cellValue.length-1)
            res+=', '
        }
        row$.append($('<td/>').html(res));
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

function sendSearchByTitle(){
  var title = $('#byTitle').val();
  $('#bookDataTable').empty();
  options = {
    url: 'http://localhost:8081/book/?byTitle='+title,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': sessionStorage.getItem('token')
    }
  }
  axios(options)
    .then(response => {
      buildHtmlTable(response.data, '#bookDataTable')
    });
}

function fillSelectAuthors(){
  options = {
    url: 'http://localhost:8081/author/',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': sessionStorage.getItem('token')
    }
  }
  axios(options)
    .then(response => {
      var columns = []
      columns.push('idAuthor')
      columns.push('name')
      var myJson = response.data;
      for (var i = 0; i<myJson.length; i++){
        $('#inputAuthors').append('<option value="'+myJson[i][columns[0]]+'">'+myJson[i][columns[1]]+'</option>');
      }
    });
}

function fillSelectPublishers(){
  options = {
    url: 'http://localhost:8081/publisher/',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': sessionStorage.getItem('token')
    }
  }
  axios(options)
    .then(response =>  {
      var columns = []
      columns.push('idPublisher')
      columns.push('name')
      var myJson = response.data;
      for (var i = 0; i<myJson.length; i++){
        $('#inputPublisher').append('<option value="'+myJson[i][columns[0]]+'">'+myJson[i][columns[1]]+'</option>');
      }
    }).catch((error) => {
        console.log("Erreur : " + error)
        alert(error)
    });
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

function submitBook(){
  var title = $('#inputTitle').val();
  var year = $('#inputYear').val();
  var description = $('#inputDescription').val();
  var optionAuthors = $('#inputAuthors').val();
  var publisher = $('#inputPublisher').val();
  options = {
    url: 'http://localhost:8081/book/',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      'Authorization': sessionStorage.getItem('token')
    },
    data:{
      title:title,
      publicationYear:year,
      description:description,
      idPublisher:publisher,
      idAuthors:optionAuthors
    }
  }
  axios(options).
    then(response => {
      window.alert("Livre ajouté avec succès");
      location.reload();
    }).catch(err => {
      window.alert("Erreur lors de l'insertion !");
    });
}

function deleteBook(event){
  var row = event.target.parentNode.parentNode;
  var value = row.childNodes[0].value;
  var r = confirm("Voulez-vous vraiment supprimer ce livre ?");
  if(r == true){
    options = {
      url: 'http://localhost:8081/book/'+value,
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': sessionStorage.getItem('token')
      }
    }
    axios(options)
      .then(response => {
        window.alert("Livre supprimé avec succès");
        location.reload();
      }).catch(err => {
        window.alert("Erreur lors de la suppression !");
      });
  }
}

var value;

function storeUpdateId(event){
  var row = event.target.parentNode.parentNode;
  value = row.childNodes[0].value;
  var title = row.childNodes[1].innerHTML;
  var year = row.childNodes[2].innerHTML
  var description = row.childNodes[3].innerHTML;
  var state = row.childNodes[4].innerHTML;
  if(state == 'Indisponible')
    $('#checkUnvailable').prop('checked', true);
  $('#updateBook').modal({'backdrop': 'static'});
  $('#inputTitleUp').val(title);
  $('#inputYearUp').val(year);
  $('#inputDescriptionUp').val(description);
}

function submitBookUpdate(){
  var title = $('#inputTitleUp').val();
  var year = $('#inputYearUp').val();
  var description = $('#inputDescriptionUp').val();
  var state = 0;
  if($('#checkUnvailable').is(':checked'))
    state=2;
  options = {
    url: 'http://localhost:8081/book/',
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      'Authorization': sessionStorage.getItem('token')
    },
    data:{
      idBook:value,
      title:title,
      publicationYear:year,
      description:description,
      state:state
    }
  }
  axios(options).
    then(response => {
      window.alert("Livre modifié avec succès");
      location.reload();
    }).catch(err => {
      window.alert("Erreur lors de la modification !");
    });
}


function storeBorrowId(event){
  var row = event.target.parentNode.parentNode;
  value = row.childNodes[0].value;
  $(function () {
    // ACTIVATION DU DATEPICKER 
      $('.datepicker').datepicker({
          clearBtn: true,
          format: "yyyy-mm-dd"
      });
  });
  $('#borrowBook').modal({'backdrop': 'static'});
}

function submitBookBorrow(){
  var dateB = $('#inputBorrowDate').val();
  var dateBString = dateB.toString() + ' 00:00:00';
  var dateR = $('#inputReturnDate').val();
  var dateRString = dateR.toString() + ' 00:00:00';
  var idUser = $('#inputUser').val();
  options = {
    url: 'http://localhost:8081/borrowing/',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      'Authorization': sessionStorage.getItem('token')
    },
    data:{
      dateBorrowing:dateBString,
      dateReturn:dateRString,
      idUser:idUser,
      idBook:value
    }
  }
  axios(options).
    then(response => {
      window.alert("Livre emprunté avec succès");
      location.reload();
    }).catch(err => {
      window.alert("Erreur lors de l'emprunt !");
    });
}