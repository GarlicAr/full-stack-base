import { Button, Form, message } from 'antd';
import { useIntl } from 'react-intl';
import Input from '../Input/Input.jsx';

export default function RegisterForm() {
  const [form] = Form.useForm();
  const intl = useIntl();

  const onFinish = () => {
    try {
      form.validateFields();
    } catch (err) {
      message.error(intl.formatMessage({ id: `message.${err}` }));
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
