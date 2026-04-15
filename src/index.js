const express = require('express')
const bodyParser = require('body-parser')

const {PORT, SYNC_DB} = require('./config/server_config.js')
const apiRouter = require('./routes/api_router.js')
const db = require('./models/index.js')

const setupAndStartServer = async () => {
      
      const app = express();

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended:true}));

      if(SYNC_DB){
            await db.sequelize.sync({ alter: true })
      }

      app.use('/api', apiRouter)
      app.listen(PORT || 3000, () => {
            console.log(`server is running on port ${PORT}`)
      })
}

setupAndStartServer()

module.exports = {
      setupAndStartServer
} 