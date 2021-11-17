import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children }) => (
  <div>
    <div className="main">
      <h1>Next.js. Demo</h1>
      <div className="page">{children}</div>
    </div>

    <footer className="footer">
      <div className="footer-inner">
        <p>
          <a
            href="https://github.com/blainegarrett/node-next-gae-demo"
            title="Fork me on GitHub"
          >
            v1.0.0 - See source code on Github
          </a>
        </p>
        <p>
          Demo is a port of{' '}
          <a href="https://github.com/now-examples/nextgram" target="_new">
            nextgram Next.js example
          </a>
          . Also check out this{' '}
          <a href="https://github.com/blainegarrett/material-node-next-gae-demo">
            demo with Material UI support
          </a>
          .
        </p>
        <p>
          Artwork data provided by Minneapolis Institute of Arts{' '}
          <a href="https://github.com/artsmia/collection-elasticsearch">
            Elastic search api
          </a>
          .{' '}
        </p>
        <p>Artwork is copyright its respective copyright holders.</p>
      </div>
    </footer>

    <style jsx>{`
      .main {
        width: 85%;
        margin: auto;
        padding: 10px 0 300px 0;
      }
      .page {
        color: #555555;
        background: #fff;
        padding: 3px 10px;
      }
      @media (max-width: 750px) {
        .main {
          padding: 0;
          width: auto;
        }
      }

      footer {
        background-color: #ccc;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        padding: 20px;
      }
      footer .footer-inner {
        width: 85%;
        margin: auto;
        padding: 10px 0 0 0;
      }
    `}</style>
  </div>
);

Page.propTypes = {
  children: PropTypes.node
};

export default Page;
