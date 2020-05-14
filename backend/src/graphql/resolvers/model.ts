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

      // Sorting by creation date
      data[0].fields.sort((a: any, b: any) =>
        a.createdAt > b.createdAt ? 1 : -1
      )

      return data[0]
    }
  },
  Mutation: {
    createModel: async (
      _: object,
      { input }: { input: iCreateModelInput },
      { models }: { models: iModels }
    ): Promise<iModel> => {
      const newModel = await models.Model.create({ ...input })

      const systemFields = [
        {
          modelId: newModel.id,
          fieldName: 'ID',
          identifier: 'id',
          type: 'ID',
          isHide: false,
          isMedia: false,
          isUnique: true,
          isRequired: true,
          isPrimaryKey: true,
          isSystem: true,
          description: 'The unique identifier'
        },
        {
          modelId: newModel.id,
          fieldName: 'Created At',
          identifier: 'createdAt',
          type: 'DateTime',
          isHide: true,
          isMedia: false,
          isUnique: false,
          isRequired: true,
          isPrimaryKey: false,
          isSystem: true,
          description: 'The time the record was created'
        },
        {
          modelId: newModel.id,
          fieldName: 'Updated At',
          identifier: 'updatedAt',
          type: 'DateTime',
          isHide: true,
          isMedia: false,
          isUnique: false,
          isRequired: true,
          isPrimaryKey: false,
          isSystem: true,
          description: 'The time the record was updated'
        },
        {
          modelId: newModel.id,
          fieldName: 'Status',
          identifier: 'status',
          type: 'Status',
          isHide: false,
          isMedia: false,
          isUnique: false,
          isRequired: true,
          isPrimaryKey: false,
          isSystem: true,
          description: 'The status of the record',
          defaultValue: 'draft'
        }
      ]

      // Creating system fields
      await models.Field.bulkCreate(systemFields)

      return newModel
    }
  }
}
