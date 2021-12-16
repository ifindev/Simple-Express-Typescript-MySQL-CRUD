// External Modules & Types
import express, { Request, Response } from 'express'
import cors from 'cors'

// Internal Modules & Configs
import { sql } from './src/models/db'
import Tutorial from './src/models/tutorial.model'

// Interfaces
import { ITutorialResult } from './src/interfaces/tutorial'

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

app.get('/tutorials', async (req: Request, res: Response) => {
  const page: number = req.body.page
  const title: string = req.body.title

  const tutorial = new Tutorial()

  try {
    const data = await tutorial.getAllPaginated(title, page)
    const count = await tutorial.getPaginatedFullCounts(title)

    const response = {
      data: data[0],
      count: count[0][0].Count,
    }

    res.status(200).json(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.use('/tutorials', tutorialRouter)

// require('./app/routes/tutorial.routes.js')(app)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
