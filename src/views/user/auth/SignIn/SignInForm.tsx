import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { FormItem, FormContainer } from '@/components/ui/Form';
import Alert from '@/components/ui/Alert';
import PasswordInput from '@/components/shared/PasswordInput';
import ActionLink from '@/components/shared/ActionLink';
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import ApiService from '../../../../services/ApiService';
import type { AxiosRequestConfig } from 'axios';
import type { CommonProps } from '@/@types/common';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth'


interface SignInFormProps extends CommonProps {
  disableSubmit?: boolean;
  forgotPasswordUrl?: string;
  signUpUrl?: string;
}

type SignInFormSchema = {
  email: string;
  password: string;
  rememberMe: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
  rememberMe: Yup.bool(),
});

const SignInForm: React.FC<SignInFormProps> = (props) => {
  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = '/forgot-password',
    signUpUrl = '/sign-up',
  } = props;

  const [message, setMessage] = useTimeOutMessage();
const navigate = useNavigate();
const { signIn } = useAuth();

const handleSignIn = async (
  values: SignInFormSchema,
  setSubmitting: (isSubmitting: boolean) => void
) => {
  const { email, password } = values;
  setSubmitting(true);

  const requestConfig: AxiosRequestConfig = {
    method: 'POST',
    url: '/login', 
    headers: {
      'Content-Type': 'application/json',
    },
    data: { email, password },
  };

  try {
    const response = await ApiService.fetchData(requestConfig);
    console.log('Response:', response.data);

    // Use the response data with signIn method from useAuth
    const authResult = await signIn({ email, password });

    if (authResult?.status === 'failed') {
      setMessage(authResult.message);
    } else {
      setMessage('Login successful');
      
      // Navigate to admin dashboard after successful login
      navigate('/profile');
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle error here (e.g., show error message)
    setMessage('Login failed. Please check your credentials.');
  }

  setSubmitting(false);
};


  return (
    <div className={className}>
      {message && (
        <Alert showIcon className="mb-4" type="danger">
          {message}
        </Alert>
      )}
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            handleSignIn(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Email"
                invalid={Boolean(errors.email && touched.email)}
                errorMessage={errors.email}
              >
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Email"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Password"
                invalid={Boolean(errors.password && touched.password)}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  component={PasswordInput}
                />
              </FormItem>
              <div className="flex justify-between mb-6">
                <Field className="mb-0" name="rememberMe" component={Checkbox}>
                  Remember Me
                </Field>
                <ActionLink to={forgotPasswordUrl}>Forgot Password?</ActionLink>
              </div>
              <Button block loading={isSubmitting} variant="solid" type="submit">
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
              <div className="mt-4 text-center">
                <span>{`Don't have an account yet?`} </span>
                <ActionLink to={signUpUrl}>Sign up</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
