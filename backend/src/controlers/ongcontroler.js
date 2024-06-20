const connection=require('../database/connection');
const crypto = require("crypto");
module.exports={
    async index(request,response){
const ongs= await connection('ongs').select('*');
return response.json(ongs);
},
async create(request,response){
    const {name,email,whatsapp,cidade,codigo_postal}=request.body;
    const id =crypto.RandomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
         whatsapp,
        cidade,
        codigo_postal
    })
    return response.json({id});
}
};