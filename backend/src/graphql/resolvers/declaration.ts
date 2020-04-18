// Interfaces
import {
  iDeclaration,
  iCreateDeclarationInput,
  iModels
} from '../../interfaces'

export default {
  Query: {
    getDeclarations: (
      _: object,
      _args: object,
      { models }: { models: iModels }
    ): iDeclaration[] => models.Declaration.findAll()
  },
  Mutation: {
    createDeclaration: (
      _: object,
      { input }: { input: iCreateDeclarationInput },
      { models }: { models: iModels }
    ): iDeclaration => models.Declaration.create({ ...input })
  }
}
