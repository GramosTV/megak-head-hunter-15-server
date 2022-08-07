export interface AddHrSuccessResponse {
  ok: true;
  message: string;
  email: string;
  fullName: string;
  company: string;
}

export type AddHrResponse =
  | AddHrSuccessResponse
  | { ok: false; message: string };
