import axios from 'axios'
const route = '/api/feed'

export const getOnePost = postId => axios.get(`${route}/${postId}`)

export const getPaginatedPosts = page => axios.get(`${route}/all/${page}`)

export const getPaginatedPostsByUsername = (username, page) =>
  axios.get(`${route}/${username}/${page}`)

export const addPost = text => axios.post(route, { text })

export const updatePost = (postId, text) =>
  axios.put(`${route}/${postId}`, { text })

export const deletePost = postId => axios.delete(`${route}/${postId}`)

export const like = postId => axios.put(`${route}/${postId}/like`)

export const getPaginatedLikes = (postId, page) =>
  axios.get(`${route}/${postId}/likes/${page}`)

export const addComment = (postId, text) =>
  axios.post(`${route}/${postId}/comment`, { text })

export const updateComment = (postId, commentId, text) =>
  axios.put(`${route}/${postId}/comment/${commentId}`, { text })

export const deleteComment = (postId, commentId) =>
  axios.delete(`${route}/${postId}/comment/${commentId}`)

export const getPaginatedComments = (postId, page) =>
  axios.get(`${route}/${postId}/comments/${page}`)
