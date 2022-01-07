import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" }); // for local

const API = axios.create({
  baseURL: "https://sergio-al-memories-project.herokuapp.com",
}); // for producction

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

const postsURL = "/posts";
export const fetchPost = (id) => API.get(`${postsURL}/${id}`);
export const fetchPosts = (page) => API.get(`${postsURL}?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `${postsURL}/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post(postsURL, newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`${postsURL}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${postsURL}/${id}`);
export const likePost = (id) => API.patch(`${postsURL}/${id}/like-post`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
