const themeMode = localStorage.getItem('darkMode');
export const toggleTheme = () => ({
  type: 'TOGGLE_THEME',
});
const initialState = {
  darkMode: themeMode,
};

const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

export default themeReducer;
