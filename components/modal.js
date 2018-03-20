import React from 'react';
import PropTypes from 'prop-types';
import Photo from './frame';

export default class Modal extends React.Component {
  dismiss (e) {
    if (this._shim === e.target ||
       this._photoWrap === e.target) {
      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    }
  }

  render () {
    return (
      <div ref={el => (this._shim = el)} className='shim' onClick={(e) => this.dismiss(e)}>
        <div ref={el => (this._photoWrap = el)} className='photo'>
          <Photo artwork={this.props.artwork} />
        </div>
        <style jsx>{`
          .shim {
            position: fixed;
            background: rgba(0,0,0,.65);
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
          }

          .photo {
            position: absolute;
            top: 50%;
            width: 100%;
            margin-top: -250px;
          }
        `}</style>
      </div>
    );
  }
}

Modal.propTypes = {
  artwork: PropTypes.object,
  onDismiss: PropTypes.func
};