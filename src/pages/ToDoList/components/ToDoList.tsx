import { useState } from "react";
import type { ToDoList as IToDoList } from "../typing";

const ItemToDo = ({
  title,
  dataTask,
  renderIndex,
  changeValue,
  children,
}: any) => {
  const { record } = children?.props;
  const [isOpen, setOpen] = useState(false);

  const changeCheckbox = (id: number, e: any) => {
    const check = e.target.checked;
    changeValue({ id, isCompleted: check });
  };

  // Delete item todo
  const removeToDo = (record: IToDoList.Record) => {
    dataTask?.forEach(
      (item: IToDoList.Record, index: number) =>
        item?.id === record?.id && dataTask.splice(index, 1)
    );
    localStorage.setItem("dataTask", JSON.stringify(dataTask));
    renderIndex();
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

export default ItemToDo;
