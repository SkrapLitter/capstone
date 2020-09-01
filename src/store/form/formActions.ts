import TYPES from '../types';

interface UpdateForm {
  type: string;
  name: string;
  value: string | number;
}
interface ClearForm {
  type: string;
}

const updateForm = (
  name: UpdateForm['name'],
  value: UpdateForm['value']
): UpdateForm => ({
  type: TYPES.UPDATE_FORM,
  name,
  value,
});

const clearForm = (): ClearForm => ({
  type: TYPES.CLEAR_FORM,
});

export { updateForm, clearForm };
