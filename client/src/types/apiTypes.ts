export type UserType = {
  _id: string;
  username: string;
};
export type MedicineType = {
  _id: string;
  name?: string;
  dosage?: number;
  amount?: number;
  interval?: string;
  subInterval?: string;
  times?: [string];
  queue?: [QueueType];
  isActive?: boolean;
  userId: string;
};

export type QueueType = {
  _id: string;
  time: string;
  checked?: boolean;
};

export type AuthType = {
  token: string;
  user?: UserType;
};

export type MedicineInputType = {
  name?: string;
  dosage?: number;
  amount?: number;
  interval?: string;
  subInterval?: string;
  times?: [string];
};

export type QueueInputType = {
  time: string;
};

export type QueryType = {
  medicine(medicineId: string): MedicineType;
  medicines?: [MedicineType];
};

export type MutationType = {
  addUser(username: string, password: string): AuthType;
  login(username: string, password: string): AuthType;
  addMedicine(medicine: MedicineInputType): MedicineType;
  updateMedicine(medicineId: string, medicine: MedicineInputType): MedicineType;
  toggleIsActive(medicineId: string): MedicineType;
  checkQueue(medicineId: string, queueId: string): MedicineType;
};
