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
import type { CommonProps } from '@/@types/common';
import { SignInCredential } from '../auth.type';
import { apiSignIn } from '../auth.service';
import { useAppDispatch } from '@/store';
import { setAuth } from '../auth.slice';
import useAuth from '@/utils/hooks/useAuth';
import { setUser } from '@/views/user/user.slice';

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean;
    forgotPasswordUrl?: string;
    signUpUrl?: string;
}

type SignInFormSchema = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email'),
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
    const dispatch = useAppDispatch();
    const { navigateToAuthenticatedEntry } = useAuth();

    const signIn = async (values: SignInCredential) => {
        try {
            const resp = await apiSignIn(values);
            if (resp) {
                const { token, user } = resp.data;
                dispatch(setAuth(token));
                dispatch(setUser({ user }));

                // Set success message
                setMessage(resp.message);

                navigateToAuthenticatedEntry();
                return {
                    status: resp.status,
                    message: resp.message,
                };
            }
        } catch (errors: any) {
            const errorMessage = errors?.response?.data?.message || errors.toString();
            setMessage(errorMessage);
            return {
                status: errors?.response?.status,
                message: errorMessage,
            };
        }
    };

    const handleSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        const { email, password } = values;
        setSubmitting(true);

        const result = await signIn({ email, password });

        if (result) {
            setMessage(result.message);
        }

        setSubmitting(false);
    };

    return (
        <div className={className}>
            {message && (
                <Alert
                    showIcon
                    className="mb-4"
                    type={message.startsWith('Sign-in successful!') ? 'success' : 'danger'}
                >
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
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                >
                                    Remember Me
                                </Field>
                                <ActionLink to={forgotPasswordUrl}>
                                    Forgot Password?
                                </ActionLink>
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>{`Don't have an account yet? `}</span>
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
