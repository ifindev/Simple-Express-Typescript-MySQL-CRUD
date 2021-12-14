// External Modules & Types
import express, { Application, Request, Response } from 'express'
import { Query, MysqlError } from 'mysql'
import cors from 'cors'

// Internal Modules & Configs
import { sql } from './src/models/db'
import Tutorial from './src/models/tutorial.model'

// Interfaces
import { ITutorialResult } from './src/interfaces/tutorial'

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

app.post('/tutorials', (req: Request, res: Response) => {
  const tutorialId = 1

  sql.query(
    'SELECT * FROM tutorials WHERE id = ?',
    [tutorialId],
    (err, result: ITutorialResult[]) => {
      if (err) throw err
      console.log(result)
    }
  )
  res.status(200).json({ message: 'Welcome to the application' })
})

app.get('/tutorials', async (req: Request, res: Response) => {
  const page: number = req.body.page
  const title: string = req.body.title

  const tutorial = new Tutorial()

  try {
    const data = await tutorial.getAllPaginated(title, page)
    const count = await tutorial.getPaginatedFullCounts(title)

    console.log(count[0][0].Count)

    const response = {
      data: data[0],
      count: count[0][0].Count,
    }

    res.status(200).json(response)
  } catch (err) {
    res.status(500).send(err)
  }
})

// require('./app/routes/tutorial.routes.js')(app)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
