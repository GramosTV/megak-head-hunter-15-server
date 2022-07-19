import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

enum expectedTypeWork {
    Local,
    ReadyToMove,
    Remote,
    Hybrid,
    All,
};

enum expectedContractType {
    EmploymentContract,
    B2B,
    CommisionContract,
    NoPreferences,
};

@Entity()
export class Student extends BaseEntity {
    @PrimaryColumn({
        width: 320,
        type: "text",
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        width: 15,
        type: "tinyint",
        nullable: true,
    })
    tel: number | null;

    @Column({
        width: 256,
        type: "tinytext",
        nullable: false,
    })
    firstName: string;

    @Column({
        width: 128,
        type: "tinytext",
        nullable: false,
    })
    lastName: string;

    @Column({
        width: 39,
        type: "tinytext",
        nullable: false,
    })
    githubUsername: string;

    @Column({
        width: 2000,
        type: "text",
        nullable: true,
    })
    portfolioUrls: string | null;

    @Column({
        width: 2000,
        type: "text",
        nullable: false,
    })
    projectUrls: string;

    @Column({
        width: 250,
        type: "tinytext",
        nullable: true,
    })
    bio: string | null;

    @Column({
        width: 11,
        type: "tinytext",
        nullable: false,
    })
    expectedTypeWork: expectedTypeWork;

    @Column({
        width: 189,
        type: "tinytext",
        nullable: true,
    })
    targetWorkCity: string | null;

    @Column({
        width: 18,
        type: "tinytext",
    })
    expectedContractType: expectedContractType;

    @Column({
        width: 5,
        type: "tinyint",
        nullable: true,
    })
    expectedSalary: null | number;

    @Column({
        default: false,
        type: "boolean",
        nullable: false,
    })
    canTakeApprenticeship: boolean;

    @Column({
        width: 2,
        type: "tinyint",
        nullable: false,
    })
    monthsOfCommercialExp: number;

    @Column({
        width: 2000,
        type: "longtext",
        nullable: true,
    })
    education: string | null;

    @Column({
        width: 2000,
        type: "longtext",
        nullable: true,
    })
    workExperience: string | null;

    @Column({
        width: 2000,
        type: "longtext",
        nullable: true,
    })
    courses: string | null;
};
