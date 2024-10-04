async function cargarAutores(){
    let json = await fetchAutores();
    let select = document.getElementById("listaAutores");
    select.innerHTML="";

    json.forEach(autor => {
        let opcion = document.createElement("option");
        opcion.value = autor.id;
        opcion.text = autor.nombre;
        select.appendChild(opcion);
    });
    
}

function clickCreate(){
    let libro = {
        "titulo": document.getElementById("txtTitulo").value,
        "categoria" : document.getElementById("txtCategoria").value,
        "disponible" : document.getElementById("txtDisponibilidad").value == "si",
        "autor" : {
            "id": parseInt(document.getElementById("listaAutores").value, 10)
        }
    }
    saveLibro(libro);
}

function getLibroId(){
    let auxSplit = window.location.href.split("?");
    let id = auxSplit[1];
    return id
}

async function cargarLibro(){
    if (isNew()){
        alert("Este es un libro nuevo")
        return;
    } 
    let id = getLibroId();
    let libro = await getLibroByID(id);
    document.getElementById("txtTitulo").value = libro.titulo;
    document.getElementById("txtCategoria").value = libro.categoria;
    document.getElementById("txtDisponibilidad").value = libro.disponible ? "si" : "no";
    let autorID = libro.autor.id;
    let opciones = document.getElementById("listaAutores").DOCUMENT_POSITION_DISCONNECTED;
    for (let i=0; i < opciones.length; i++){
        if (opciones[i].value === autorID.toString()){
            opciones[i].selected = true;
            break;
        }
    } 
}


async function cargarCategoria(categoria) {
    console.log("Cargando libros de la categoría:", categoria); 
    if (categoria) {
        let libros = await getByCategoria(categoria); 
        let html = "";

        libros.forEach(libro => {
            html += `
            <tr>
                <td>${libro.titulo}</td>
                <td>${libro.categoria}</td>
                <td>${libro.autor.nombre}</td>
                <td>${libro.disponible ? "si" : "no"}</td>
                <td>
                    <a href="#" onclick="editLibro(${libro.id})" class="btn btn-primary btn-icon-split">
                        <span class="text">Editar</span>
                    </a>
                    <a href="#" onclick="deleteLibro(${libro.id})" class="btn btn-danger btn-icon-split">
                        <span class="text">Eliminar</span>
                    </a>
                </td>
            </tr>
            `;
        });

        document.getElementById("tablaLibros").innerHTML = html; 
    } else {
        listarLibros();  
    }
}


function isNew(){
    let hasIdInUrl = window.location.href.includes("?");
    return !hasIdInUrl
}


document.addEventListener('DOMContentLoaded', async function() {
    await cargarAutores();    
    await cargarLibro();       
    await listarCategorias();   
    await cargarCategoria();   
});