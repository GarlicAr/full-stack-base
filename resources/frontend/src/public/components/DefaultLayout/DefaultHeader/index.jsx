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
  ];

  return (
    <div className="container">
      <div className="content">
        <div className="right-side-header">
          <Menu mode="horizontal" items={items} />
        </div>
      </div>
    </div>
  );
}
