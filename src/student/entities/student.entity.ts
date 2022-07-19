import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

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
export class Student {
    email: string;
    tel: number | null;
    firstName: string;
    lastName: string;
    githubUsername: string;
    portfolioUrls: string | null;
    projectUrls: string;
    bio: string | null;
    expectedTypeWork: expectedTypeWork;
    targetWorkCity: string | null;
    expectedContractType: expectedContractType;
    expectedSalary: null | number | string;
    canTakeApprenticeship: boolean;
    monthsOfCommercialExp: number;
    education: string | null;
    workExperience: string | null;
    courses: string | null;
};
