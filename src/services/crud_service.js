class crudService {
      constructor(repository) {
            this.repository = repository
      }

      async create(data) {
            try {
                  const result = await this.repository.create(data)
                  return result
            } catch (error) {
                  throw error
            }
      }
      
      async get(id) {
            try {
                  const result = await this.repository.get(id);
                  return result
            } catch (error) {
                  throw error
            }
      }

      async getAll() {
            try {
                  const result = await this.repository.getAll()
            } catch (error) {
                  throw error
            }
      }

      async update(id, data) {
            try {
                  const result = await this.repository.update(id,data)
                  return result
            } catch (error) {
                  throw error
            }
      }

      async destroy(id){
            try {
                  const result = await this.repository.destroy;
                  return result
            } catch (error) {
                  throw error
            }
      }
}

module.exports = crudService