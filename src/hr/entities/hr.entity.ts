import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Hr extends BaseEntity {
    @PrimaryColumn()
    email: string;

    @Column({
        width: 384,
        type: "text",
        nullable: false,
    })
    fullName: string;

    @Column({
        width: 160,
        type: "text",
        nullable: false,
    })
    company: string;

    @Column({
        width: 3,
        type: "tinyint",
        nullable: false,
    })
    maxReservedStudents: number;
}