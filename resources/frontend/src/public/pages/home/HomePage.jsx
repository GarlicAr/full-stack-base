import { Button } from 'antd';
import axios from 'axios';
export default function HomePage() {
  axios.get('http://localhost:8000/sanctum/csrf-cookie', {
    withCredentials: true,
  });
  axios.get('http://localhost:8000/api/users', { withCredentials: true });

  return (
    <div className="text-red-500">
      Hello World!
      <Button type="text" className="btn">
        HEIL
      </Button>
    </div>
  );
}
