window.onload = function() {
  axios.get('http://localhost:8081/author/')
    .then(response => {
      buildHtmlTable(response.data, '#authorDataTable')
    });
};

// Builds the HTML Table out of myJson.
function buildHtmlTable(myJson,selector) {
  var columns = getAllColumnHeaders(myJson);
  columns.push('modify')
  columns.push('delete')
  $(selector).append('<th scope="col">Nom auteur</th><th scope="col">Modifier</th><th scope="col">Supprimer</th>')
  for (var i = 0; i<myJson.length; i++){
    var row$ = $('<tr/>');
    for (var j = 0; j<columns.length+2; j++){
      var cellValue = myJson[i][columns[j]];
      if(cellValue == null) {
        if(columns[j] == 'modify')
          row$.append($('<td/>').html('<button class="btn btn-primary" onclick="storeUpdateId(event);">Modifier</button>'))
        if(columns[j] == 'delete')
          row$.append($('<td/>').html('<button class="btn btn-danger" onclick="deleteAuthor(event);">Supprimer</button>'))
      }

      else if(columns[j] == 'idAuthor'){
        row$.append('<input value="'+cellValue+'" hidden></input>')
      }
      else{
        row$.append($('<td/>').html('<a href="#" onclick="getBooksFromAuthor(event)">'+cellValue+'</a>'));
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

function sendSearchByName(){
  var name = $('#byName').val();
  $('#authorDataTable').empty();
  axios.get('http://localhost:8081/author/?byName='+name)
    .then(response => {
      buildHtmlTable(response.data, '#authorDataTable')
    });
}

function submitAuthor(){
  var name = $('#inputName').val();
  options = {
    url: 'http://localhost:8081/author/',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      'Authorization': sessionStorage.getItem('token')
    },
    data:{
      name:name
    }
  }
  axios(options).
    then(response => {
      window.alert("Auteur ajouté avec succès");
      location.reload();
    }).catch(err => {
      window.alert("Erreur lors de l'insertion !");
    });
}

function deleteAuthor(event){
  var row = event.target.parentNode.parentNode;
  var value = row.childNodes[0].value;
  var r = confirm("Voulez-vous vraiment supprimer cet auteur ?");
  if(r == true){
    axios.delete('http://localhost:8081/author/'+value)
      .then(response => {
        window.alert("Auteur supprimé avec succès");
        location.reload();
      }).catch(err => {
        window.alert("Erreur lors de la suppression ! L'auteur a peut être encore des livres !");
      });
  }
}

var value;

function storeUpdateId(event){
  var row = event.target.parentNode.parentNode;
  value = row.childNodes[0].value;
  var name = row.childNodes[1].innerHTML;
  $('#updateAuthor').modal({'backdrop': 'static'});
  $('#inputNameUp').val(name);
}

function submitAuthorUpdate(){
  var name = $('#inputNameUp').val();
  options = {
    url: 'http://localhost:8081/author/',
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      'Authorization': sessionStorage.getItem('token')
    },
    data:{
      idAuthor:value,
      name:name
    }
  }
  axios(options).
    then(response => {
      window.alert("Auteur modifié avec succès");
      location.reload();
    }).catch(err => {
      window.alert("Erreur lors de la modification !");
    });
}

function getBooksFromAuthor(event){
  var row = event.target.parentNode.parentNode;
  value = row.childNodes[0].value;
  document.location.href='../book/book.html?idAuthor='+value;
}