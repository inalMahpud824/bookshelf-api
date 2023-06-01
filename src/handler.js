const {nanoid} = require('nanoid');
const books = require('./books');

//fungsi menambahkan data buku
const addBooksHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    const id = nanoid(15);
    const insertedAtd = new Date().toISOString();
    const updatedAt = insertedAtd;
    let finished = false;
    if(pageCount === readPage) { finished = true}
    const newBooks = {
        id, name, year, author, summary, publisher, pageCount, readPage,finished, reading, updatedAt
    }

    books.push(newBooks);

    const isSuccess = books.filter((book) => book.id === id).length > 0
    // const haveName =  books.filter((book) => book.name === name).length > 0;
    
    if(isSuccess) {
        if (name) {
            if (pageCount >= readPage) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        })
        response.code(201);
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400);
    return response
}
    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
    })
    response.code(400);
    return response
}
    const response = h.response({
        status: 'fail',
        message: 'Data gagal ditambahkan',
        dta: {
            bookId: id,
        }
    })
    response.code(500);
    return response
}

module.exports = {addBooksHandler}