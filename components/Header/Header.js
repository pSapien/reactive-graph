import Link from 'next/link';
import Router from 'next/router';
import NProgess from 'nprogress';

import Nav from '../Nav';
import { theme, Logo, StyledHeader } from '../styles/HeaderStyles';

Router.onRouteChangeStart = () => NProgess.start();
Router.onRouteChangeComplete = () => NProgess.done();
Router.onRouteChangeError = () => NProgess.done();

export default () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a href="">REACTIVE GRAPH</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
);
