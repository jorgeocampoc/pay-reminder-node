import { DataTypes } from "../config/index.js";

const baseAttributes = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4(),
    primaryKey: true,
  },
};

const optionsModel = {
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
  paranoid: true,
};

const relationOptions = (foreignKey) => ({
  foreignKey,
  onDelete: "CASCADE",
});

export { baseAttributes, optionsModel, relationOptions };
