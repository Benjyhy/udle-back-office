import express from 'express';
import { addRestaurant } from '../controllers/restaurantController.js';

const router = express.Router();

router.post('/restaurant', addRestaurant);

module.exports = {
    routes: router
};