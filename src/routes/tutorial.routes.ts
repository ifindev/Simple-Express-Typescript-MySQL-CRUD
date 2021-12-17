import express from 'express'
import TutorialController from '../controllers/tutorials.controllers'

const tutorialRouter = express.Router()
const tutorialController = new TutorialController()

tutorialRouter.post('/', tutorialController.create)
tutorialRouter.get('/', tutorialController.getAllPaginated)
tutorialRouter.get('/:id', tutorialController.getTutorialById)

export { tutorialRouter }
