// Interfaces
import { iValue, iCreateValueInput, iModels } from '../../interfaces'

export default {
  Mutation: {
    createValue: (
      _: any,
      { input }: { input: iCreateValueInput },
      { models }: { models: iModels }
    ): iValue => models.Value.create({ ...input })
  }
}
