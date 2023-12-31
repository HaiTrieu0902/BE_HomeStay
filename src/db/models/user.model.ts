import { Association, DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/connectDB';
import { v4 as uuidv4 } from 'uuid';
import Role from './role.model';
interface UserAttributes {
    id?: string;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string | any;
    roleId?: string;
    isVerify?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: string;
    public userName!: string;
    public email!: string;
    public phoneNumber!: string;
    public password!: string;
    public roleId!: string;
    public isVerify!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Thiết lập quan hệ belongsTo với Role
    public readonly role?: Role; // Định nghĩa thuộc tính role

    public static associations: {
        role: Association<User, Role>; // Định nghĩa quan hệ với Role
    };
}

User.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
        },
        userName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        phoneNumber: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        roleId: {
            allowNull: false,
            type: DataTypes.UUID,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        isVerify: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize: connection,
        underscored: false,
    },
);

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });
export default User;
