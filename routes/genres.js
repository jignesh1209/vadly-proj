const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

const genress = [
    {id:1, name:'genres1', ctype:'Horror' },
    {id:2, name:'genres2', ctype:'Romentic' },
    {id:3, name:'genres3', ctype:'Action' },
    {id:4, name:'genres4', ctype:'Love' }

]

//get all genres
router.get('/',(req, res) =>{
    res.send(genress);
})

router.post('/',(req, res) =>{

    const{ valError, value } = validationGenres(req.body);
    console.log(valError);

    if(valError || valError == undefined) return res.status(400).send(valError.details[0].message);

    let genres = {
        id: genress.length + 1,
        name: req.body.name,
        ctype: req.body.type,
    };
    genress.push(genres);
    res.send(genres);
});

router.put('/:id', (req, res) => {
    const genres = genress.find(g => g.id == parseInt(req.params.id));
    if(!genres) return res.status(400).send("The genres with given id was not available!");

    const{ valError, value } = validationGenres(req.body)
    if(valError || valError == undefined) return res.status(400).send(valError.details[0].message);

     genres.name = req.body.name;
     genres.type = req.body.type;
     res.send(genres);

});

router.delete('/:id', (req, res) => {
    const genres = genress.find(g => g.id == parseInt(req.params.id));
    if(!genres) return res.status(400).send("The genres with given id was not available!");

    const index = genress.indexOf(genres);
    genress.splice(index, 1);
    res.send(genress);
})

function validationGenres(genres) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        ctype: Joi.string()
    });

    return schema.validate({name : genres.name, ctype: genres.type });
}

module.exports = router;