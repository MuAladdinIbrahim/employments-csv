import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Employment extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sex: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  indicator: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  age_group: string;

  @Column({
    type: DataType.STRING,
  })
  source: string;

  @Column({
    type: DataType.STRING,
  })
  year: string; //year

  @Column({
    type: DataType.STRING,
  })
  obs_value: string;

  @Column({
    type: DataType.STRING,
  })
  obs_status: string;

  @Column({
    type: DataType.STRING,
  })
  note_classif: string;

  @Column({
    type: DataType.STRING,
  })
  note_inicator: string;

  @Column({
    type: DataType.STRING,
  })
  note_source: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;
}
