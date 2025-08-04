import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface UserAttributes {
    id?: number;
    startTime: Date;
    endTime?: Date;
    location: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'endTime'> { }

export class shift extends Model<UserAttributes> implements UserAttributes {
    declare id?: number;
    declare startTime: Date;
    declare endTime?: Date;
    declare location: string;
    declare readonly createdAt: Date;
}

export const initShiftModel = (sequelize: Sequelize): typeof shift => {
    shift.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: true,
            },
            startTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            endTime: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'shifts',
            timestamps: true,
            updatedAt: false
        }
    );

    return shift;
};
