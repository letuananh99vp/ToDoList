import { EyeOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Select, Table } from "antd";
import React, { useState } from "react";
import {
  addUserModel,
  getDanhSachUserModel,
} from "../../../model/chokhachthuexe";
import FormChonXe from "./FormChonXe";

const TableChoThueXe = () => {
  const [danhSach, setDanhSach] = useState([]);
  const [danhSachDuPhong, setDanhSachDuPhong] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleChonXe, setVisibleChonXe] = useState(false);
  const [form] = Form.useForm();
  const [recordKH, setRecordKH] = useState();

  const getDSUsers = async () => {
    const result = await getDanhSachUserModel();
    setDanhSach(result);
    setDanhSachDuPhong(result);
  };

  React.useEffect(() => {
    getDSUsers();
  }, []);

  const changeValueSearch = (val: any) => {
    const valueSearch = val.target.value;
    let sourceArray: any = danhSach;
    let newArray: any = [];
    if (valueSearch.length <= 0) {
      newArray = sourceArray;
    } else {
      valueSearch.toLowerCase();
      for (let item of sourceArray) {
        if (
          item?.hoTen?.toLowerCase().indexOf(valueSearch.toLowerCase()) > -1
        ) {
          newArray.push(item);
        }
      }
    }
    setDanhSachDuPhong(newArray);
  };

  const onFinish = async (values: any) => {
    const result = await addUserModel({ ...values });
    setDanhSach(result);
    setDanhSachDuPhong(result);
    setVisible(false);
  };

  const changeForm = () => {
    setVisibleChonXe(false);
  };

  const renderLast = (record: any) => {
    return (
      <React.Fragment>
        <Button
          type="primary"
          shape="circle"
          title="Danh sách xe"
          onClick={() => {
            setVisibleChonXe(true);
            setRecordKH(record);
          }}
        >
          <EyeOutlined />
        </Button>
      </React.Fragment>
    );
  };

  const columns: any = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: "70px",
    },
    {
      title: "Họ và tên khách hàng",
      dataIndex: "hoTen",
      width: "200px",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: "200px",
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      width: "200px",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      width: "250px",
    },
    {
      title: "Thao tác",
      align: "center",
      render: (record: any) => renderLast(record),
      fixed: "right",
      width: 100,
    },
  ];
  return (
    <>
      <Button
        style={{ marginBottom: "10px", marginRight: "10px" }}
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
      >
        Thêm mới
      </Button>
      <Input
        placeholder="Nhập tên khách hàng"
        style={{ width: "30%" }}
        onChange={changeValueSearch}
      />
      <h3
        style={{
          display: "inline-block",
          margin: "0 10px 10px 50px",
          float: "right",
        }}
      >
        Tổng số:
        <Input
          style={{
            width: "90px",
            fontWeight: 700,
            fontSize: 18,
            marginLeft: 10,
          }}
          value={danhSachDuPhong?.length ?? 0}
        />
      </h3>

      <Table
        dataSource={danhSachDuPhong}
        columns={columns}
        bordered
        pagination={false}
      ></Table>
      <Drawer
        title="Thêm mới khách hàng"
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        width="30%"
      >
        <Form labelCol={{ span: 24 }} form={form} onFinish={onFinish}>
          <Form.Item
            name={["hoTen"]}
            label="Họ và tên"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            name={["soDienThoai"]}
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name={["gioiTinh"]}
            label="Giới tính"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn giới tính">
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={["diaChi"]}
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Nhập địa chỉ" rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title="Chọn xe cần thuê"
        placement="right"
        onClose={() => setVisibleChonXe(false)}
        visible={visibleChonXe}
        width="40%"
      >
        <FormChonXe changeForm={changeForm} recordKH={recordKH} />
      </Drawer>
    </>
  );
};
export default TableChoThueXe;
