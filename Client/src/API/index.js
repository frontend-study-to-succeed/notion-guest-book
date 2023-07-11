// const API_URL = 'http://localhost:3001/api/v1';
const API_URL = 'https://port-0-notion-guest-book-kvmh2mljy8qjro.sel4.cloudtype.app/api/v1';

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
  patch: (url, body) =>
    fetch(`${API_URL}${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }),
};

export const getAllComments = () =>
  API.get('/comments')
    .then((res) => res.json())
    .then((res) => res.comments);

export const getCommentsByPage = (page = 1) =>
  API.get(`/comments/test?page=${page}`)
    .then((res) => res.json())
    .then((res) => res.comments);

export const getSingleComment = (id) =>
  API.get(`/comments/${id}`)
    .then((res) => res.json())
    .then((res) => res.comments[0]);

export const postComment = (data) =>
  API.post('/comments', JSON.stringify(data)).then((res) => res.json());

export const deleteComment = (id) => API.delete(`/comments/${id}`).then((res) => res.json());

export const compareCommentPassword = (data) =>
  API.post('/comments/compare', JSON.stringify(data))
    .then((res) => res.json())
    .then((res) => res.compare);

export const updateReaction = (id, data) =>
  API.patch(`/comments/${id}`, JSON.stringify(data)).then((res) => res.json());

export const useAPI = () => ({
  getAllComments,
  getCommentsByPage,
  getSingleComment,
  postComment,
  deleteComment,
  compareCommentPassword,
  updateReaction,
});
