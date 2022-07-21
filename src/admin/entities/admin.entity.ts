import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    width: 255,
    type: 'text',
    nullable: false,
  })
  email: string;

  @Column({
    width: 255,
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column({
    width: 255,
    type: 'text',
    nullable: false,
  })
  firstName: string;

  @Column({
    width: 128,
    type: 'text',
    nullable: false,
  })
  lastName: string;
}
