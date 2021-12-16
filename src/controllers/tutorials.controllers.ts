import { Request, Response } from 'express'
import { isEmpty } from 'lodash'

import { ITutorial } from '../interfaces/tutorial'
import Tutorial from '../models/tutorial.model'

export default class TutorialController {
  constructor() {}

  create = async (req: Request, res: Response) => {
    if (isEmpty(req.body)) {
      res.status(400).send({
        message: 'Reqeust body cannot be empty!',
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

  getAllPaginated = async (req: Request, res: Response) => {
    if (isEmpty(req.body)) {
      res.status(400).send({
        message: 'Reqeust body cannot be empty!',
      })
    }

    const { page, title }: { page: number; title: string } = req.body

    const tutorial = new Tutorial()

    if (page !== undefined && page > 0 && title !== undefined) {
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
    } else {
      res.status(400).send({
        message:
          'Failed getting the tutorials. Make sure page and title params are included in the request body. And page is larger than 0',
      })
    }
  }
}
