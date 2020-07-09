import React from 'react';

export default function Loader({ loading } = { loading: false }): JSX.Element {
  return (
    <>
      <div className={`loader-container${loading ? ' loading' : ''}`}>
        <div className={'loader'} />
      </div>

      <style jsx>{`
        .loader-container {
          display: none;
          z-index: 999;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: rgb(44, 62, 80);
        }

        .loader-container.loading {
          display: flex;
        }

        .loader {
          display: block;
          width: 128px;
          height: 128px;
          margin: auto;
          border-radius: 50%;
          background: url('/logo.png');
          background-size: contain;
          box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(142, 68, 173, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(142, 68, 173, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(142, 68, 173, 0);
          }
        }
      `}</style>
    </>
  );
}
