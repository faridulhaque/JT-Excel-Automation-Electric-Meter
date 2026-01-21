export type TUser = {
  email: string;
  password: string;
  code: string;
  id: string;
};

export type TMeterData = {
  name: string;
  user: TUser;
  meterNo: string;
  threshold: number;
  id: string
};
