async function listarLibros(){
    let response = await fetch("http://localhost:8080/api/libros", {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    });

    let json = await response.json()

    let html = ""

    json.forEach(libro => {
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
        `
    });

    document.getElementById("tablaLibros").innerHTML = html;
    
}

async function deleteLibro(id) {

    let confirmaEliminar = confirm("Desea eliminar el libro?")
    if (confirmaEliminar) {
        await fetch("http://localhost:8080/api/libros/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        listarLibros();
    }
}

async function editLibro(id){
    window.location.href = "gestionar-libro.html?" + id
}

async function listarCategorias() {
    let categorias = await getCategorias(); 
    let container = document.getElementById("categoria-container");
    container.innerHTML = "";

    categorias.forEach(categoria => {
        let buttonHtml = `
            <div class="text-right" style="display: inline-block;">
                <button onclick="cargarCategoria('${categoria}')" class="btn btn-primary btn-icon-split d-flex btn-margin">
                    <span class="text">${categoria}</span>
                </button>
            </div>
        `;
        container.innerHTML += buttonHtml;
    });
}

function getCategory(categoria){
    window.location.href = `tables.html?categoria=${categoria}`;
}

document.addEventListener('DOMContentLoaded', function() {
    listarLibros(); 
    listarCategorias();
});

