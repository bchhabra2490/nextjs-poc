import React, { useEffect } from 'react';
import {
  TextField,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  FormControl,
  FormLabel,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { createApolloFetch } from 'apollo-fetch';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { ThemeProvider } from '@material-ui/core/styles';
import WhatsappIcon from '../assets/svgs/NewWhatapp';
import LinkedInIcon from '../assets/svgs/LinkedIn';
import TwitterIcon from '../assets/svgs/Twitter';
import Layout from '../components/layout';
import SEO from '../components/seo';
import theme from '../theme-material-ui/theme';

const uri = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;

const query = `
  mutation addLead ($data: String!) {
    addLead (data: $data)
  }
`;

const removeEmptyItems = (obj) => {
  const newObj = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]]) {
      newObj[keys[i]] = obj[keys[i]];
    }
  }
  return newObj;
};

const Waitlist = (props) => {
  const {
    register, reset, handleSubmit, errors,
  } = useForm();
  const [isSubmited, setSubmit] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isOptional, setOptional] = React.useState(false);
  const [values, setValues] = React.useState({});
  const params = props.params;

  useEffect(() => {
    const newValues = removeEmptyItems({
      ...params,
      firstName: params.first_name,
      lastName: params.last_name,
      phoneNumber: params.phone,
    });
    reset(newValues);
    setValues(newValues);
  }, []);

  const handleChange = (event) => {
    if (event.target.value === '4') {
      setOptional(true);
    } else {
      setOptional(false);
    }
  };

  const onSubmit = (formValues) => {
    const requestPayload = formValues;
    Object.keys(params).forEach((key) => {
      requestPayload[key] = params[key];
    });
    setLoading(true);
    const apolloFetch = createApolloFetch({ uri });
    apolloFetch.use(({ request, options }, next) => {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers = {
        'api-version': 2,
      };
      next();
    });
    apolloFetch({
      query,
      variables: { data: JSON.stringify(requestPayload) },
    })
      .then(() => {
        setLoading(false);
        setSubmit(true);
        window.scrollTo(0, 0);
        if (window.AndroidInterface) {
          window.AndroidInterface.reportSuccess();
          window.AndroidInterface.showToast('Thanks for your interest!');
          window.AndroidInterface.closeWindow();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (window.AndroidInterface) {
          window.AndroidInterface.showToast(
            'Something went wrong please try again later',
          );
        }
      });
  };

  return (
    <Layout>
      <SEO
        title="Join the Teji Mandi Waitlist"
        description="Join our waitlist to get early access to our Teji Mandi portfolio and app"
      />
      <ThemeProvider theme={theme}>
        <section className="waitlist-container">
          <div className="container">
            {!isSubmited && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="waitlist-box">
                  <div className="title-container">
                    <h1 className="title">Join Us</h1>
                    <p>
                      We are working on a new Teji Mandi investment platform.
                      Fill in your details below to get exclusive access when it
                      is ready!
                    </p>
                  </div>
                  <div className="waitlist-form-container">
                    <Grid container spacing={6}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="firstName"
                          // value={values.first_name}
                          label="First Name"
                          placeholder="Your First Name"
                          inputRef={register({
                            required: 'First name is required.',
                          })}
                          error={(errors.firstName && true) || false}
                          helperText={
                            errors.firstName && errors.firstName.message
                          }
                          InputLabelProps={{
                            shrink: values.firstName && true,
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Last Name"
                          name="lastName"
                          placeholder="Your Last Name"
                          // value={values.last_name}
                          InputLabelProps={{
                            shrink: values.lastName && true,
                          }}
                          inputRef={register({
                            required: 'Last name is required.',
                          })}
                          error={(errors.lastName && true) || false}
                          helperText={
                            errors.lastName && errors.lastName.message
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Phone Number"
                          name="phoneNumber"
                          placeholder="Your Phone Number"
                          // value={values.phone}
                          InputLabelProps={{
                            shrink: values.phoneNumber && true,
                          }}
                          inputRef={register({
                            required: 'Phone is required.',
                          })}
                          error={(errors.phoneNumber && true) || false}
                          helperText={
                            errors.phoneNumber && errors.phoneNumber.message
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Email Address"
                          name="email"
                          placeholder="Your Email Address"
                          // value={values.email}
                          InputLabelProps={{ shrink: values.email && true }}
                          inputRef={register({
                            required: 'Email is required.',
                          })}
                          error={(errors.email && true) || false}
                          helperText={errors.email && errors.email.message}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          className="MuiFormControl"
                          component="fieldset"
                          error={(errors.age && true) || false}
                        >
                          <FormLabel
                            className="MuiFormLabel"
                            component="legend"
                          >
                            What is your age?
                          </FormLabel>
                          <RadioGroup
                            aria-label="age"
                            name="age"
                            // value={values.age}
                          >
                            <FormControlLabel
                              value="1"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="age"
                                  inputRef={register({
                                    required: 'Age is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="Less than 20 years"
                            />
                            <FormControlLabel
                              value="2"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="age"
                                  inputRef={register({
                                    required: 'Age is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="20 - 30 years"
                            />
                            <FormControlLabel
                              value="3"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="age"
                                  inputRef={register({
                                    required: 'Age is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="30 - 40 years"
                            />
                            <FormControlLabel
                              value="4"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="age"
                                  inputRef={register({
                                    required: 'Age is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="40 - 50 years"
                            />
                            <FormControlLabel
                              value="5"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="age"
                                  inputRef={register({
                                    required: 'Age is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="50 and above"
                            />
                          </RadioGroup>
                          {errors.age && (
                            <FormHelperText error>
                              {errors.age.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          className="MuiFormControl"
                          component="fieldset"
                          error={(errors.invested_before && true) || false}
                        >
                          <FormLabel
                            className="MuiFormLabel"
                            component="legend"
                          >
                            Have You Invested Before?
                          </FormLabel>
                          <RadioGroup
                            aria-label="invested_before"
                            name="investedBefore"
                            value={values.invested_before}
                          >
                            <FormControlLabel
                              value="true"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="investedBefore"
                                  inputRef={register({
                                    required: 'Invested before is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="false"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="investedBefore"
                                  inputRef={register({
                                    required: 'Invested before is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="No"
                            />
                          </RadioGroup>
                          {errors.invested_before && (
                            <FormHelperText error>
                              {errors.invested_before.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          className="MuiFormControl"
                          component="fieldset"
                          error={(errors.refText && true) || false}
                        >
                          <FormLabel
                            className="MuiFormLabel"
                            component="legend"
                          >
                            How did you hear about us?
                          </FormLabel>
                          <RadioGroup
                            aria-label="ref"
                            name="ref"
                            value={values.ref}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="1"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="ref"
                                  inputRef={register({
                                    required: 'Hear form is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="Instagram"
                            />
                            <FormControlLabel
                              value="2"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="ref"
                                  inputRef={register({
                                    required: 'Hear form is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="Twitter"
                            />
                            <FormControlLabel
                              value="3"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="ref"
                                  inputRef={register({
                                    required: 'Hear form is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="Motilal Oswal"
                            />
                            <FormControlLabel
                              value="4"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="ref"
                                  inputRef={register({
                                    required: 'Hear form is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="Other"
                            />
                          </RadioGroup>
                          {errors.ref && (
                            <FormHelperText error>
                              {errors.ref.message}
                            </FormHelperText>
                          )}
                          {isOptional && (
                            <TextField
                              label="Please specify"
                              name="refText"
                              placeholder="Please specify"
                              inputRef={register()}
                              fullWidth
                            />
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          className="MuiFormControl"
                          component="fieldset"
                          error={(errors.amount && true) || false}
                        >
                          <FormLabel
                            className="MuiFormLabel"
                            component="legend"
                          >
                            What amount are you willing to invest?
                          </FormLabel>
                          <RadioGroup
                            aria-label="amount"
                            name="amount"
                            //  value={values.invested_before}
                          >
                            <FormControlLabel
                              value="1"
                              color="primary"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="amount"
                                  inputRef={register({
                                    required: 'Invest is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="50,000 - 1 Lakh"
                            />
                            <FormControlLabel
                              value="2"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="amount"
                                  inputRef={register({
                                    required: 'Invest is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="1 Lakh - 3 Lakhs"
                            />
                            <FormControlLabel
                              value="3"
                              className="MuiFormControlLabel"
                              control={(
                                <Radio
                                  name="amount"
                                  inputRef={register({
                                    required: 'Invest is required.',
                                  })}
                                  color="primary"
                                />
                              )}
                              label="3 Lakhs and above"
                            />
                          </RadioGroup>
                          {errors.amount && (
                            <FormHelperText error>
                              {errors.amount.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isLoading}
                      className="contained-button"
                    >
                      Submit
                    </Button>
                    {isLoading && (
                      <CircularProgress size={24} className="buttonProgress" />
                    )}
                  </div>
                </div>
              </form>
            )}
            {isSubmited && (
              <div className="waitlist-success-box">
                <div className="waitlist-white-box">
                  <div className="title-container">
                    <h1 className="title">Thanks for your interest!</h1>
                    <p>
                      We appreciate you providing your information. We will
                      reach out to you as we get closer to launching our
                      portfolio In the mean time you can join these channels to
                      get regular updates on our portfolio and read our research
                      for free!
                    </p>
                    <div className="social-container">
                      <a
                        href="https://twitter.com/TejiMandi_App"
                        target="__blank"
                      >
                        <TwitterIcon />
                      </a>
                      <a target="__blank" href="/">
                        <LinkedInIcon />
                      </a>
                      <a
                        target="__blank"
                        href="https://api.whatsapp.com/send?phone=919324459287&text=Save%20our%20number%20+919324459287%20to%20your%20contacts%20and%20send%20this%20message%20to%20start"
                      >
                        <WhatsappIcon />
                      </a>
                    </div>
                    <div className="link-container">
                      <a className="btn-link" href="/research">
                        Read our research now
                        {' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </ThemeProvider>
    </Layout>
  );
};

export async function getServerSideProps({query}) {
  return {
    props: {
      params: query,
    }, // will be passed to the page component as props
  }
}

export default Waitlist;
