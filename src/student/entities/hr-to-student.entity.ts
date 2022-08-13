import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class HrToStudent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  reservedTo: Date | null;

  //hr - student relation
  @ManyToOne((type) => User, (user) => user.hrToStudent)
  hr: User;

  @ManyToOne((type) => User, (user) => user.hrToStudent)
  student: User;
}
