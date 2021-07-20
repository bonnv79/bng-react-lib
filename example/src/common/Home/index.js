import React from 'react';
import { ContentBoxHeader } from '../ContentBox';
import { getRootUrl } from '../utils';
import './styles.css';

export default function Home({
  title = 'Home',
  subTitle = 'Welcome to My Homepage',
  data = [],
  version = ''
}) {
  const [tab, setTab] = React.useState(0);

  const onClickItemTab = (value) => () => {
    setTab(value);
  };

  const { component, label, sourceLink, docsLink } = data[tab] || {};

  return (
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
              data.map((item, index) => {
                const { id, label } = item;
                return (
                  <span key={id} className={`menuItem ${tab === index ? 'menuitemSelected' : ''}`} onClick={onClickItemTab(index)}>
                    <span className="gg-check" /> {label}
                  </span>
                );
              })
            }
          </div>
        </div>

      </div>
      <div className="wrapper">
        <div id="main">
          <ContentBoxHeader
            text={label}
            sourceLink={sourceLink}
            docsLink={docsLink}
          />

          <div>
            {component}
          </div>
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
  );
}
