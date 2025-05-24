import React from 'react';
import { Form, Input as AntdInput } from 'antd';
import { InputPropTypes } from '../../interfaces/InputProps.jsx';
import useValidationRules from '../../utils/useValidationRules.jsx';

const Input = ({
  disabled = false,
  placeholder,
  name,
  required = false,
  prefix,
  suffix,
  type = 'text',
  onChange,
  size = 'large',
  value,
  onBlur,
  defaultValue,
  maxLength = 255,
  allowClear = false,
  addonAfter,
  label,
  validations,
  className,
  validateTrigger,
  noStyle = false,
  dependencies,
  hidden = false,
  initialValue,
  password = false,
  readOnly = false,
  onClick,
  layout,
}) => {
  const { getRules } = useValidationRules();

  return (
    <Form.Item
      name={name}
      label={label}
      initialValue={initialValue}
      rules={getRules(validations)}
      className={className}
      validateTrigger={validateTrigger}
      noStyle={noStyle}
      dependencies={dependencies}
      hidden={hidden}
      {...(layout || {})}
    >
      {password ? (
        <AntdInput.Password
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          prefix={prefix}
          suffix={suffix}
          type={type}
          onChange={onChange}
          size={size}
          value={value}
          onBlur={onBlur}
          defaultValue={defaultValue}
          maxLength={maxLength}
          allowClear={allowClear}
          addonAfter={addonAfter}
          onClick={onClick}
        />
      ) : (
        <AntdInput
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          prefix={prefix}
          suffix={suffix}
          type={type}
          onChange={onChange}
          size={size}
          value={value}
          onBlur={onBlur}
          defaultValue={defaultValue}
          maxLength={maxLength}
          allowClear={allowClear}
          addonAfter={addonAfter}
          readOnly={readOnly}
          onClick={onClick}
        />
      )}
    </Form.Item>
  );
};

Input.propTypes = InputPropTypes;
export default Input;
