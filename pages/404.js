import React from 'react';
import Page from '../components/Page';
import PropTypes from 'prop-types';

export default class Error extends React.Component {

  render() {
    return (
      <Page>
        <p>
          The requested page could not be found.
        </p>
      </Page>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number
};