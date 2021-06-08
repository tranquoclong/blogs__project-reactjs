import axios from 'axios';

const baseURL = 'http://learning-reactjs.xyz/wp-api/wp-json/';

export const api = {
  call: () => {
    // Gọi những API Public (Không cần truyền token)
    return axios.create({
      baseURL,
    });
  },
  callWithAuth: () => {
    // Gọi những API Private (Phải truyền token vào headers)
    return axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ` + localStorage.getItem('access_token')
      }
    })
  }
}
