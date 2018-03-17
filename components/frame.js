import React from 'react'
import Link from 'next/link'

export default ({ artwork }) => {
  let id = artwork.id;

  return (
    <div className='photo'>
      <div className='image'></div>

      <div className='sidebar'>
        <ul className='sidebarList'>
          <li>
            <h3>{ artwork.title }</h3>
            <p>{ artwork.artist }</p>

            <p><a target="_new" href={"https://collections.artsmia.org/art/" + id }>View on Mia's Website</a></p>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .photo {
          width: 800px;
          overflow: hidden;
          height: 500px;
          display: inline-block;
        }

        .image {
          float: left;
          width: 550px;
          height: 500px;
          background: #333;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          line-height: 500px;
          font-size: 40px;
          background-image: url('https://1.api.artsmia.org/${id}.jpg');
          background-position: 50% 50%;
          background-size: contain;
          background-repeat:no-repeat
        }

        .sidebar {
          float: right;
          background: #fff;
          width: 250px;
          height: 500px;
          text-align: left;
          box-sizing: border-box;
          padding: 20px;
          font-family: Monaco;
          font-size: 11px;
        }

        .sidebarList {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>);
  };