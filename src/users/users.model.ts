import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface UserAttributes {
    name: string;
    email?: string;
    password: string;
    role?: string,
    createdAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'email' | 'createdAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: string;
    declare readonly createdAt: Date;
}

export const initUserModel = (sequelize: Sequelize): typeof User => {
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: { isEmail: true },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "soldier"
            },
        },
        {
            sequelize,
            tableName: 'usersProject',
            timestamps: true,
            updatedAt: false
        }
    );

    return User;
};
