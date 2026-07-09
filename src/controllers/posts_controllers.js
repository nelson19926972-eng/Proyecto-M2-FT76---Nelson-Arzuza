const {
  getPostsService,
  getPostByIdService,
  getPostsByAuthorService,
  postPostService,
  putPostService,
  deletePostService
} = require("../services/posts_services");

const getPostsController = async (req, res) => {
  try {
    const posts = await getPostsService();
    res.status(200).json({ status: 200, message: 'Posts obtenidos correctamente', data: posts });
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ status: 500, message: 'Error al obtener los posts' });
  }
};

const getPostByIdController = async (req, res) => {
  const postId = Number(req.params.id);

  if (!Number.isInteger(postId)) {
    return res.status(400).json({ status: 400, message: 'El id del post no es válido' });
  }

  try {
    const post = await getPostByIdService(postId);
    if (post) {
      res.status(200).json({ status: 200, message: 'Post encontrado', data: post });
    } else {
      res.status(404).json({ status: 404, message: 'Post no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el post por ID:', error);
    res.status(500).json({ status: 500, message: 'Error al obtener el post por ID' });
  }
};

const getPostsByAuthorController = async (req, res) => {
  const authorId = Number(req.params.authorId);

  if (!Number.isInteger(authorId)) {
    return res.status(400).json({ status: 400, message: 'El id del autor no es válido' });
  }

  try {
    const posts = await getPostsByAuthorService(authorId);
    if (posts.length > 0) {
      const author = {
        id: posts[0].author_id_detail,
        name: posts[0].author_name,
        email: posts[0].author_email,
        bio: posts[0].author_bio,
        created_at: posts[0].author_created_at
      };

      const formattedPosts = posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
        created_at: post.created_at
      }));

      res.status(200).json({
        status: 200,
        message: 'Posts del autor obtenidos correctamente',
        data: {
          author,
          posts: formattedPosts
        }
      });
    } else {
      res.status(404).json({ status: 404, message: 'No se encontraron posts para este autor' });
    }
  } catch (error) {
    console.error('Error al obtener los posts por autor:', error);
    res.status(500).json({ status: 500, message: 'Error al obtener los posts por autor' });
  }
};

const postPostController = async (req, res) => {
  try {
    const newPost = await postPostService(req.body);
    res.status(201).json({ status: 201, message: 'Post creado correctamente', data: newPost });
  } catch (error) {
    console.error('Error al crear el post:', error);

    if (error.statusCode === 409) {
      return res.status(409).json({ status: 409, message: error.message });
    }

    res.status(500).json({ status: 500, message: 'Error al crear el post' });
  }
};

const putPostController = async (req, res) => {
  const postId = Number(req.params.id ?? req.body?.id);

  if (!Number.isInteger(postId)) {
    return res.status(400).json({ status: 400, message: 'El id del post no es válido' });
  }

  try {
    const updatedPost = await putPostService(postId, req.body);
    if (updatedPost) {
      res.status(200).json({ status: 200, message: 'Post actualizado correctamente', data: updatedPost });
    } else {
      res.status(404).json({ status: 404, message: `Post no encontrado con id ${postId}` });
    }
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    res.status(500).json({ status: 500, message: 'Error al actualizar el post' });
  }
};

const deletePostController = async (req, res) => {
  const postId = Number(req.params.id);

  if (!Number.isInteger(postId)) {
    return res.status(400).json({ status: 400, message: 'El id del post no es válido' });
  }

  try {
    const deleted = await deletePostService(postId);
    if (deleted) {
      res.status(200).json({ status: 200, message: 'Post eliminado correctamente', data: null });
    } else {
      res.status(404).json({ status: 404, message: 'Post no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    res.status(500).json({ status: 500, message: 'Error al eliminar el post' });
  }
};

module.exports = {
  getPostsController,
  getPostByIdController,
  getPostsByAuthorController,
  postPostController,
  putPostController,
  deletePostController
};
