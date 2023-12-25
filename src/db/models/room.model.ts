import { Association, DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/connectDB';
import { v4 as uuidv4 } from 'uuid';
import Categories from './category.model';
interface RoomAttributes {
    id?: string;
    title?: string;
    detail?: string;
    price?: number;
    area?: string | any;
    capacity?: string | number;
    description?: string;
    status?: string | any;
    categoryKey?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RoomInput extends Optional<RoomAttributes, 'id'> {}
export interface RoomOutput extends Required<RoomAttributes> {}

class Room extends Model<RoomAttributes, RoomInput> implements RoomAttributes {
    public id!: string;
    public title!: string;
    public detail!: string;
    public price!: number;
    public area?: string | any;
    public capacity?: string | number;
    public description?: string;
    public status?: string | any;
    public categoryKey?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Thiết lập quan hệ belongsTo với Role
    public readonly categories?: Categories; // Định nghĩa thuộc tính role

    public static associations: {
        categories: Association<Room, Categories>; // Định nghĩa quan hệ với Role
    };
}

Room.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        detail: {
            type: DataTypes.STRING,
        },
        price: {
            allowNull: false,
            type: DataTypes.NUMBER,
        },
        area: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        capacity: {
            allowNull: false,
            type: DataTypes.NUMBER,
        },
        description: {
            type: DataTypes.STRING,
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        categoryKey: {
            allowNull: false,
            type: DataTypes.UUID,
        },
    },
    {
        sequelize: connection,
        underscored: false,
    },
);

Room.belongsTo(Categories, { foreignKey: 'categoryKey', as: 'category' });
Categories.hasMany(Room, { foreignKey: 'categoryKey', as: 'rooms' });
export default Room;
