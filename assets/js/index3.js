// Seleccionar los elementos del DOM
const nuevoTituloInput = document.querySelector("#title");
const nuevoAutorInput = document.querySelector("#author");
const tbody = document.querySelector("#book-list");
const btn = document.querySelector("button");
const [totalSpan, leidosSpan, pendientesSpan] = document.querySelectorAll("#stats span");

// Arreglo para almacenar los libros
const libros = [];

// Objeto para almacenar el resumen de libros
let resumen = {
    total: 0,
    leidos: 0,
    pendientes: 0
};

// Función para agregar un libro a la lista
const addLibro = (titulo, autor) => {
    const id = Math.floor(Math.random() * 999);
    const libro = {
        id,
        titulo,
        autor,
        leido: false
    };
    libros.push(libro);
};

// Función para marcar un libro como leído o no leído
const checkInput = (id) => {
    const libro = libros.find((libro) => libro.id === id);
    libro.leido = !libro.leido;
    refresh();
};

// Función para eliminar un libro de la lista
const deleteLibro = (id) => {
    const index = libros.findIndex((libro) => libro.id === id);
    libros.splice(index, 1);
    refresh();
};

const fillList = () => {
    const bookList = document.querySelector("#book-list");
    bookList.innerHTML = ""; // Limpiar la lista antes de agregar elementos

    libros.forEach(({ id, titulo, autor, leido }) => {
        const listItem = document.createElement("li");

        // Agregar contenido al elemento <li>
        listItem.innerHTML = `
            <span>${id}</span>
            <span>${titulo}</span>
            <span>${autor}</span>
            <input onchange="checkInput(${id})" ${leido ? "checked" : ""} type="checkbox"/>
            <span onclick="deleteLibro(${id})">❌</span>
        `;

        bookList.appendChild(listItem); // Agregar el elemento <li> a la lista
    });
};


// Función para actualizar la lista y el resumen
const refresh = () => {
    fillList(); // Llenar la lista en lugar de la tabla
    calculateResumen();
    updateResumen();
};

// Función para calcular el resumen de libros
const calculateResumen = () => {
    resumen.total = libros.length;
    resumen.leidos = libros.filter(({ leido }) => leido).length;
    resumen.pendientes = libros.filter(({ leido }) => !leido).length;
};

// Función para actualizar el resumen en la interfaz
const updateResumen = () => {
    const { total, leidos, pendientes } = resumen;
    totalSpan.textContent = total;
    leidosSpan.textContent = leidos;
    pendientesSpan.textContent = pendientes;
};



// Event listener para el botón de agregar libro
btn.addEventListener("click", () => {
    const nuevoTitulo = nuevoTituloInput.value.trim();
    const nuevoAutor = nuevoAutorInput.value.trim();
    if (nuevoTitulo && nuevoAutor) {
        addLibro(nuevoTitulo, nuevoAutor);
        refresh();
        nuevoTituloInput.value = "";
        nuevoAutorInput.value = "";
    } else {
        alert("Debe completar todos los campos.");
    }
});

// Llenar la tabla inicial con algunos libros predefinidos
addLibro("Cien años de soledad", "Gabriel García Márquez");
addLibro("El Señor de los Anillos", "J.R.R. Tolkien");
addLibro("Harry Potter y la Piedra Filosofal", "J.K. Rowling");
refresh();
