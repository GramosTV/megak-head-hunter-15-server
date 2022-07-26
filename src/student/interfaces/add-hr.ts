export interface AddHrSuccessResponse {
  isSuccess: true;
  email: string;
  fullName: string;
  company: string;
}

export type AddHrResponse = AddHrSuccessResponse | { isSuccess: false };
