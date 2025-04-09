import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageContent from '@site/src/components/HomepageContent';

import { Hero, Button } from '@algolia/ui-library';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';


import styles from './index.module.css';

function HomepageHeader() {
  const { withBaseUrl } = useBaseUrlUtils();
  const {siteConfig} = useDocusaurusContext();
  return (
    <Hero
      id="hero"
      title={
        <div className="hero-content-wrapper">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      }
      background="curves"
      cta={[
        <div className="button-container">
          <Button 
            key="get-started" 
            href={withBaseUrl('intro')}
            // color="white"
            className="hero-button"
          >
            开始自学之旅
          </Button>
        </div>
      ]}
    />
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageContent />
      </main>
    </Layout>
  );
}