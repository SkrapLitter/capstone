import TYPES from '../types';

interface View {
  type: string;
  view?: string;
  e?: unknown;
}

const setView = (view: View['view']): View => ({
  type: TYPES.SET_VIEW,
  view,
});

const clearView = (): View => ({
  type: TYPES.CLEAR_VIEW,
});

export { setView, clearView };
