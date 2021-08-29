'use strict';

import firebase from '../db.js';
import Restaurant from '../models/restaurant.js'

const firestore = firebase.firestore();

const addRestaurant = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('restaurants').doc().set(data);
        res.send('record saved successfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export default addRestaurant;