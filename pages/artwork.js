import React from 'react';
import Router from 'next/router';
import 'isomorphic-unfetch';
import Photo from '../components/frame';
import Page from '../components/Page';
import Head from 'next/head';

export default class extends React.Component {
  static async getInitialProps (ctx) {
    let {query} = ctx;
    let id = query.id;

    // Async load artwork resource
    const res = await fetch('https://search.artsmia.org/id/' + id);
    const json = await res.json();

    // The api returns "null" as the body with a 200 status code if an id doesn't exist
    let resourceNotFound = false;
    if (json == null) {
      ctx.res.statusCode = 404; // Tell next.js server to issue a 404 status
      resourceNotFound = true;
    }

    return { artwork: json, resourceNotFound:resourceNotFound };
  }

  render() {
    var { artwork, resourceNotFound} = this.props;

    if (resourceNotFound) {
      return (<Page>Could not find artwork</Page>);
    }

    return (
      <Page>
        <Head>
          <title>{ artwork.title } Next.js demo</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>

        <div className='permalink'>
          <div className='wrap'>
            <Photo artwork={artwork} />
          </div>
          <style jsx>{`
            .permalink {
              padding: 100px;
              text-align: center;
            }

            .wrap {
              display: inline-block;
              border: 1px solid #999;
              margin: auto;
            }
          `}</style>
        </div>
      </Page>
    );
  }
}