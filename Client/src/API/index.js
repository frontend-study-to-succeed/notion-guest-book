const API_URL = 'http://localhost:3001/api/v1';

const API = {
  get: (url) => fetch(`${API_URL}${url}`, { method: 'GET' }),
  post: (url, body) =>
    fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }),
  delete: (url) => fetch(`${API_URL}${url}`, { method: 'DELETE' }),
};

export const getAllComments = () =>
  API.get('/comments')
    .then((res) => res.json())
    .then((res) => res.comments);

export const getSingleComment = (id) =>
  API.get(`/comments/${id}`)
    .then((res) => res.json())
    .then((res) => res.comments[0]);

export const postComment = (data) =>
  API.post('/comments', JSON.stringify(data)).then((res) => res.json());

export const deleteComment = (id) => API.delete(`/comments/${id}`).then((res) => res.json());
