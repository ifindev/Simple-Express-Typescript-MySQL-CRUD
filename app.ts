// External Modules & Types
import express, { Request, Response } from 'express'
import cors from 'cors'

// Constants
import { constants } from './src/constants/constants'

// Routes
import { tutorialRouter } from './src/routes/routes'

// Apps
const app = express()

app.use(cors(constants.corsOptions))

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
