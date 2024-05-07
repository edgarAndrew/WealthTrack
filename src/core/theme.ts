import { MD3LightTheme as DefaultTheme} from 'react-native-paper';
  
export const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      myOwnColor: '#CC6CE7',
    },
  };