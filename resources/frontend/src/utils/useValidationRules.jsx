import { useIntl } from 'react-intl';
import { validationRules } from '../config/ValidationRules.jsx';

export default function useValidationRules() {
  const intl = useIntl();

  function getRules(validations) {
    if (!validations) return [];

    const keys = Array.isArray(validations) ? validations : [validations];

    return keys.flatMap((key) => {
      const defs = validationRules[key] || [];
      return defs.map(({ messageId, messageParams = {}, ...rest }) => ({
        ...rest,
        message: messageId
          ? intl.formatMessage({ id: messageId }, messageParams)
          : undefined,
      }));
    });
  }

  return { getRules };
}
