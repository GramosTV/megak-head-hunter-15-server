import { BoolValues, ExpectedContractType, ExpectedTypeWork } from 'types';

export interface FilterSettings {
  courseCompletion: number | null;
  courseEngagement: number | null;
  projectDegree: number | null;
  teamProjectDegree: number | null;
  expectedTypeWork: ExpectedTypeWork | null;
  expectedContractType: ExpectedContractType | null;
  minNetSalary: number | null;
  maxNetSalary: number | null;
  canTakeApprenticeship: BoolValues | null;
  monthsOfCommercialExp: number | null;
}
