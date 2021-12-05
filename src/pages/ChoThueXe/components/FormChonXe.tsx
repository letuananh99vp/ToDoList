import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { getDanhSachXeModel } from "../../../model/chokhachthuexe";

const FormChonXe = (props: { changeForm: any; recordKH: any }) => {
  const { changeForm, recordKH } = props;
  const [form] = Form.useForm();
  const [danhSach, setDanhSach] = useState([]);
  const [danhSachXeChon, setDanhSachXeChon] = useState([]);
  const [formData, setFormData] = useState<any>();

  const getDSXe = async () => {
    const result = await getDanhSachXeModel();
    setDanhSach(result);
  };

  React.useEffect(() => {
    getDSXe();
  }, []);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    const newId = id.replace(/_/g, ".");
    setFormData((prevState: any) => ({ ...prevState, [newId]: value }));
  };

  const onFinishChonXe = (values: any) => {
    const newVal = values;
    newVal.thoiGianBatDau = newVal?.thoiGian?.[0];
    newVal.thoiGianKetThuc = newVal?.thoiGian?.[1];
    newVal.danhSachXeThue = danhSachXeChon;
    newVal.khachHang = recordKH;
    const dataHopDong = { ...newVal, ...formData };
    localStorage.setItem("hopDong", JSON.stringify(dataHopDong));
    message.success("Lưu hợp đồng vào local thành công");
    changeForm();
  };
  const onChange = (val: any) => {
    let arr: any = [];
    danhSach?.map((item: { id: string }) =>
      val?.map((x: string) => item?.id === x && arr.push(item))
    );
    setDanhSachXeChon(arr);
  };

  const handleView = () => {
    form
      .validateFields()
      .then((values) => {
        Modal.confirm({
          title: "Hợp đồng tạm",
          width: 1000,
          onOk() {
            onFinishChonXe(values);
          },
          okText: "Xác nhận",
          cancelText: "Hủy",
          content: (
            <div>
              <Divider orientation="left" plain>
                Thông tin khách hàng
              </Divider>
              <Descriptions>
                <Descriptions.Item label="Họ và tên">
                  {recordKH?.hoTen}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {recordKH?.soDienThoai}
                </Descriptions.Item>
                <Descriptions.Item label="Giới tính">
                  {recordKH?.gioiTinh}
                </Descriptions.Item>
                <Descriptions.Item label="Địa Chỉ" span={3}>
                  {recordKH?.diaChi}
                </Descriptions.Item>
              </Descriptions>
              <Divider orientation="left" plain>
                Thông tin xe
              </Divider>

              <Form form={form} labelCol={{ span: 24 }}>
                <Form.Item
                  name="thoiGian"
                  label="Thời gian thuê"
                  initialValue={[
                    values?.thoiGianDanhGia?.[0]
                      ? moment(values?.thoiGianDanhGia?.[0])
                      : undefined,
                    values?.thoiGianDanhGia?.[1]
                      ? moment(values?.thoiGianDanhGia?.[1])
                      : undefined,
                  ]}
                >
                  <DatePicker.RangePicker
                    format="DD/MM/YYYY"
                    style={{ width: "100% " }}
                    placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
                  />
                </Form.Item>
                {danhSachXeChon?.map((item: any, index: number) => (
                  <Card>
                    <Row gutter={[16, 0]}>
                      <Col span={8}>
                        <Form.Item label="Tên xe" style={{ marginBottom: 5 }}>
                          <Input value={item?.tenXe}></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Biển số" style={{ marginBottom: 5 }}>
                          <Input value={item?.bienSo}></Input>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label="Dòng xe" style={{ marginBottom: 5 }}>
                          <Input value={item?.dongXe}></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                      <Col span={12}>
                        <Form.Item label="Hãng xe" style={{ marginBottom: 5 }}>
                          <Input value={item?.hangXe}></Input>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Đơn giá" style={{ marginBottom: 5 }}>
                          <Input value={item?.donGia}></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 0]}>
                      <Col span={12}>
                        <Form.Item label="Mô tả" style={{ marginBottom: 5 }}>
                          <Input.TextArea
                            rows={3}
                            value={item?.moTa}
                          ></Input.TextArea>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name={["danhSachXeThue", index, "tinhTrangXe"]}
                          label="Tình trạng xe"
                          style={{ marginBottom: 5 }}
                        >
                          <Input.TextArea
                            rows={3}
                            placeholder="Nhập tình trạng xe"
                            onChange={handleChange}
                          ></Input.TextArea>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Row gutter={[16, 0]}>
                  <Col span={12}>
                    <Form.Item label="Tài sản đảm bảo" name="taiSan">
                      <Input
                        placeholder="Nhập tài sản đảm bảo"
                        onChange={handleChange}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="tienCoc" label="Tiền đặt cọc">
                      <Input
                        placeholder="Nhập số tiền đặt cọc"
                        onChange={handleChange}
                      ></Input>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          ),
        });
      })
      .catch((errorInfo) => {
        form.scrollToField(`${errorInfo?.errorFields?.[0]?.name?.[0]}`);
        return false;
      });
  };

  return (
    <Form labelCol={{ span: 24 }} form={form}>
      <Form.Item
        name="chonXe"
        label="Chọn xe"
        rules={[{ required: true }]}
        style={{ marginBottom: 5 }}
      >
        <Select
          showSearch
          placeholder="Nhập tên xe"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          mode="multiple"
        >
          {danhSach?.map(
            (item: { id: string; tenXe: string; trangThai: boolean }) => (
              <Select.Option key={item?.id} value={item?.id}>
                {item?.tenXe}
              </Select.Option>
            )
          )}
        </Select>
      </Form.Item>
      <Form.Item
        name="thoiGian"
        label="Thời gian thuê"
        rules={[{ required: true }]}
      >
        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          style={{ width: "100% " }}
          placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleView} style={{ marginRight: 8 }}>
          Xem trước
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormChonXe;
