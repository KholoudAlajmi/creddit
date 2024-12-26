  import instance from "./index.js"


      export const fetchData = async () =>{
      const response = await instance.get('https://api-creddit.eapi.joincoded.com/posts');
      return response.data;
      }

 


  

export const getCredditById = async (id) => {
    const response = await instance.get(`https://api-creddit.eapi.joincoded.com/posts/${id}`);
    return response.data;
}      




export const createCreddit = async (data) => {
    const response = await instance.post("https://api-creddit.eapi.joincoded.com/posts", data);
    return response.data;
}  


export const deleteCreddit = async (id) => {
    const response = await instance.delete(`https://api-creddit.eapi.joincoded.com/posts/${id}`);
    return response.data;
}        


export const createComment = async (id, data) => {
    const response = await instance.post(`https://api-creddit.eapi.joincoded.com/posts/${id}/comments`, data);
    return response.data;
}  


export const deleteComment = async (id) => {
    const response = await instance.delete(`https://api-creddit.eapi.joincoded.com/posts/comments/${id}`);
    return response.data;
}  





