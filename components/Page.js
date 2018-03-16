export default ({ children }) => (
  <div>
    <div className="main">
      <h1>Next.js. Demo</h1>
      <div className="page">
        { children }
      </div>
    </div>
      <footer className="footer">
        <div className="footer-inner">
          <p>Demo is a port of <a href="https://github.com/now-examples/nextgram" target="_new">nextgram Next.js example</a>.</p>
          <p>Artwork data provided by Minneapolis Institute of Arts <a href="https://github.com/artsmia/collection-elasticsearch">Elastic search api</a>. </p>
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
          color: #828282;
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
            position:fixed;
            bottom:0;
            left:0;
            width:100vw;
            padding:20px
          }
          footer .footer-inner {
          width: 85%;
          margin: auto;
          padding: 10px 0 0 0;
          }
      `}</style>
  </div>
)