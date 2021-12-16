import express from 'express'
import TutorialController from '../controllers/tutorials.controllers'

const tutorialRouter = express.Router()
const tutorialController = new TutorialController()

tutorialRouter.post('/', tutorialController.create)

export { tutorialRouter }