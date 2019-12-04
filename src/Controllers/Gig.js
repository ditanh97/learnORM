const gigModel = require('../Models/Gig')

module.exports = {
    getGigs: (req, res) => {
    gigModel.findAll()  //return promise
    .then(gigs => {
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
    },
    addGig: (req, res) => {
        let {title, technologies, budget, description, contact_email} = req.body;
        let errors = [];
    
        //Validate fields
        if (!title) {
            errors.push({text: 'Please add a title'})
        }
        if (!technologies) {
            errors.push({text: 'Please add some technologies'})
        }
        if (!description) {
            errors.push({text: 'Please add description'})
        }
        if (!contact_email) {
            errors.push({text: 'Please add a contact email'})
        }
    
        //check for errors
        if (errors.length > 0) {
    
        } else {
            if (!budget) {
                budget = 'Unknown'
            }else {
                budget = `$ ${budget}`
            }
    
            //make lowercase and remove space after comma
            technologies = technologies.toLowerCase().replace(/, /g, ',') //regex 
    
            //insert into table
            Gig.create({
                title,
                technologies,
                budget,
                description,
                contact_email
            })
            .then(gig => {
                res.redirect('/')
            })
            .catch( err => console.log(err))
        }
    },
    searchGig:  (req,res) => {
        const {term} = req.query;
        Gig.findAll({where:  {technologies: {[Op.like]: '%'+ term + '%'}}})
        .then(gigs => console.log(res))
        .catch(err => console.log('err'))
        
    },

}