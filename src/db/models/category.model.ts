import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/connectDB';
import { v4 as uuidv4 } from 'uuid';

interface CategoriesAttributes {
    id?: string;
    category?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CategoriesInput extends Optional<CategoriesAttributes, 'id'> {}
export interface CategoriesOutput extends Required<CategoriesAttributes> {}

class Categories extends Model<CategoriesAttributes, CategoriesInput> implements CategoriesAttributes {
    public id!: string;
    public category!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Categories.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
        },
        category: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: connection,
        underscored: false,
        modelName: 'Categories',
        tableName: 'Categories',
    },
);

export default Categories;
