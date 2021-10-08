window.onload = function() {
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
};

// Builds the HTML Table out of myJson.
function buildHtmlTable(myJson,selector) {
  var columns = getAllColumnHeaders(myJson);
  columns.push('modify')
  columns.push('delete')
  $(selector).append('<th scope="col">Titre</th><th scope="col">Date de publication</th><th scope="col">Description</th><th scope="col">État</th><th scope="col">Éditeur</th><th scope="col">Auteur(s)</th><th scope="col">Modifier</th><th scope="col">Supprimer</th>')
  for (var i = 0; i<myJson.length; i++){
    var row$ = $('<tr/>');
    for (var j = 0; j<columns.length+2; j++){
      var cellValue = myJson[i][columns[j]];
      if(cellValue == null) {
        if(columns[j] == 'modify')
          row$.append($('<td/>').html('<button class="btn btn-primary" onclick="storeUpdateId(event);">Modifier</button>'))
        if(columns[j] == 'delete')
          row$.append($('<td/>').html('<button class="btn btn-danger" onclick="deleteBook(event);">Supprimer</button>'))
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
  axios.get('http://localhost:8081/publisher/')
    .then(response => {
      var columns = []
      columns.push('idPublisher')
      columns.push('name')
      var myJson = response.data;
      for (var i = 0; i<myJson.length; i++){
        $('#inputPublisher').append('<option value="'+myJson[i][columns[0]]+'">'+myJson[i][columns[1]]+'</option>');
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
    axios.delete('http://localhost:8081/book/'+value)
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