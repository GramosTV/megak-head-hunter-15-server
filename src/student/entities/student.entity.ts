import {BaseEntity, Column, Entity } from "typeorm";

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
    @Column({
        length: 320,
        type: "text",
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        length: 15,
        type: "tinyint",
        nullable: true,
    })
    tel: number | null;

    @Column({
        length: 256,
        type: "tinytext",
        nullable: false,
    })
    firstName: string;

    @Column({
        length: 128,
        type: "tinytext",
        nullable: false,
    })
    lastName: string;

    @Column({
        length: 39,
        type: "tinytext",
        nullable: false,
    })
    githubUsername: string;

    @Column({
        length: 2000,
        type: "text",
        nullable: true,
    })
    portfolioUrls: string | null;

    @Column({
        length: 2000,
        type: "text",
        nullable: false,
    })
    projectUrls: string;

    @Column({
        length: 250,
        type: "tinytext",
        nullable: true,
    })
    bio: string | null;

    @Column({
        length: 11,
        type: "tinytext",
        nullable: false,
    })
    expectedTypeWork: expectedTypeWork;

    @Column({
        length: 189,
        type: "tinytext",
        nullable: true,
    })
    targetWorkCity: string | null;

    @Column({
        length: 18,
        type: "tinytext",
    })
    expectedContractType: expectedContractType;

    @Column({
        length: 5,
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
        length: 2,
        type: "tinyint",
        nullable: false,
    })
    monthsOfCommercialExp: number;

    @Column({
        length: 2000,
        type: "longtext",
        nullable: true,
    })
    education: string | null;

    @Column({
        length: 2000,
        type: "longtext",
        nullable: true,
    })
    workExperience: string | null;

    @Column({
        length: 2000,
        type: "longtext",
        nullable: true,
    })
    courses: string | null;
};
