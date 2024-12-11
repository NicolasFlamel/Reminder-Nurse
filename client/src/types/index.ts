import { ChangeEvent } from 'react';
import { MedicineType, QueueItemType } from './apiTypes';

export * from './apiTypes';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type AccessType = {
  loggedIn: boolean;
  setLoggedIn: SetState<boolean>;
};
export interface CurrentMedicine extends MedicineType {
  current: QueueItemType;
}

// react-bootstrap typing
export type FormControlElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export type BootstrapFormOnChange = ChangeEvent<FormControlElement>;
