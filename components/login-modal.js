import React from 'react';
import className from 'classnames';
import { useForm } from 'react-hook-form';
import CloseIcon from '../assets/svgs/Close';

const LoginModal = ({ onClose }) => {
  const [isOpen, setOpen] = React.useState(true);
  const {
    register, reset, handleSubmit, errors,
  } = useForm();
  let scGateway = null;
  React.useEffect(() => {
    document.documentElement.className = 'is-clipped';
    scGateway = new scDK({
      gateway: 'tejimandi',
      smallcaseAuthToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWVzdCI6dHJ1ZSwiaWF0IjoxNTkzNTg1ODIxfQ.pXSkE7nTRZUojABSi14peHboXkBDcDhpvJlQoSNWKy8',
    });
    return () => {
      document.documentElement.className = '';
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    onClose();
    document.documentElement.className = '';
  };

  const onSubmit = () => {
    scGateway.connect();
  };

  return (
    <div className={className('modal', { 'is-active': isOpen })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <h1 className="modal-title">Connect</h1>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className={className('input', {
                    'is-danger': errors.name,
                  })}
                  type="text"
                  name="name"
                  ref={register({
                    required: 'Name is required.',
                  })}
                  placeholder="Name"
                />
              </div>
              {errors.name && (
                <p className="help is-danger">{errors.name.message}</p>
              )}
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={className('input', {
                    'is-danger': errors.email,
                  })}
                  type="text"
                  name="email"
                  ref={register({
                    required: 'Email is required.',
                  })}
                  placeholder="Email"
                />
              </div>
              {errors.email && (
                <p className="help is-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="field">
              <label className="label">Phone Number</label>
              <div className="control">
                <input
                  className={className('input', {
                    'is-danger': errors.phoneNumber,
                  })}
                  type="text"
                  name="phoneNumber"
                  ref={register({
                    required: 'Phone Number is required.',
                  })}
                  placeholder="Phone Number"
                />
              </div>
              {errors.phoneNumber && (
                <p className="help is-danger">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-link">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

LoginModal.propTypes = {};

export default LoginModal;
