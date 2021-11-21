/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Page from '../components/Page';
import Modal from '../components/modal';

class Index extends React.Component {
  static async getInitialProps() {
    // Async load 10 known images from Mia's collection
    const res = await axios(
      'https://search.artsmia.org/ids/1355,3291,109328,127083,67472,2606,18346,1218'
    );
    const json = await res.data;
    return { artworks: json.hits.hits };
  }

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  // handling escape close
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    if (!this.props.router.query.showModal) return;
    if (e.keyCode === 27) {
      this.props.router.back();
    }
  }

  dismissModal() {
    this.props.router.push('/');
  }

  showArtwork(e, id) {
    e.preventDefault();
    this.props.router.push(`/?showModal=${id}`, `/artwork/${id}`);
  }

  selectArtworkById(id) {
    let results = this.props.artworks.filter(artwork => {
      return artwork._source.id == id;
    });
    return results[0]._source;
  }

  render() {
    const { router, artworks } = this.props;

    return (
      <Page>
        <Head>
          <title>Next.js Demo</title>
        </Head>

        <h2>Lightbox Links</h2>

        <div className="list">
          {router.query.showModal && (
            <Modal
              artwork={this.selectArtworkById(router.query.showModal)}
              onDismiss={() => this.dismissModal()}
            />
          )}
          {artworks.map(artwork => {
            let id = artwork._source.id;
            return (
              <div key={id} className="photo">
                <a
                  className="photoLink"
                  href={`/artwork/${id}`}
                  onClick={e => this.showArtwork(e, id)}
                  title={artwork._source.title}
                  style={{
                    backgroundImage: `url('https://1.api.artsmia.org/${id}.jpg')`
                  }}
                />
              </div>
            );
          })}
        </div>

        <h2>Direct Links</h2>
        <ul>
          {artworks.map(artwork => {
            let id = artwork._source.id;
            return (
              <li key={id}>
                <Link as={`/artwork/${id}`} href="/artwork/[artworkId]">
                  <a title={artwork._source.title} className="permalink">
                    {artwork._source.title}
                  </a>
                </Link>
              </li>
            );
          })}

          <li>
            <a href="/does-not-exist">404 example</a> (Un-matched Route)
          </li>
          <li>
            <a href="/artwork/asdf123XYZ">404 example</a> (Matched Route but
            matching data not exist)
          </li>
        </ul>

        <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }

          .photo .permalink {
            display: inline-block;
          }
          .photo {
            display: inline-block;
            text-align: center;
          }

          .photoLink {
            color: #333;
            verticalalign: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 250px;
            line-height: 250px;
            margin: 10px;
            border: 2px solid transparent;
            background-position: 50% 50%;
            background-size: cover;
          }

          .photoLink:hover {
            bordercolor: blue;
          }
        `}</style>
      </Page>
    );
  }
}

export default withRouter(Index);
Index.propTypes = {
  artworks: PropTypes.array,
  router: PropTypes.any
};
