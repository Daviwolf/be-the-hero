const connection = require('../database/connection');
const {
  index
} = require('./ongcontroler');

module.exports = {
  async index(request, response) {
    const {
      page = 1
    } = request.query;

    const [count] = await connection('incidents')
      .count();
    console.log(count);

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ongid')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'ongs.name', 'ongs.email','ongs.whatsapp' ,'ongs.cidade', 'ongs.codigo_postal']);

    response.header('Total-Count', count['count(*)'])

    return response.json(incidents);
  },
  async delete(request, response) {
    const {
      id
    } = request.params;
    const ongid = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('id', id)
      .select('ongid')
      .first();

    if (incidents.ongid != ongid) {
      return response.status(401).json({
        error: 'Operação nao prmitida'
      });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  },

  async create(request, response) {
    const {
      title,
      descrition,
      value
    } = request.body;
    const ongid = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      descrition,
      value,
      ongid
    });
    return response.json({
      id
    });


  }
};