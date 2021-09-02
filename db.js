import firebase from 'firebase';
import config from './config.js';

export default db = firebase.initializeApp(config.firebaseConfig);