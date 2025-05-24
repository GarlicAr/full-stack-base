import { Button, Form, message } from 'antd';
import { useIntl } from 'react-intl';
import Input from '../Input/Input.jsx';
import { login } from '../../services/AuthServices.jsx';
import { showApiErrors } from '../../utils/showApiErrors.jsx';
import { useNavigate } from 'react-router-dom';
export default function LoginForm() {
  const [form] = Form.useForm();
  const intl = useIntl();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await login(values);
      message.success(intl.formatMessage({ id: 'login.success' }));
      form.resetFields();
      navigate('/', { replace: true });
    } catch (err) {
      showApiErrors(err);
    }
  };

  const onNavigateRegister = () => {
    navigate('/register', { replace: true });
  };

  return (
    <Form
      form={form}
      name={'login'}
      layout={'vertical'}
      onFinish={onFinish}
      className={'register-form'}
    >
      <Input
        name="email"
        placeholder={intl.formatMessage({ id: 'register.email_placeholder' })}
        validations={'email'}
        validateTrigger={['blur']}
      />
      <Input
        name="password"
        placeholder={intl.formatMessage({
          id: 'register.password_placeholder',
        })}
        password={true}
        validations={'required'}
        validateTrigger={['blur']}
      />
      <Button type="primary" htmlType="submit">
        {intl.formatMessage({ id: 'auth.login' })}
      </Button>

      <Button type="secondary" onClick={onNavigateRegister}>
        {intl.formatMessage({ id: 'auth.register' })}
      </Button>
    </Form>
  );
}
