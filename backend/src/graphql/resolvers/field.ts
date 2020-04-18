// Interfaces
import { iField, iCreateFieldInput, iModels } from '../../interfaces'

export default {
  Query: {
    getFieldsByModelId: (
      _: object,
      { id }: { id: string },
      { models }: { models: iModels }
    ): iField[] => models.Field.findByPk(id)
  },
  Mutation: {
    createField: (
      _: object,
      { input }: { input: iCreateFieldInput },
      { models }: { models: iModels }
    ): iField => models.Field.create({ ...input })
  }
}
