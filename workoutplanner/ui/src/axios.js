import axios from 'axios';
import {connect} from 'react-redux';


export const AuthAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/auth',
    });

