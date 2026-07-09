const { getAuthorsService, getAuthorsByIdService, postAuthorsService, putAuthorsService, deleteAuthorsService } = require("../services/authors_services");


const getAuthorsController = async (req, res) => {
    try {
        const authors = await getAuthorsService();
        res.status(200).json({ message: 'Autores obtenidos correctamente', authors });
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
            res.status(200).json({ message: 'Autor encontrado', author });
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
        res.status(201).json({ message: 'Autor creado correctamente', author: newAuthor });
    } catch (error) {
        console.error('Error al crear el autor:', error);
        res.status(500).json({ error: 'Error al crear el autor' });
    }
};

const putAuthorsController = async (req, res) => {
    const authorId = Number(req.params.id ?? req.body?.id);

    if (!Number.isInteger(authorId)) {
        return res.status(400).json({ error: 'El id del autor no es válido' });
    }

    try {
        const updatedAuthor = await putAuthorsService(authorId, req.body);
        if (updatedAuthor) {
            res.status(200).json({ message: 'Autor actualizado correctamente', author: updatedAuthor });
        } else {
            res.status(404).json({ error: `Autor no encontrado con id ${authorId}` });
        }
    } catch (error) {
        console.error('Error al actualizar el autor:', error);
        res.status(500).json({ error: 'Error al actualizar el autor' });
    }
};

const deleteAuthorsController = async (req, res) => {
    const authorId = req.params.id;
    try {
        const deleted = await deleteAuthorsService(authorId);
        if (deleted) {
            res.status(200).json({ message: 'Autor eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Autor no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el autor:', error);
        res.status(500).json({ error: 'Error al eliminar el autor' });
    }
};

module.exports = {
    getAuthorsController,
    getAuthorsByIdController,
    postAuthorsController,
    putAuthorsController,
    deleteAuthorsController
};