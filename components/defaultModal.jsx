import React from 'react';
import className from 'classnames';
import CloseIcon from '../assets/svgs/Close';

const blogModal = () => {
  const [isOpen, setOpen] = React.useState(true);
  React.useEffect(() => {
    document.documentElement.className = 'is-clipped';
    return () => {
      document.documentElement.className = '';
    };
  }, []);
  const handleClose = () => {
    setOpen(false);
    document.documentElement.className = '';
  };
  return (
    <div className={className('modal', { 'is-active': isOpen })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <button
            type="button"
            className="button"
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </header>
        <section className="modal-card-body">
          <div className="modal-title">
            <h1 className="title">Welcome to Teji Mandi</h1>
            <p>Actionable Stock Market Insights</p>
          </div>
          <div className="column-container">
            <div className="columns">
              <div className="column">
                <div className="box">
                  <div className="icon" />
                  <p>filter Insights by topics</p>
                </div>
              </div>
              <div className="column">
                <div className="box">
                  <div className="icon" />
                  <p>Get fresh Insights by subscribing to notifications</p>
                </div>
              </div>
              <div className="column">
                <div className="box">
                  <div className="icon" />
                  <p>Search for Insights by stocks and sectors</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-content">
            <p>
              You can get our insights delivered on
              {' '}
              <a
                target="_to"
                href="https://api.whatsapp.com/send?phone=919324459287&text=Save%20our%20number%20+919324459287%20to%20your%20contacts%20and%20send%20this%20message%20to%20start"
              >
                Whatsapp &
                {' '}
              </a>
              <a target="_to" href="https://twitter.com/TejiMandi_App">
                Twitter
              </a>
            </p>
            <p className="center">OR</p>
            <p>
              <a
                target="_to"
                href="https://play.google.com/store/apps/details?id=com.tejimandi"
              >
                Download our app
              </a>
              {' '}
              or Login to ask questions and share your own insights
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

blogModal.propTypes = {};

export default blogModal;
