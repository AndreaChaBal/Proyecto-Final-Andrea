$(document).ready(function () {
    var jsonToSend = {
        "accion": "CATALOGO"
    };
    $.ajax({
        url: "data/applicationLayer.php",
        type: "POST",
        data: jsonToSend,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (librosJSON) {
            var libros = "";
            for (var iC = 0; iC < librosJSON.length; iC++) {
                libros += "<div><div style= 'text-align: left; display: inline-block;'><p> <b>" + "<font color='orange'>" + "Nombre: " +
                    "</font></b>" + librosJSON[iC].nombreLibro +
                    "</br>  </p> ";
                libros += "<p> <b>" + "<font color='orange'>" + "Autor: " +
                    "</font></b>" + librosJSON[iC].autor + "</br>  </p>";
                libros += "<p> <b>" + "<font color='orange'>" + "Idioma: " +
                    "</font></b>" + librosJSON[iC].idioma + "</br>  </p>";
                libros += "<p> <b>" + "<font color='orange'>" + "Edición: " +
                    "</font></b>" + librosJSON[iC].edicion + "</br> </p> ";
                libros += "<img src= '" + librosJSON[iC].imagen + "'>";
                libros += "<p > <b>" + "<font color='orange'>" + "Precio: " +
                    "</font></b>" + "$" + librosJSON[iC].precio + ".00" + "</br> </p>";
                libros += "<input type='checkbox' name='favorite' id='favoritoCatalogo'/>" +
                    "Favoritos" + "</br>";
                libros += "<button class='botonesMas' style= 'margin: 10px; type='button'>Más información</button>";
                libros += "<div class='hiddenElement'><div style= 'text-align: left; display: inline-block;'><p> <b>" + "<font color='orange'>" + "Vendedor: " +
                    "</font></b>" + librosJSON[iC].nombreVendedor + " " + librosJSON[iC].apellidoVendedor + "</br>  </p> ";
                libros += "<p> <b>" + "<font color='orange'>" + "Correo de contracto: " + "</font></b>" + librosJSON[iC].correoVendedor + "</br> </p>" + "</div> </div>";
            }
            $("#librosJson").html(libros);
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });

    $("#bot").on("click", hacerQuery);
    $(".botonesMas").on("click", function () {
        alert("AAA");

        $(this).parent().find("div").removeClass("hiddenElement");
    });
});

function hacerQuery() {
    var valorTipoQuery = $("input[name=check]:checked").val();
    if (valorTipoQuery == "nombreLibro") {
        hacerQueryNombre();
    } else {
        hacerQueryAutor();
    }
}

function hacerQueryNombre() {
    $("#errorQuery").hide();
    var jsonToSend = {
        "nombre": $("#searchLibro").val(),
        "accion": "PORNOMBRE"
    };
    $.ajax({
        url: "data/applicationLayer.php",
        type: "POST",
        data: jsonToSend,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (librosJSON) {
            var libros = "";
            for (var iC = 0; iC < librosJSON.length; iC++) {
                libros += "<div><div style= 'text-align: left; display: inline-block;'><p> <b>" + "<font color='orange'>" + "Nombre: " +
                    "</font></b>" + librosJSON[iC].nombre +
                    "</br>  </p> ";
                libros += "<p> <b>" + "<font color='orange'>" + "Autor: " +
                    "</font></b>" + librosJSON[iC].autor + "</br>  </p>";
                libros += "<p> <b>" + "<font color='orange'>" + "Idioma: " +
                    "</font></b>" + librosJSON[iC].idioma + "</br>  </p>";
                libros += "<p> <b>" + "<font color='orange'>" + "Edición: " +
                    "</font></b>" + librosJSON[iC].edicion + "</br> </p> ";
                libros += "<p > <b>" + "<font color='orange'>" + "Precio: " +
                    "</font></b>" + "$" + librosJSON[iC].precio + ".00" + "</br> </p>";
                libros += "<input type='checkbox' name='favorite' id='favoritoCatalogo'/>" +
                    "Favoritos" + "</br>";
                libros += "<button style= 'margin: 10px;' type='button'>Más información</button>" +
                    "</div> </div>";
                libros += "<p > <b>" + "<font color='orange'>" + "Correo: " +
                    "</font></b>" + "$" + librosJSON[iC].correo + "</br> </p>";

                var jsonToSend = {
                    "correo": librosJSON[iC].correo,
                    "accion": "DATOSVENDEDOR"
                };
                $.ajax({
                    url: "data/applicationLayer.php",
                    type: "POST",
                    data: jsonToSend,
                    dataType: "json",
                    contentType: "application/x-www-form-urlencoded",
                    success: function (vendedorJSON) {
                        //Obtiene vendedorJSON.nombre y vendedorJSON.apellido, juntarlo con librosJSON[iC].correo
                    },
                    error: function (errorMessage) {
                        console.log(errorMessage);
                    }
                });
            }
            $("#librosJson").html(libros);
        },
        error: function (errorMessage) {
            $("#librosJson").html("");
            $("#errorQueryText").text(errorMessage.responseText);
            $("#errorQueryText").css("color", "#5499c7");
            $("#errorQuery").show(300);
        }
    });
}



function hacerQueryAutor() {
    $("#errorQuery").hide();
    var jsonToSend = {
        "autor": $("#searchLibro").val(),
        "accion": "PORAUTOR"
    };
    $.ajax({
        url: "data/applicationLayer.php",
        type: "POST",
        data: jsonToSend,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (librosJSON) {
            var libros = "";
            for (var iC = 0; iC < librosJSON.length; iC++) {
                libros += "<div class='" + iC + "'><div style= 'text-align: left; display: inline-block;'><p> <b>" + "<font color='orange'>" + "Nombre: " +
                    "</font></b>" + librosJSON[iC].nombre +
                    "</br>  </p> ";
                libros += "<p> <b>" + "<font color='orange'>" + "Autor: " +
                    "</font></b>" + librosJSON[iC].autor + "</br>  </p>";
                libros += "<p> <b>" + "<font color='orange'>" + "Idioma: " +
                    "</font></b>" + librosJSON[iC].idioma + "</br>  </p>";
                libros += "<p> <b>" + "<font color='orange'>" + "Edición: " +
                    "</font></b>" + librosJSON[iC].edicion + "</br> </p> ";
                libros += "<p > <b>" + "<font color='orange'>" + "Precio: " +
                    "</font></b>" + "$" + librosJSON[iC].precio + ".00" + "</br> </p>";
                libros += "<input type='checkbox' name='favorite' id='favoritoCatalogo'/>" +
                    "Favoritos" + "</br>";
                libros += "<button style= 'margin: 10px;' type='button'>Más información</button>" +
                    "</div> </div>";
                libros += "<p > <b>" + "<font color='orange'>" + "Correo: " +
                    "</font></b>" + "$" + librosJSON[iC].correo + "</br> </p>";

                var jsonToSend = {
                    "correo": librosJSON[iC].correo,
                    "accion": "DATOSVENDEDOR"
                };
                $.ajax({
                    url: "data/applicationLayer.php",
                    type: "POST",
                    data: jsonToSend,
                    dataType: "json",
                    contentType: "application/x-www-form-urlencoded",
                    success: function (vendedorJSON) {
                        //Obtiene vendedorJSON.nombre y vendedorJSON.apellido, juntarlo con librosJSON[iC].correo
                    },
                    error: function (errorMessage) {
                        console.log(errorMessage);
                    }
                });
            }
            $("#librosJson").html(libros);
        },
        error: function (errorMessage) {
            $("#librosJson").html("");
            $("#errorQueryText").text(errorMessage.responseText);
            $("#errorQueryText").css("color", "#5499c7");
            $("#errorQuery").show(300);
        }
    });
}
