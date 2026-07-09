const { getAuthorsService, getAuthorsByIdService, postAuthorsService } = require("../services/authors_services");


const getAuthorsController = async (req, res) => {
    try {
        const authors = await getAuthorsService();
        res.json(authors);
    } catch (error) {
        console.error('Error al obtener los autores:', error);
        res.status(500).json({ error: 'Error al obtener los autores' });
    }
};

const getAuthorsByIdController = async (req, res) => {
    const authorId = req.params.id;
    try {
        const author = await getAuthorsByIdService(authorId);
        if (author) {
            res.json(author);
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el autor por ID:', error);
        res.status(500).json({ error: 'Error al obtener el autor por ID' });
    }
    
}

const postAuthorsController = async (req, res) => {
    try {
        const newAuthor = await postAuthorsService(req.body);
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error('Error al crear el autor:', error);
        res.status(500).json({ error: 'Error al crear el autor' });
    }
};

module.exports = {
    getAuthorsController,
    getAuthorsByIdController,
    postAuthorsController
};