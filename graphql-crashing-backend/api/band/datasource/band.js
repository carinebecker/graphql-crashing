const { RESTDataSource } = require('apollo-datasource-rest');

class BandsAPI extends RESTDataSource {
  constructor(){
    super();
    this.baseURL = 'http://localhost:3003';
  }

  async getBands() {
    const data = await this.get('/bands');
    return data;
  }

  async getBand(id) {
    const data = await this.get(`/bands/${id}`);
    return {...data};
  }

  async addBand(band) {
    const bands = await this.get('/bands');
    
    band.id = bands[bands.length - 1].id + 1;
    await this.post('/bands', {...band});
    return ({...band});
  }

  async deleteBand(id) {
    await this.delete(`/bands/${id}`);
    return id;
  }

  async editBand(newData) {
    await this.put(`/bands/${newData.id}`, {...newData});
    return ({...newData});
  }
}

module.exports = BandsAPI