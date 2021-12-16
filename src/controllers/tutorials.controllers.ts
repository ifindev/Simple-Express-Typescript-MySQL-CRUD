import { Request, Response } from 'express'
import { isEmpty } from 'lodash'

import { ITutorial } from '../interfaces/tutorial'
import Tutorial from '../models/tutorial.model'

export default class TutorialController {
  constructor() {}

  create = async (req: Request, res: Response) => {
    if (isEmpty(req.body)) {
      res.status(400).send({
        message: 'Content cannot be empty!',
      })
    }

    const { title, description, published }: ITutorial = req.body

    if (title && description && published !== undefined) {
      const newTutorial: ITutorial = {
        title: title,
        description: description,
        published: published,
      }

      try {
        const tutorial = new Tutorial()
        const result = await tutorial.create(newTutorial)

        res
          .status(200)
          .send({ message: 'Success adding new tutorial!', data: result })
      } catch (err) {
        res.status(500).send({ message: 'Error creating new tutorial!' })
      }
    } else {
      res.status(400).send({
        message:
          'New tutorial must contain title, description, and published status',
      })
    }
  }
}
