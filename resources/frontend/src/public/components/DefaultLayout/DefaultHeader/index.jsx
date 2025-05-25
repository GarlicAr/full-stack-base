import { Menu } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default function DefaultHeader() {
  const intl = useIntl();
  const navigate = useNavigate();

  const items = [
    {
      key: 'main',
      label: intl.formatMessage({ id: 'navigation.main' }),
      onClick: () => navigate('/'),
    },
    {
      key: 'posts',
      label: intl.formatMessage({ id: 'navigation.posts' }),
      onClick: () => navigate('/posts'),
    },
    {
      key: 'create_post',
      label: intl.formatMessage({ id: 'navigation.create_post' }),
      onClick: () => navigate('/posts/create'),
    },
    {
      key: 'profile',
      label: intl.formatMessage({ id: 'navigation.profile' }),
      onClick: () => navigate('/profile'),
    },
  ];

  return (
    <div className="container">
      <div className="content">
        <Menu mode="horizontal" items={items} />
      </div>
    </div>
  );
}
