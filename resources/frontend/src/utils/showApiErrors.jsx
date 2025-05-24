import { message } from 'antd';

export function showApiErrors(err) {
  const data = err.response?.data;
  if (data?.errors) {
    Object.values(data.errors)
      .flat()
      .forEach((msg) => message.error(msg));
  } else if (data?.message) {
    message.error(data.message);
  } else {
    message.error('Something went wrong');
  }

  //TODO Add translations to error msgs
}
