import styled, { ThemeProvider, injectGlobal } from 'styled-components';

import Meta from '../Meta';
import Header from '../Header';
import { theme, Inner, StyledPage } from '../styles/PageStyles';

export default class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
