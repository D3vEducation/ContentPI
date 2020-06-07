// Interfaces
import { iValue, iCreateValueInput, iModels } from '../../interfaces'
import model from './model'

export default {
  Mutation: {
    createValues: async (
      _: any,
      { input }: { input: iCreateValueInput[] },
      { models }: { models: iModels }
    ): Promise<iValue[]> => {
      const insertedValues = await models.Value.bulkCreate(input)

      return insertedValues
    }
  }
}
