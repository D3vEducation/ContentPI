// Interfaces
import { iModel, iCreateModelInput, iModels } from '../../interfaces'

export default {
  Query: {
    getModels: (
      _: object,
      _args: object,
      { models }: { models: iModels }
    ): iModel[] =>
      models.Model.findAll({
        include: [
          {
            model: models.Field,
            as: 'fields'
          }
        ]
      }),
    getModel: async (
      _: object,
      { identifier }: { identifier: string },
      { models }: { models: iModels }
    ): Promise<iModel> => {
      const data = await models.Model.findAll({
        where: {
          identifier
        },
        include: [
          {
            model: models.Field,
            as: 'fields'
          }
        ]
      })

      return data[0]
    }
  },
  Mutation: {
    createModel: (
      _: object,
      { input }: { input: iCreateModelInput },
      { models }: { models: iModels }
    ): iModel => models.Model.create({ ...input })
  }
}
