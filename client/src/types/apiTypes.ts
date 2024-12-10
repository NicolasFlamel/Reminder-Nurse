export type IdType = string;
export type UsernameType = string;
export type NameType = string;
export type DosageType = number;
export type AmountType = number;
export type IntervalType = string;
export type SubIntervalType = string;
export type TimesType = string[];
export type QueueItemType = {
  _id: IdType;
  time: string;
  checked?: boolean;
};
export type QueueType = QueueItemType[];
export type IsActiveType = boolean;
export type UserIdType = string;

export type UserType = {
  _id: IdType;
  username: UsernameType;
};
export type MedicineType = {
  _id: IdType;
  name: NameType;
  dosage: DosageType;
  amount: AmountType;
  interval: IntervalType;
  subInterval: SubIntervalType;
  times: TimesType;
  queue: QueueType;
  isActive: IsActiveType;
  userId: UserIdType;
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
  times?: string[];
};

export type QueueInputType = {
  time: string;
};

export type MedicineQueryType = {
  medicine: MedicineType;
};

export type MedicinesQueryType = {
  medicines: MedicineType[];
};

export type MutationType = {
  addUser(username: UsernameType, password: string): AuthType;
  login(username: UsernameType, password: string): AuthType;
  addMedicine(medicine: MedicineInputType): MedicineType;
  updateMedicine(medicineId: string, medicine: MedicineInputType): MedicineType;
  toggleIsActive(medicineId: string): MedicineType;
  checkQueue(medicineId: string, queueId: string): MedicineType;
};
