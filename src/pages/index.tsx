import { Formik, Form, Field, FieldProps, FormikProps } from 'formik';
import { Card, Button, Alert, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import * as Yup from 'yup';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export interface IHomeProps {
}

interface LoginFormValues {
  email: string;
  password: string;
}

const Home: React.FC<IHomeProps> = ({}) => {

  const router = useRouter();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    signIn('credentials',{
      ...values,
      redirect: false
    }).then((result) => {
      if (result?.status === 200) {
        router.push('dashboard')
      }else{
        toast.error(result?.error)
      }
    })
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className='vh-100 d-flex align-items-center'>
      <Card style={{ width: '24rem' }} className="mx-auto">
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
          <Alert variant="info">
            <b> Use given credentials for testing... </b>  <br />
            <b> Email: </b> eve.holt@reqres.in <br />
            <b> Password: </b> cityslicka <br />
          </Alert>
          <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={handleSubmit}>
            {(formikProps: FormikProps<LoginFormValues>) => (
              <Form>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <Field name="email">
                    {(fieldProps: FieldProps<LoginFormValues['email']>) => (
                      <FormControl {...fieldProps.field} type="email" className={formikProps.errors.email && formikProps.touched.email ? 'is-valid' : ''} />
                    )}
                  </Field>
                  {formikProps.errors.email && formikProps.touched.email && (
                    <div className='invalid-feedback'>{formikProps.errors.email}</div>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel>Password</FormLabel>
                  <Field name="password">
                    {(fieldProps: FieldProps<LoginFormValues['password']>) => (
                      <FormControl {...fieldProps.field} type="password" className={formikProps.errors.email && formikProps.touched.email ? 'is-valid' : ''} />
                    )}
                  </Field>
                  {formikProps.errors.password && formikProps.touched.password && (
                    <div className='invalid-feedback'>{formikProps.errors.password}</div>
                  )}
                </FormGroup>

                <Button variant="primary" type="submit" className="d-flex mx-auto mt-3">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Home;
