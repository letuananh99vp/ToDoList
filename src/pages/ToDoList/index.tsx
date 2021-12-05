import React, { useState } from "react";
import FormAdd from "./components/FormAdd";
import ItemToDo from "./components/ToDoList";
import type { ToDoList as IToDoList } from "./typing";

const ToDoList = () => {
  const [dataTask, setDataTask] = useState<IToDoList.Record[]>([]);
  const [arrSearch, setNewArrSearch] = useState<IToDoList.Record[]>([]);

  const [arrCheckBox, setArrCheckBox] = useState([]);
  const [render, setRender] = useState(false);

  React.useEffect(() => {
    const getDataLocal = localStorage.getItem("dataTask");
    const getDataTask = getDataLocal !== null ? JSON.parse(getDataLocal) : [];
    setDataTask(getDataTask);
    setNewArrSearch(getDataTask);
  }, [render]);

  const changeRender = () => {
    setRender(!render);
  };

  // handle arr data checkbox
  const changeCheckBox = (val: { id: number; isCompleted: boolean }) => {
    let arrId: any = [];
    if (arrCheckBox?.length === 0) {
      arrId.push(val?.id);
    } else {
      arrCheckBox?.forEach((item, index) =>
        item !== val?.id && val?.isCompleted
          ? arrId.push(val?.id)
          : item === val?.id && !val?.isCompleted
          ? arrCheckBox.splice(index, 1)
          : undefined
      );
      arrId.push(...arrCheckBox);
    }
    arrId = arrId.filter(
      (item: number, index: number) => arrId.indexOf(item) === index
    );
    setArrCheckBox(arrId);
  };

  const removeSelect = () => {
    arrCheckBox?.forEach((item) => {
      dataTask?.forEach(
        (val, index) => val?.id === item && dataTask.splice(index, 1)
      );
    });
    localStorage.setItem("dataTask", JSON.stringify(dataTask));
    if (dataTask?.length === 0) setArrCheckBox([]);
    setRender(!render);
  };

  const changeValueSearch = (e: { target: { value: string } }) => {
    const valueSearch = e.target.value;
    let sourceArray = dataTask;
    let newArray: IToDoList.Record[] = [];
    if (valueSearch.length <= 0) {
      newArray = sourceArray;
    } else {
      valueSearch.toLowerCase();
      for (let item of sourceArray) {
        if (
          item?.titleTask.toLowerCase().indexOf(valueSearch.toLowerCase()) > -1
        ) {
          newArray.push(item);
        }
      }
    }
    setNewArrSearch(newArray);
  };

  return (
    <div className="display-flex-container">
      <FormAdd renderIndex={changeRender} />
      <div className="add-form">
        <div className="section-title">
          <h2>To Do List</h2>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={changeValueSearch}
          />
        </div>
        <div className="wrapper">
          {arrSearch?.length > 0 &&
            arrSearch?.map((item: IToDoList.Record) => (
              <ItemToDo
                title={item?.titleTask}
                dataTask={dataTask}
                renderIndex={changeRender}
                changeValue={changeCheckBox}
              >
                <FormAdd record={item} type="edit" renderIndex={changeRender} />
              </ItemToDo>
            ))}
        </div>
        {arrCheckBox?.length > 0 && (
          <div className="bulk-action">
            <div className="btn justify-content-center">
              <button className="done">Done</button>
              <button onClick={removeSelect} className="remove-select">
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
