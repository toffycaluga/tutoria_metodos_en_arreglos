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
    li.innerHTML = `
        <span>${title} por ${author}</span>
        <input type="checkbox">
        <button class="delete">Eliminar</button>
    `;
    bookList.appendChild(li);

    updateStats();

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
});

document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentNode.remove();
        updateStats();
    } else if (e.target.type === 'checkbox') {
        e.target.parentNode.classList.toggle('completed');
        updateStats();
    }
});

function updateStats() {
    const totalBooks = document.querySelectorAll('#book-list li').length;
    const readBooks = document.querySelectorAll('#book-list input[type="checkbox"]:checked').length;
    document.getElementById('total-books').textContent = totalBooks;
    document.getElementById('read-books').textContent = readBooks;
}
