import { Score } from 'types';

export interface FilterSettings {
  courseCompletion: Score | null;
  courseEngagement: Score | null;
  projectDegree: Score | null;
  teamProjectDegree: Score | null;
  expectedTypeWork:
    | 'Biuro'
    | 'Gotowy do przeprowadzki'
    | 'Zdalna'
    | 'Biuro i zdalna'
    | 'Dowolone'
    | null;
  expectedContractType:
    | 'Umowa o pracę'
    | 'B2B'
    | 'Zlecenie'
    | 'Umowa o dzieło'
    | null;
  minNetSalary: number | null;
  maxNetSalary: number | null;
  canTakeApprenticeship: boolean | null;
  monthsOfCommercialExp: number | null;
}
