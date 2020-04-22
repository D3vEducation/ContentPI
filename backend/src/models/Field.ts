// Interface
import { iField, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iField => {
  const Field = sequelize.define('Field', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fieldName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isMedia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isUnique: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isHide: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isSystem: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })

  return Field
}
