const express = require('express')
const bodyParser = require('body-parser')

const {PORT} = require('./config/server_config.js')
const apiRouter = require('./routes/api_router.js')

const app = express.Router()

const setupAndStartServer = async () => {
      
      const app = express();

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended:true}));

      app.use('/api', apiRouter)
      app.listen(PORT || 3000, () => {
            console.log(`server is running on port ${PORT}`)
      })
}

setupAndStartServer()

module.exports = {
      setupAndStartServer
}