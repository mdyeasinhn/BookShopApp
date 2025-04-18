import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

async function server() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`Book shop Server is running on ${config.port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

server()