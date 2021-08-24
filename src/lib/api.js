import axios from 'axios'
import { getToken } from './auth'


function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * STUDIO REQUESTS

export function getAllStudios() {
  return axios.get('/api/studios')
}

export function getSingleStudio(studioId) {
  return axios.get(`/api/studios/${studioId}`, headers())
}

export function createStudio(formData) {
  return axios.post('/api/studios', formData, headers())
}

export function editStudio(studioId, formData) {
  return axios.put(`/api/studios/${studioId}`, formData, headers())
}

export function deleteStudio(studioId) {
  return axios.delete(`/api/studios/${studioId}`, headers())
}


// * COMMENT REQUESTS

export function createComment(studioId, formData) {
  return axios.post(`/api/studios/${studioId}/comments`, formData, headers())
}

export function deleteComment(studioId, commentId) {
  return axios.delete(`/api/studios/${studioId}/comments/${commentId}`, headers())
}

// * BOOKING REQUESTS

export function createBooking(studioId, formData) {
  return axios.post(`/api/studios/${studioId}/bookings`, formData, headers())
}

export function deleteBooking(studioId, bookingId) {
  return axios.delete(`/api/studios/${studioId}/bookings/${bookingId}`, headers())
}

// * USER REQUESTS

export function registerUser(formData) {
  return axios.post('/api/register', formData)
}

export function loginUser(formData) {
  return axios.post('/api/login', formData)
}

export function studioFavourited(studioId) {
  return axios.post(`/api/studios/${studioId}/favourites`, headers(), headers())
}

export function profileUser() {
  return axios.get('/api/profile', headers())
}

export function editUser(userId, formData) {
  return axios.put(`/api/profile/${userId}`, formData, headers())
}