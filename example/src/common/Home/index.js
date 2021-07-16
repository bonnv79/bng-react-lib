import React from 'react';
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

  const { component, label } = data[tab] || {};

  return (
    <div className="wrapper">
      <div id="top">
        <h2>
          {title}
        </h2>
        <p>
          {subTitle}
        </p>
      </div>
      <div className="wrapper">
        <div id="menubar">
          <ul id="menulist">
            {
              data.map((item, index) => {
                const { id, label } = item;
                return (
                  <li key={id} className={`menuitem ${tab === index ? 'menuitemSelected' : ''}`} onClick={onClickItemTab(index)}>
                    {label}
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div id="main">
          <h1 style={{ marginTop: 0, marginBottom: 16 }}>{label}</h1>

          <div style={{ height: 500 }}>
            {component}
          </div>
        </div>
      </div>

      {
        version && (
          <div id="bottom">
            {`v.${version}`}
          </div>
        )
      }
    </div>
  );
}
