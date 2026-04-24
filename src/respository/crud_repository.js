class CrudRepository {
      constructor(model) {
            this.model = model
      }

      async create(data) {
            try {
                  const createdData = await this.model.create(data);
                  return createdData
            } catch (error) {
                  throw error
            }
      }

      async get(id){
            try {
                  const data = await this.model.findByPk(id);
                  return data
            } catch (error) {
                  throw error
            }
      }

      async getAll(){
            try {
                  const data = await this.model.findAll();
                  return data;
            } catch (error) {
                  throw error
            }
      }

      async update(id,data) {
            try {
                  const updatedData = await this.model.update(data, {
                        where: {
                              id: id
                        },
                  })
                  return updatedData
            } catch (error) {
                  throw error
            }
      }

      async destroy(id){
            try {
                  const result = await this.model.destroy({
                        where: {
                              id
                        }
                  })
            } catch (error) {
                  throw error
            }
      }
}

module.exports = CrudRepository