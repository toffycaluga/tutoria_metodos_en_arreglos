document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    if (title === '' || author === '') {
        alert('Por favor complete todos los campos.');
        return;
    }

    const bookList = document.getElementById('book-list');
    const li = document.createElement('li');
    li.textContent = `${title} por ${author}`;
    li.appendChild(createDeleteButton());
    li.appendChild(createToggleButton());
    bookList.appendChild(li);

    updateStats();

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
});

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete')
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = function (e) {
        e.target.parentNode.remove();
        updateStats();
    };
    return deleteButton;
}

function createToggleButton() {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Marcar como leído';
    toggleButton.onclick = function (e) {
        e.target.parentNode.classList.toggle('completed');
        updateStats();
    };
    return toggleButton;
}

function updateStats() {
    const totalBooks = document.querySelectorAll('#book-list li').length;
    const readBooks = document.querySelectorAll('#book-list .completed').length;
    document.getElementById('total-books').textContent = totalBooks;
    document.getElementById('read-books').textContent = readBooks;
}
