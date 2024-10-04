

async function cargarByAutorId(autorID) {
    console.log("Cargando libros del autor:", autorID); 
    if (autorID) {
        let libros = await getByAutor(autorID); 
        console.log(libros);
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


document.addEventListener('DOMContentLoaded', async function() {   
    await listarLibros();   
    await cargarByAutorId(autorID);  
});