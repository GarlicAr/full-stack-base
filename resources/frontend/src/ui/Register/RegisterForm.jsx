import { Button, Form, message } from 'antd';
import { useIntl } from 'react-intl';
import Input from '../Input/Input.jsx';
import { register } from '../../services/AuthServices.jsx';
import { showApiErrors } from '../../utils/showApiErrors.jsx';
import { useNavigate } from 'react-router-dom';
export default function RegisterForm() {
  const [form] = Form.useForm();
  const intl = useIntl();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await register(values);
      message.success(intl.formatMessage({ id: 'register.success' }));
      form.resetFields();
      navigate('/login', { replace: true });
    } catch (err) {
      showApiErrors(err);
    }
  };

  return (
    <Form
      form={form}
      name={'register'}
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
        validations={'password'}
        validateTrigger={['blur']}
      />
      <Button type="primary" htmlType="submit">
        {intl.formatMessage({ id: 'auth.register' })}
      </Button>
    </Form>
  );
}
