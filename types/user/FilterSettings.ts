import { ExpectedContractType, ExpectedTypeWork, Score } from 'types';

export interface FilterSettings {
  courseCompletion: Score | null;
  courseEngagement: Score | null;
  projectDegree: Score | null;
  teamProjectDegree: Score | null;
  expectedTypeWork: ExpectedTypeWork | null;
  expectedContractType: ExpectedContractType | null;
  minNetSalary: number | null;
  maxNetSalary: number | null;
  canTakeApprenticeship: boolean | null;
  monthsOfCommercialExp: number | null;
}
