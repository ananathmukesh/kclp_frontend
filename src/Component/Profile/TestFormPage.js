import React from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const TestFormPageFormik = () => {
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field
                type="text"
                name="email"
                style={{ borderColor: errors.email ? 'red' : '' }}
              />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label>Password</label>
              <Field
                type="text"
                name="password"
                style={{ borderColor: errors.password ? 'red' : '' }}
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label>Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                style={{ borderColor: errors.confirmPassword ? 'red' : '' }}
              />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TestFormPageFormik;
