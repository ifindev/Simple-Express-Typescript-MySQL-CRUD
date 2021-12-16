// External Modules & Types
import express, { Request, Response } from 'express'
import cors from 'cors'

// Routes
import { tutorialRouter } from './src/routes/routes'

// Apps
const app = express()

var corsOptions = {
  origin: 'http://localhost:8081, http://localhost:3000, http://localhost:3001',
}

app.use(cors(corsOptions))

// parse requrests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Homepage')
})

app.use('/tutorials', tutorialRouter)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
