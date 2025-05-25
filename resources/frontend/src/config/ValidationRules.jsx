export const validationRules = {
  email: [
    { required: true, messageId: 'register.email_required' },
    { type: 'email', messageId: 'register.email_invalid' },
  ],
  password: [
    { required: true, messageId: 'register.password_required' },
    {
      min: 3,
      messageId: 'register.password_minlength',
      messageParams: { min: 3 },
    },
  ],
  required: [{ required: true, messageId: 'login.required_password' }],
  required_input: [{ required: true, messageId: 'message.input_required' }],
};
