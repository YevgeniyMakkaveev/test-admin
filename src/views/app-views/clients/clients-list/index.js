import React, { Component } from "react";
import { Card, Table, Tag, Tooltip, message, Button, Spin } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";

import EditProfile from "./change";

export class ClientList extends Component {
  state = {
    users: null,
    userProfileVisible: false,
    selectedUser: null,
    loading: true,
  };

  getData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      if (!response) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  setUsers = async () => {
    const data = await this.getData();
    this.setState({
      users: data,
      loading: false,
    });
  };
  componentDidMount() {
    if (!this.state.users) this.setUsers();
  }

  deleteUser = (userId) => {
    this.setState({
      users: this.state.users.filter((item) => item.id !== userId),
    });
    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  };

  showUserProfile = (userInfo) => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };

  render() {
    if (this.state.loading) {
      return <Spin />;
    }
    const { users, userProfileVisible, selectedUser } = this.state;
    this.getData();
    const tableColumns = [
      {
        title: "User",
        dataIndex: "name",
        render: (_, record) => (
          <div className="d-flex">
            <AvatarStatus name={record.name} subTitle={record.email} />
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Username",
        dataIndex: "username",
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "phone",
        dataIndex: "phone",
        render: (phone) => <span>{phone} </span>,
        sorter: (a, b) => a[0] - b[0],
      },
      {
        title: "Website",
        dataIndex: "website",
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => (
          <div className="text-right">
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteUser(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <Card bodyStyle={{ padding: "0px" }}>
        <Table columns={tableColumns} dataSource={users} rowKey="id" />
        <EditProfile
          data={selectedUser}
          visible={userProfileVisible}
          close={() => {
            this.closeUserProfile();
          }}
        />
      </Card>
    );
  }
}

export default ClientList;
