import { gql } from '@apollo/client';
import {
  AmountType,
  DosageType,
  IdType,
  IntervalType,
  IsActiveType,
  NameType,
  QueueType,
  SubIntervalType,
  TimesType,
} from 'types';

export const QUERY_MEDICINE = gql`
  query singleMedicine($medicineId: ID!) {
    medicine(medicineId: $medicineId) {
      _id
      name
      dosage
      amount
      interval
      subInterval
      times
      queue {
        _id
        time
        checked
      }
      isActive
    }
  }
`;

export type QueryMedicinesType = {
  medicines: {
    _id: IdType;
    name: NameType;
    dosage: DosageType;
    amount: AmountType;
    interval: IntervalType;
    subInterval: SubIntervalType;
    times: TimesType;
    queue: QueueType;
    isActive: IsActiveType;
  }[];
};
export const QUERY_MEDICINES = gql`
  query allMedicines {
    medicines {
      _id
      name
      dosage
      amount
      interval
      subInterval
      times
      queue {
        _id
        time
        checked
      }
      isActive
    }
  }
`;
