import classname from 'classnames';
import React from 'react';

const SubscribeForm = () => {
  const [status, setStatus] = React.useState({ status: null, message: null });
  const inputRef = React.useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    setStatus({
      status: 'sending',
      message: null,
    });
    const email = inputRef.current.value;
    const data = JSON.stringify({
      contacts: [
        {
          email,
        },
      ],
    });
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log(xhr.status);

        if (xhr.status === 202) {
          inputRef.current.value = '';
          setStatus({
            status: 'success',
            message: 'Thanks for showing interest. You are now subscribed',
          });
        } else {
          const error = JSON.parse(xhr.responseText);
          setStatus({
            status: 'error',
            message: error.errors[0].message,
          });
        }
      }
    });
    xhr.open('PUT', 'https://api.sendgrid.com/v3/marketing/contacts');
    xhr.setRequestHeader(
      'authorization',
      'Bearer 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',
    );
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(data);
    // addToMailchimp(email).then((res) => {
    //   if (data.result === 'error') {
    //     setStatus({
    //       status: 'error',
    //       message: data.msg,
    //     });
    //   } else {
    //     inputRef.current.value = '';
    //     setStatus({
    //       status: 'success',
    //       message: data.msg,
    //     });
    //   }
    // });
  };
  const hasSuccess = status.status === 'success';
  const hasError = status.status === 'error';
  return (
    <div className="subscribeFormContainer">
      <form
        action-xhr="https://app.us20.list-manage.com/subscribe/post?u=c4d8872f669c5e3757178de4c&id=0f64cdd43c&"
        onSubmit={onSubmit}
        method="POST"
        target="_blank"
      >
        <div className="columns is-centered">
          <div className="column is-four-fifths">
            <div className="labelContainer">
              <label className="label">Subscribe to our newsletter</label>
            </div>
            <div className="field is-grouped">
              <div className="control is-expanded">
                <input
                  ref={inputRef}
                  className={classname('input is-large', {
                    'is-danger': hasError,
                  })}
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                />
                {hasSuccess && (
                  <div
                    className="help is-success"
                    dangerouslySetInnerHTML={{ __html: status.message }}
                  />
                )}
                {hasError && (
                  <div
                    className="help is-danger"
                    dangerouslySetInnerHTML={{ __html: status.message }}
                  />
                )}
              </div>
              <div className="control">
                <button
                  type="submit"
                  className={classname('button is-info', {
                    'is-loading': status.status === 'sending',
                  })}
                  disabled={status.status === 'sending'}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

SubscribeForm.propTypes = {};

export default SubscribeForm;
