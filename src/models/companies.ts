import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface companiesAttributes {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  logo?: string;
  is_active?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type companiesPk = 'id';
export type companiesId = companies[companiesPk];

export type companiesOptionalAttributes =
  | 'id'
  | 'email'
  | 'phone'
  | 'address'
  | 'logo'
  | 'is_active'
  | 'created_at'
  | 'updated_at';

export type companiesCreationAttributes = Optional<
  companiesAttributes,
  companiesOptionalAttributes
>;

export class companies
  extends Model<companiesAttributes, companiesCreationAttributes>
  implements companiesAttributes
{
  id!: number;
  name!: string;
  email?: string;
  phone?: string;
  address?: string;
  logo?: string;
  is_active?: number;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof companies {
    return companies.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },

        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },

        phone: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },

        address: {
          type: DataTypes.TEXT,
          allowNull: true,
        },

        logo: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },

        is_active: {
          type: DataTypes.TINYINT,
          allowNull: true,
          defaultValue: 1,
        },

        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'companies',

        timestamps: false,

        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
