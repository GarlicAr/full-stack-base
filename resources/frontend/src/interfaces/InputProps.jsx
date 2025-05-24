import PropTypes from 'prop-types';

export const InputPropTypes = {
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
  ]),
  required: PropTypes.bool,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  type: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['large', 'middle', 'small']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
  maxLength: PropTypes.number,
  allowClear: PropTypes.bool,
  addonAfter: PropTypes.node,
  label: PropTypes.string,
  rules: PropTypes.array,
  validations: PropTypes.object,
  className: PropTypes.string,
  validateTrigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  noStyle: PropTypes.bool,
  dependencies: PropTypes.arrayOf(PropTypes.string),
  hidden: PropTypes.bool,
  initialValue: PropTypes.any,
  password: PropTypes.bool,
  readOnly: PropTypes.bool,
  onClick: PropTypes.func,
  layout: PropTypes.object,
};
