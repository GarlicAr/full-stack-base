import { Menu, message } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import getCookie from '../../../../utils/getCookie.jsx';
import { BASE_URL } from '../../../../config/config.jsx';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth.jsx';

export default function DefaultHeader() {
  const intl = useIntl();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          },
        }
      );
      message.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error(error);
      message.error('Logout failed');
    }
  };

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

  if (!loading && user) {
    items.push({
      key: 'logout',
      label: intl.formatMessage({ id: 'auth.logout' }),
      onClick: handleLogout,
    });
  }

  return (
    <div className="container">
      <div className="content">
        <Menu mode="horizontal" items={items} />
      </div>
    </div>
  );
}
