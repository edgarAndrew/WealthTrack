import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const developmentURL = "http://172.22.16.1:8080/api/v1"
const productionURL = "https://personal-finance-tracker-api-ryfl.onrender.com/api/v1"

axios.defaults.baseURL = developmentURL;

axios.interceptors.request.use(async function (req) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
        return req;
    }
  return req;
});