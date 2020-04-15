// Interfaces
import { iApp, iCreateAppInput, iModels } from '../../interfaces'

export default {
  Query: {
    getApps: (
      _: object,
      _args: object,
      { models }: { models: iModels }
    ): iApp[] => models.App.findAll(),
    getAppById: (
      _: object,
      { id }: { id: string },
      { models }: { models: iModels }
    ): iApp => models.App.findByPk(id)
  },
  Mutation: {
    createApp: (
      _: object,
      { input }: { input: iCreateAppInput },
      { models }: { models: iModels }
    ): iApp => models.App.create({ ...input })
  }
}
