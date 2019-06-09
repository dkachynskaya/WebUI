import config from 'config';

export const postService = {
    getAll,
    getById
};

function getAll() {
    return axios.get(`${config.apiUrl}/api/posts`).then((res)=>{
      this.setState({
        posts:res.data
      });
    }).catch((error)=>{
      alert("There is an error in API call");
    });
}

//function getById(id) {
  //  const requestOptions = { method: 'GET', headers: authHeader() };
    //return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
//}