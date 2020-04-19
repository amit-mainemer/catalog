import axios from "axios";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

axios.defaults.headers.common["x-auth-token"] = getJwt();
 
axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) alert("An unexpected error occurrred.");
  return Promise.reject(error);
});

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentAdmin() {
    try {
      const jwt = localStorage.getItem(tokenKey);
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
}

export async function login(email, password) {
  const { data } = await axios.post("http://localhost:3900/auth/admin", { email, password });
  localStorage.setItem(tokenKey, data.token);
}

export async function newBook(book){
 return axios.post('http://localhost:3900/admin/book', book);
}
export async function deleteBook(id){
 return axios.delete(`http://localhost:3900/admin/book/${id}`);
}
export async function updateBook(id, book){
 return axios.patch(`http://localhost:3900/admin/book/${id}`, book);
}


export async function newAuthor(author){
 return axios.post('http://localhost:3900/admin/author', author);
}
export async function deleteAuthor(id){
 return axios.delete(`http://localhost:3900/admin/author/${id}`);
}
export async function updateAuthor(id, author){
 return axios.patch(`http://localhost:3900/admin/author/${id}`, author);
}


export default {
  login,
  getCurrentAdmin,
  logout,
  newBook,
  deleteBook,
  updateBook,
  newAuthor,
  deleteAuthor,
  updateAuthor
};