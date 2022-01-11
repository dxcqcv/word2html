import { createGlobalStyle } from 'styled-components';
import { generatorReset } from '@/components/reset';

const resetCSS = generatorReset(false);

const GlobalStyles = createGlobalStyle`${resetCSS}`;

export default GlobalStyles;
