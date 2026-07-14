const { getAuthorsService, getAuthorsByIdService, postAuthorsService, putAuthorsService, deleteAuthorsService } = require("../services/authors_services");


const getAuthorsController = async (req, res) => {
    try {
        const authors = await getAuthorsService();

        if (!authors || authors.length === 0) {
            return res.status(200).json({ status: 200, message: 'No se encontro ningun autor', data: [] });
        }

        res.status(200).json({ status: 200, message: 'Autores obtenidos correctamente', data: authors });
    } catch (error) {
        console.error('Error al obtener los autores:', error);
        res.status(500).json({ status: 500, message: 'Error al obtener los autores' });
    }
};

const getAuthorsByIdController = async (req, res) => {
    const authorId = Number(req.params.id);

    if (!Number.isInteger(authorId)) {
        return res.status(400).json({ status: 400, message: 'El id del autor no es válido' });
    }

    try {
        const author = await getAuthorsByIdService(authorId);
        if (author) {
            res.status(200).json({ status: 200, message: 'Autor encontrado', data: author });
        } else {
            res.status(404).json({ status: 404, message: 'Autor no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el autor por ID:', error);
        res.status(500).json({ status: 500, message: 'Error al obtener el autor por ID' });
    }
    
}

const postAuthorsController = async (req, res) => {
    try {
        const newAuthor = await postAuthorsService(req.body);
        res.status(201).json({ status: 201, message: 'Autor creado correctamente', data: newAuthor });
    } catch (error) {
        console.error('Error al crear el autor:', error);

        if (error.statusCode === 409) {
            return res.status(409).json({ status: 409, message: error.message });
        }

        res.status(500).json({ status: 500, message: 'Error al crear el autor' });
    }
};

const putAuthorsController = async (req, res) => {
    const authorId = Number(req.params.id ?? req.body?.id);

    if (!Number.isInteger(authorId)) {
        return res.status(400).json({ status: 400, message: 'El id del autor no es válido' });
    }

    try {
        const updatedAuthor = await putAuthorsService(authorId, req.body);
        if (updatedAuthor) {
            res.status(200).json({ status: 200, message: 'Autor actualizado correctamente', data: updatedAuthor });
        } else {
            res.status(404).json({ status: 404, message: `Autor no encontrado con id ${authorId}` });
        }
    } catch (error) {
        console.error('Error al actualizar el autor:', error);
        res.status(500).json({ status: 500, message: 'Error al actualizar el autor' });
    }
};

const deleteAuthorsController = async (req, res) => {
    const authorId = Number(req.params.id);

    if (!Number.isInteger(authorId)) {
        return res.status(400).json({ status: 400, message: 'El id del autor no es válido' });
    }

    try {
        const deleted = await deleteAuthorsService(authorId);
        if (deleted) {
            res.status(200).json({ status: 200, message: 'Autor eliminado correctamente', data: null });
        } else {
            res.status(404).json({ status: 404, error: 'Autor no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el autor:', error);
        res.status(500).json({ status: 500, message: 'Error al eliminar el autor' });
    }
};

module.exports = {
    getAuthorsController,
    getAuthorsByIdController,
    postAuthorsController,
    putAuthorsController,
    deleteAuthorsController
};