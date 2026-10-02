import axios from 'axios';

const API = axios.create({
  baseURL: 'https://baylat-backend.onrender.com/api' || 'http://localhost:5000/api',
  withCredentials: true,
});

/* ==========================================================================
   AUTH ENDPOINTS
   ========================================================================== */
export const auth = async () => API.get('/auth');
export const getMe = async () => {
  const response = await API.get('/auth/me');
  return response.data; // Contains the user object without the password string
};
export const signup = async (data) => API.post('/auth/signup', data);
export const signin = async (data) => API.post('/auth/signin', data);
export const google = async (data) => API.post('/auth/google', data);
export const signOut = async () => API.get('/auth/signout');

/* ==========================================================================
   USER ENDPOINTS
   ========================================================================== */
export const user = async () => API.get('/user');
export const getUser = async (id) => API.get(`/user/${id}`);
export const updateUser = async (id, data) => API.put(`/user/update/${id}`, data);
export const deleteUser = async (id) => API.delete(`/user/delete/${id}`);
export const getUserListings = async (id) => API.get(`/user/listing/${id}`);

/* ==========================================================================
   LISTING ENDPOINTS
   ========================================================================== */
export const listing = async () => API.get('/listing');



/**
 * Fetch all listings (Handles optional pagination, sorting, and search filters)
 * @param {Object} [queryParams] - Optional parameters like { type: 'sale', limit: 6 }
 */
export const getAllListings = async (queryParams) => {
  const response = await API.get('/listing/all', { params: queryParams });
  return response.data; // Contains { success: true, count, totalCount, listings }
};


export const getAllListingsAdmin = async () => {
  const response = await API.get('listing/admin/all');
  return response.data; // Contains { success: true, count, totalCount, listings }
};
/**
 * Fetch a single listing by its ID
 */
export const getListing = async (id) => API.get(`/listing/${id}`);

/**
 * Create the final listing with text data and media arrays
 */
export const createListing = async (data) => API.post('/listing/create', data);

export const updateListing = async (id, data) => API.put(`/listing/update/${id}`, data);
export const deleteListing = async (id) => API.delete(`/listing/delete/${id}`);

/* ==========================================================================
   MEDIA ENDPOINTS (Images, Videos & Cloudinary Uploads)
   ========================================================================== */
/**
 * Upload a single media file (Image or Video) to Cloudinary via backend file-upload pipeline
 * @param {File} file - The raw file object from the HTML input
 * @returns {Promise<string>} The secure Cloudinary URL string
 */
export const uploadMediaFile = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = await API.post('image/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Required for raw file processing
    },
  });

  return response.data.images; // Returns the Cloudinary URL
};

// Raw direct endpoints for fallback or specific custom route handling
export const image = async () => API.get('/image');
export const uploadImage = async (data) => API.post('/image/upload', data);
export const deleteImage = async (id) => API.delete('/image/delete/${id}');

export const video = async () => API.get('/video');
export const getAllVideos = async () => API.get('/video/all');
export const uploadVideo = async (data) => API.post('/video/upload', data);
export const deleteVideo = async (id) => API.delete('/video/delete/${id}');

/* ==========================================================================
   MAIL ENDPOINTS
   ========================================================================== */
export const mail = async () => API.get('/mail');

export default API;
