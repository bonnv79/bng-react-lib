import * as React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { getNpmUrl } from '../utils';

export function ContentBox({ className, children, style }) {
  return (
    <div className={clsx(styles.ContentBox, className)} style={style}>
      {children}
    </div>
  );
}

export function ContentBoxHeader({ text, sourceLink, docsLink }) {
  const links = [];
  const npmUrl = getNpmUrl(docsLink);

  if (sourceLink) {
    links.push(
      <a className={styles.Link} href={sourceLink} key="sourceLink">
        Source
      </a>,
    );
  }

  if (sourceLink && docsLink) {
    links.push(<span key="separator"> | </span>);
  }

  if (docsLink) {
    links.push(
      <a className={styles.Link} href={npmUrl} key="docsLink">
        npm
      </a>,
    );
  }

  return (
    <h1 className={styles.Header}>
      {text}

      {
        docsLink && (
          <span className={styles.notify}>
            This component will be further supported and developed on <a href={npmUrl}><strong>{docsLink} - npm</strong></a> in the future
          </span>
        )
      }

      {links.length > 0 && <small className={styles.Small}>{links}</small>}
    </h1>
  );
}

export function ContentBoxParagraph({ children }) {
  return <div className={styles.Paragraph}>{children}</div>;
}