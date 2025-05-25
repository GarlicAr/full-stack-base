import { Button, Form, Input as AntInput, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../../config/config.jsx';
import getCookie from '../../../../utils/getCookie.jsx';
import fetchCategories from '../../../../services/CategoriesServices.jsx';
import Input from '../../../../ui/Input/Input.jsx';

export default function Create() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    loadCategories();
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      await axios.post(`${BASE_URL}/api/posts`, values, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        },
      });

      message.success('Post created successfully!');
      form.resetFields();
      navigate('/posts', { replace: true });
    } catch (err) {
      console.error(err);
      message.error('Failed to create post');
    }
  };

  return (
    <div className={'flex flex-col items-center'}>
      <div className="title">CREATE POST</div>
      <Form
        form={form}
        name="create-post"
        layout="vertical"
        onFinish={onFinish}
        className="register-form"
      >
        <Input
          name={'title'}
          label="Title"
          validations={'required_input'}
          className={'text-amber-50'}
        />
        <Input
          name={'content'}
          label="content"
          validations={'required_input'}
        />

        <Form.Item
          name="category_ids"
          label="Categories"
          rules={[
            { required: true, message: 'Please select at least one category' },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select categories"
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create Post
        </Button>
      </Form>
    </div>
  );
}
