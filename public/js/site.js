$(document).ready(function() {
  $('.commandeProduit').click(function(e) {
    e.preventDefault();
    var id = $(this).attr('id');
    if($('#form_connection').is(':hidden')) {
      $('#form_connection').show();
    }
    $('#product_id').val(id);
  })

  $('#loginForm').submit(function(e) {
    e.preventDefault();
    var params = {
      email: $('#email').val(),
      password: $('#password').val(),
      id: $('#product_id').val(),
    };
    $.ajax({
      method: "POST",
      url: "/product/add",
      data: params,
      success: (res) => {
        console.log(res);
        if(res.status === true) alert('Produit ' + res.product + ' ajouté');
        else alert("Une erreur s'est produite");
      }
    })
  })
})