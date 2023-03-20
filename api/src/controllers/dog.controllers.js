const { Breed, Temper } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');
const {YOUR_API_KEY} = process.env;

function ordenarObjetos(propiedad, sentido, funcionOrdenamiento) {
    let llaveOrdenamiento = funcionOrdenamiento ? 
        function(objeto) {
            return funcionOrdenamiento(objeto[propiedad]);
        } : function(objeto) {
            return objeto[propiedad];
        }
    
        sentido = !sentido ? 1 : -1;

        return function (objeto1, objeto2) {
            return objeto1 = llaveOrdenamiento(objeto1), objeto2 = llaveOrdenamiento(objeto2), sentido * ((objeto1 > objeto2) - (objeto2 > objeto1));
        }
}

const getdog = (index, query, type) => {
    const breed = {
        id : 0,
        name : '',
        temperament : '',
        weight : '',
        image : {}
    };
    if(type === 'database'){
        breed.id = query[index].id;
        breed.name = query[index].name;
        breed.temperament = query[index].tempers[0].name;
        breed.weight = query[index].weight;
        breed.image = {
            'id' : query[index].id,
            'width' : 300,
            'height' : 300,
            'url' : ''
        }
    }else if(type === 'api'){
        breed.id = query.data[index].id;
        breed.name = query.data[index].name;
        breed.temperament = query.data[index].temperament;
        breed.weight = query.data[index].weight.imperial;
        breed.image = query.data[index].image;
    }
    return breed;
}

// COMPLETO

const getAllDogs =  async (req, res) =>{
    const array = [];
    try {
        const query_bd = await Breed.findAll({
            attributes : ['id','name','weight'],
            include : Temper
        });
        for(let i=0; i<query_bd.length; i++)
            array.push(getdog(i,query_bd,'database'));
        const query_api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
        for(let i=0; i<query_api.data.length; i++)
            array.push(getdog(i,query_api,'api'));
        return res.status(200).json(array);
    } catch (error) {
        res.status(404).json({error : error.message});
    }
}

// COMPLETO

const getSpecificName = async (req, res) =>{
    const array = []
    const {name_dog} = req.params;
    try {
        if(typeof name_dog != 'string')
            throw new Error('Ingresar un dato tipo string');
        if(name_dog === '') throw new Error('Busqueda vacia');
        const specifics_name_bd = await Breed.findAll({
            attributes : ['id', 'name', 'weight'],
            where: { name: { [Op.iLike] : `%${name_dog}%`}},
            include: Temper
        });
        const specifics_name_api = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name_dog}`);
        for(let i=0; i<specifics_name_bd.length; i++)
            array.push(getdog(i,specifics_name_bd,'database'));
        for(let i=0; i<specifics_name_api.data.length; i++)
            array.push(getdog(i,specifics_name_api,'api'));
        return res.status(200).json(array);
    } catch (error) {
        res.status(404).json({error : error.message});
    }
}

// COMPLETO

const getSpecificBreed = async (req, res) =>{
    const {idRaza} = req.params;
    try {
        const db = await Breed.findOne({
            attributes: ['id','name','weight','height','YearsLife'],
            where : {id : idRaza},
            include : Temper
        });
        if(db === null && idRaza.includes('2023') === false){
            const query = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
            const breed = query.data.find(c => c.id === parseInt(idRaza));
            if(breed === undefined) throw new Error(`No existe la raza con el id ${idRaza} en la API`);
            return res.status(200).json({
                id: breed.id,
                name: breed.name,
                temperament: breed.temperament,
                weight: breed.weight.imperial,
                height: breed.height.imperial,
                YearsLife: breed.life_span,
                image: breed.image
            });
        }else if(db === null)
            throw new Error('No se encontro el id en la base de datos');
        return res.status(200).json({
                id: db.id,
                name: db.name,
                temperament: db.tempers[0].name,
                weight: db.weight,
                height: db.height,
                YearsLife: db.YearsLife,
                image: {
                    'id' : db.id,
                    'width' : 300,
                    'height' : 300,
                    'url' : ''
                }
        });
    }catch (error) {
        res.status(404).json({error : error.message});
    }
}

// COMPLETO

let increment = 1;

const createBreed = async (req, res) =>{
    const {name, weight, height, YearsLife, temperaments} = req.body;
    try {
        var temperament = '';
        const new_breed = await Breed.create({
            id : '2023'+name.toLowerCase()+increment.toString(),
            name : name.toLowerCase(),
            weight : weight,
            height : height,
            YearsLife : YearsLife
        })
        if(!new_breed) throw new Error('No se pudo crear la raza');
        increment++;
        const temp = await Temper.findOne({where : {name: temperaments}});
        if( temp != null){
            await new_breed.addTempers(temp);
            temperament = temperaments;
        }else{
            const new_temperament = await Temper.create({
                name : temperaments
            })
            if(!new_temperament) throw new Error('No se pudo crear el temperamento');
            await new_breed.addTempers(new_temperament);
            temperament = new_temperament.name;
        }
        return res.status(201).json({
            id: new_breed.id,
            name : new_breed.name,
            temperament : temperament,
            weight : new_breed.weight,
            YearsLife : new_breed.YearsLife,
            image : {}
        });
    } catch (error) {
        res.status(404).json({error : error.message});
    }
}

// COMPLETO

const getTemper = async (req, res) =>{
    var s = "";
    try {
        const db = await Temper.findAll({
            attributes : ['name']
        })
        for(let i=0; i<db.length; i++)
            s += db[i].name;
        s += ", ";
        const query = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
        for(let i=0; i<query.data.length; i++)
            s += query.data[i].temperament;
        const array = s.toLowerCase().split(', ');
        const table = {}
        const not_repeat = array.filter((index)=>{
            return table.hasOwnProperty(index) ? false : (table[index] = true);
        })
        return res.status(200).json(not_repeat);
    } catch (error) {
        res.status(404).json({error : error.message});
    }
}

const sortDogs = async (req, res) =>{
    const {array, sort, type} = req.body;
    try {
        if(array.length === 0) throw new Error('Arreglo vacio');
        const valor = sort === 'ascendente' ? false : true;
        if(type === ''){
            if(sort === 'ascendente')
                return res.status(200).json(array.sort(
                    (a,b) => a.id - b.id
                ));
            else if(sort === 'descendente')
                return res.status(200).json(array.sort(
                    (a,b) => b.id - a.id
                ));
            else
                throw new Error('Error en el parametro sort')
        }else{
            const response = array.sort(ordenarObjetos(type, valor));
            return res.status(200).json(response);
        }
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

 const deleteBreed = async (req, res) =>{
    const {id_breed} = req.params;
    try {
        const db = await Breed.destroy({
            where : {
                id : id_breed
            }
        })
        if(db === null) throw new Error(`No existe la raza con el id ${id_breed} en la DB`);
        return res.status(200).json(db);
    } catch (error) {
        res.status(404).json({error : error.message})
    }
 }

module.exports = {
    getAllDogs,
    getSpecificName,
    getSpecificBreed,
    createBreed,
    getTemper,
    sortDogs,
    deleteBreed
};