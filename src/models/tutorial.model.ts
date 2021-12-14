// Modules
import { OkPacket } from 'mysql'
import { sql } from './db'

// Interfaces & Constants
import {
  ITutorial,
  ITutorialResult,
  ITutorialResultWithCount,
} from '../interfaces/tutorial'
import { constants } from '../constants/constants'

// Tutorial Class
export default class Tutorial {
  constructor() {}

  create = (newTutorial: ITutorial): Promise<OkPacket> => {
    return new Promise((resolve, reject) => {
      sql.query(
        `CALL SpInsertTutorial(?,?,?)`,
        Object.values(newTutorial),
        (err, res: OkPacket) => {
          if (err) reject("Error! Inserted fields doesn't match table fields")
          resolve(res)
        }
      )
    })
  }

  findById = (id: number): Promise<ITutorialResult[]> => {
    return new Promise((resolve, reject) => {
      sql.query(
        `SELECT * FROM tutorials WHERE id = ${id}`,
        (err, res: ITutorialResult[]) => {
          if (err) reject('Error! Failed get data by id')
          resolve(res)
        }
      )
    })
  }

  getAllPaginated = async (
    title: string,
    page: number
  ): Promise<[ITutorialResult[], OkPacket]> => {
    const offset = page <= 0 ? 0 : (page - 1) * constants.RECORD_NUMBER_PER_PAGE
    const limit = constants.RECORD_NUMBER_PER_PAGE
    const statementType = 'get_data'

    const query = `CALL SpGetTutorials(?,?,?,?);`
    return new Promise((resolve, reject) => {
      sql.query(
        query,
        [title, offset, limit, statementType],
        (err, res: [ITutorialResult[], OkPacket]) => {
          if (err) reject('Error! Failed get paginated data')
          resolve(res)
        }
      )
    })
  }

  getPaginatedFullCounts = async (
    title: string
  ): Promise<[{ Count: number }[], OkPacket]> => {
    const statementType = 'get_count'
    const query = `CALL SpGetTutorials(?,?,?,?)`
    return new Promise((resolve, reject) => {
      sql.query(
        query,
        [title, 0, 0, statementType],
        (err, res: [{ Count: number }[], OkPacket]) => {
          if (err) reject('Error! Failed get data by id')
          resolve(res)
        }
      )
    })
  }
}
