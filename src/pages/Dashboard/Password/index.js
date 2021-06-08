import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  notification
} from 'antd';
import { useDispatch } from 'react-redux';
import { actChangePasswordAsync } from '../../../store/user/actions';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function PassWord() {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({
    password,
    new_password,
    confirm_new_password
  }) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const res = await dispatch(actChangePasswordAsync({
      password,
      new_password,
      confirm_new_password
    }))

    if (!res.ok) {
      notification.error({
        message: 'Oops!',
        description: res.message
      })
    } else {
      notification.success({
        message: 'Thành công',
        description: 'Đổi mật khẩu thành công'
      })
    }

    setIsLoading(false);
    
  };

  const validateConfirmNewPassword = (params) => {
    return {
      validator(_, value) {
        if (!value || params.getFieldValue('new_password') === value) {
          return Promise.resolve();
        }
  
        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
      },
    }
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError={true}
    >
      <Form.Item
        name="password"
        label="Mật khẩu cũ"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu cũ!',
          },
        ]}
        hasFeedback={false}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="new_password"
        label="Mật khẩu mới"
        rules={[
          {
            required: true,
            message: 'Mật khẩu mới là bắt buộc!',
          },
        ]}
        hasFeedback={false}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm_new_password"
        label="Xác nhận mật khẩu mới"
        dependencies={['new_password']}
        hasFeedback={false}
        rules={[
          {
            required: true,
            message: 'Xác nhận mật khẩu mới là bắt buộc!',
          },
          validateConfirmNewPassword,
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Đổi mật khẩu
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PassWord