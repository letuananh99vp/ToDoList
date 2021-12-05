import React, { useState } from "react";
import FormAdd from "./components/FormAdd";

interface RecordType {
  titleTask: string;
  desc: string;
  dueDate: string;
  piority: string;
  id: number;
  isCompleted: boolean;
}

const ToDoList = () => {
  const [dataTask, setDataTask] = useState([]);
  const dataLength = localStorage.getItem("dataTask")?.length;

  React.useEffect(() => {
    const getDataLocal = localStorage.getItem("dataTask");
    const getDataTask = getDataLocal !== null ? JSON.parse(getDataLocal) : [];
    setDataTask(getDataTask);
  }, [dataLength]);

  return (
    <div className="display-flex">
      <FormAdd />
      <div className="add-form">
        <div className="section-title">
          <h2>To Do List</h2>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
        <div className="wrapper">
          {dataTask?.length > 0 &&
            dataTask?.map((item: RecordType) => (
              <ItemToDo title={item?.titleTask} dataTask={dataTask}>
                <FormAdd record={item} type="edit" />
              </ItemToDo>
            ))}
        </div>
      </div>
    </div>
  );
};

const ItemToDo = ({ title, dataTask, children }: any) => {
  const { record } = children?.props;
  const [isOpen, setOpen] = useState(false);
  const [arrCheckBox, setArrCheckBox] = useState<number[]>();
  debugger;

  // Delete item todo
  const removeToDo = (record: RecordType) => {
    dataTask?.forEach(
      (item: RecordType, index: number) =>
        item?.id === record?.id && dataTask.splice(index, 1)
    );
    localStorage.setItem("dataTask", JSON.stringify(dataTask));
    alert("Successfully deleted");
  };

  const changeCheckbox = (id: number, e: any) => {
    const check = e.target.checked;
    let arrId: number[] = [];
    arrCheckBox?.map((item, index) =>
      item !== id
        ? arrId.push(id)
        : item === id && !check
        ? arrCheckBox.splice(index, 1)
        : undefined
    );
    setArrCheckBox(arrId);
  };
  return (
    <div className="item-wrapper">
      <div className={`item-title ${isOpen ? "open" : ""}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            onChange={(e) => changeCheckbox(record?.id, e)}
          />
          <div className="title">{title}</div>
        </div>
        <div className="btn">
          <button onClick={() => setOpen(!isOpen)} className="detail">
            Detail
          </button>
          <button onClick={() => removeToDo(record)} className="remove">
            Remove
          </button>
        </div>
      </div>
      <div className={`item-record ${!isOpen ? "collapsed" : ""}`}>
        <div className="item-content">{children}</div>
      </div>
    </div>
  );
};

export default ToDoList;
