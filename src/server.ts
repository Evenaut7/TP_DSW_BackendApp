import app from './app.js'
import { config } from './shared/config.js'
import { syncSchema } from './shared/db/orm.js'

try {
  await syncSchema() 
  
  app.listen(config.server.port, () => {
    console.log(`Server is running on http://localhost:${config.server.port}/`)
  })
} catch (error) {
  console.error('Error starting server:', error)
  process.exit(1)
}