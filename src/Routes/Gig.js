const express = require('express')
const router = express.Router();
const gigController = require ('../Controllers/Gig');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

//get gig list
router.get('/', gigController.getGigs);

//add a gig
router.post('/add', gigController.addGig)

//search for gigs
router.get('/search', gigController.searchGig)


module.exports = router;
