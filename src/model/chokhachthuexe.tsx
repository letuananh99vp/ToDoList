/* eslint-disable react-hooks/rules-of-hooks */
import { message } from "antd";
import { addUsers, getUsers, getXe } from "../services/chokhacthuexe";

export async function getDanhSachUserModel() {
  const result = await getUsers();
  return result?.data;
}

export async function addUserModel(payload: any) {
  const result = await addUsers(payload);
  if (result?.status === 201) {
    message.success("Thêm mới khách hàng thành công");
  }
  return getDanhSachUserModel();
}

export async function getDanhSachXeModel() {
  const result = await getXe();
  let arr: any = [];
  result?.data?.map(
    (item: { trangThai: boolean }) => !item?.trangThai && arr.push(item)
  );
  return arr;
}
