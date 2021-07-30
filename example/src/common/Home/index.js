import React from 'react';
import { ContentBoxHeader } from '../ContentBox';
import { getRootUrl } from '../utils';
import './styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

export default function Home({
  title = 'Home',
  subTitle = 'Welcome to My Homepage',
  data = [],
  version = ''
}) {
  const defaultData = data[0];
  return (
    <Router>
      <div className="wrapper">
        <div id="top">
          <div className="title">
            <h3>
              {title}
            </h3>
            <p>
              {subTitle}
            </p>
          </div>

          <div className="containerMenu">
            <div className="menu">
              {
                data.map(({ id, label }) => (
                  <NavLink key={id} exact to={`/${id}`} className="menuItem" activeClassName="menuitemSelected">
                    <span className="gg-check" /> {label}
                  </NavLink>
                ))
              }
            </div>
          </div>

        </div>
        <div className="wrapper">
          <div id="main">
            <Switch>
              <Route exact path="/">
                <Redirect to={`/${defaultData.id}`} />
              </Route>
              {
                data.map(({ id, component, label, sourceLink, docsLink }) => (
                  <Route key={id} exact path={`/${id}`}>
                    <React.Fragment>
                      <ContentBoxHeader
                        text={label}
                        sourceLink={sourceLink}
                        docsLink={docsLink}
                      />
                      <div>
                        {component}
                      </div>
                    </React.Fragment>
                  </Route>
                ))
              }
            </Switch>
          </div>
        </div>
        {
          version && (
            <div id="bottom">
              <a href={getRootUrl('blob/master/CHANGELOG.md')}>
                {`v.${version}`}
              </a>
            </div>
          )
        }
      </div>
    </Router>
  );
}
