import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import DefaultHeader from './DefaultHeader';
import DefaultFooter from './DefaultFooter';

const { Content } = Layout;

export default function DefaultLayout() {
  return (
    <Layout className="layout">
      <DefaultHeader />

      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Outlet />
      </Content>

      <DefaultFooter />
    </Layout>
  );
}
