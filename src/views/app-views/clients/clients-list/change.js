import React, { Component } from "react";
import {
  Form,
  Button,
  Drawer,
  Input,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
  Spin,
} from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";

export class EditProfile extends Component {
  state = {
    spinner: false,
  };

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render() {
    const { data, visible, close } = this.props;
    if (!data) return <></>;
    const { name, username, email, address, phone, website } = data;

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const onUploadAavater = (info) => {
      const key = "updatable";
      if (info.file.status === "uploading") {
        message.loading({ content: "Uploading...", key, duration: 1000 });
        return;
      }
      if (info.file.status === "done") {
        this.getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            avatarUrl: imageUrl,
          })
        );
        message.success({ content: "Uploaded!", key, duration: 1.5 });
      }
    };

    const fakePatch = () => {
      this.setState({
        spinner: true,
      });
      setTimeout(() => {
        closeAll();
      }, 1000);
    };
    const closeAll = () => {
      this.setState({
        spinner: false,
      });
      close();
    };
    return (
      <Drawer
        width={600}
        placement="right"
        onClose={close}
        closable={false}
        visible={visible}
      >
        <Flex
          alignItems="center"
          mobileFlex={false}
          className="text-center text-md-left"
        >
          <div className="ml-md-3 mt-md-0 mt-3">
            <Upload
              onChange={onUploadAavater}
              showUploadList={false}
              action={this.avatarEndpoint}
            >
              <Button type="primary">Change Avatar</Button>
            </Upload>
          </div>
        </Flex>
        <div className="mt-4">
          <Form
            name="basicInformation"
            layout="vertical"
            initialValues={{
              name: name,
              email: email,
              username: username,
              phoneNumber: phone,
              website: website,
              address: ` ${address.street} ${address.suite} `,
              city: address.city,
              postcode: address.zipcode,
            }}
            onFinishFailed={onFinishFailed}
          >
            <Row>
              <Col xs={24} sm={24} md={24} lg={16}>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Date of Birth" name="dateOfBirth">
                      <DatePicker className="w-100" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Phone Number" name="phoneNumber">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Website" name="website">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item label="Address" name="address">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="City" name="city">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Post code" name="postcode">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => fakePatch()}
                >
                  Save Change
                </Button>
                {this.state.spinner ? <Spin /> : null}
              </Col>
            </Row>
          </Form>
        </div>
      </Drawer>
    );
  }
}

export default EditProfile;
