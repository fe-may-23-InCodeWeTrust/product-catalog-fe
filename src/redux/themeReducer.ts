export const toggleTheme = () => ({
  type: 'TOGGLE_THEME',
});

const getTheme = (): boolean => {
  const currentTheme = localStorage.getItem('darkMode');

  return currentTheme ? JSON.parse(currentTheme) : false;
};

const initialState = {
  darkMode: getTheme(),
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
