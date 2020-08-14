import axios from 'axios';

export default axios.create({
  baseURL: 'https://ncds-backend.herokuapp.com/api/v1',
});
