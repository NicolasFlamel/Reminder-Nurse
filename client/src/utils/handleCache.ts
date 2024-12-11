import { MutationHookOptions } from '@apollo/client';
import { QUERY_MEDICINES, QueryMedicinesType } from './queries';
import { MedicineType } from 'types';

type AddMedicineCacheType = MutationHookOptions<{
  addMedicine: MedicineType;
}>;
export const addMedicineCache: AddMedicineCacheType = {
  update(cache, { data }) {
    try {
      if (!data) throw 'no data';

      const { addMedicine } = data;
      const queryData = cache.readQuery<QueryMedicinesType>({
        query: QUERY_MEDICINES,
      });

      if (!queryData) throw 'no query data';

      cache.writeQuery({
        query: QUERY_MEDICINES,
        data: { medicines: [...queryData.medicines, addMedicine] },
      });
    } catch (e) {
      console.error(e);
    }
  },
};

type UpdateMedicineCacheType = MutationHookOptions<{
  updateMedicine: MedicineType;
}>;
export const updateMedicineCache: UpdateMedicineCacheType = {
  update(cache, { data }) {
    try {
      if (!data) throw 'no data';

      const { updateMedicine } = data;
      const queryData = cache.readQuery<QueryMedicinesType>({
        query: QUERY_MEDICINES,
      });

      if (!queryData) throw ' no query data';

      const filteredMedicines = queryData.medicines.filter(
        (medicine) => medicine._id !== updateMedicine._id
      );

      cache.writeQuery({
        query: QUERY_MEDICINES,
        data: { medicines: [...filteredMedicines, updateMedicine] },
      });
    } catch (e) {
      console.error(e);
    }
  },
};

type ToggleIsActiveCacheType = MutationHookOptions<{
  toggleIsActive: MedicineType;
}>;
export const toggleIsActiveCache: ToggleIsActiveCacheType = {
  update(cache, { data }) {
    try {
      if (!data) throw 'no data';

      const { toggleIsActive } = data;
      const queryData = cache.readQuery<QueryMedicinesType>({
        query: QUERY_MEDICINES,
      });

      if (!queryData) throw ' no query data';

      const filteredMedicines = queryData.medicines.filter(
        (medicine) => medicine._id !== toggleIsActive._id
      );

      cache.writeQuery({
        query: QUERY_MEDICINES,
        data: { medicines: [...filteredMedicines, toggleIsActive] },
      });
    } catch (e) {
      console.error(e);
    }
  },
};

type ToggledQueueCheckedCacheType = MutationHookOptions<{
  checkQueue: MedicineType;
}>;
export const toggledQueueCheckedCache: ToggledQueueCheckedCacheType = {
  update(cache, { data }) {
    try {
      if (!data) throw 'no data';

      const queryData = cache.readQuery<QueryMedicinesType>({
        query: QUERY_MEDICINES,
      });

      if (!queryData) throw 'no query data';

      const filteredMedicines = queryData.medicines.filter(
        (medicine) => medicine._id !== data.checkQueue._id
      );

      cache.writeQuery({
        query: QUERY_MEDICINES,
        data: { medicines: [...filteredMedicines, data.checkQueue] },
      });
    } catch (e) {
      console.error(e);
    }
  },
};
