import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { ToDoList as IToDoList } from "../typing";

// Form initial state
const INITIAL_STATE = {
  titleTask: "",
  desc: "",
  dueDate: moment().format("YYYY-MM-DD"),
  piority: "Normal",
};

const FormAdd = (props: {
  record?: IToDoList.Record;
  type?: string;
  renderIndex?: any;
}) => {
  const { record, type, renderIndex } = props;
  const { handleSubmit, register } = useForm();
  const [formData, setFormData] = useState(type ? record : INITIAL_STATE);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (value: IToDoList.Record) => {
    const getDataLocal = localStorage.getItem("dataTask");
    const getDataTask = getDataLocal !== null ? JSON.parse(getDataLocal) : [];

    // edit
    if (type) {
      const newValEdit = { ...record, ...value };
      getDataTask?.forEach(
        (item: any, index: number) =>
          item?.id === newValEdit?.id &&
          getDataTask.splice(index, 1, newValEdit)
      );
      renderIndex();
      localStorage.setItem("dataTask", JSON.stringify(getDataTask));
      return;
    }

    // add
    const newVal = value;
    newVal.id = new Date().valueOf();
    setFormData(INITIAL_STATE);
    renderIndex();

    let arrData = [];
    arrData.push(...getDataTask);
    arrData.push(newVal);
    localStorage.setItem("dataTask", JSON.stringify(arrData));
  };

  return (
    <div className={`add-form ${type ? type : ""}`}>
      {!type && (
        <div className="section-title">
          <h2>New Task</h2>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add new task..."
            {...register("titleTask")}
            required
            value={formData?.titleTask}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control-textarea"
            rows={4}
            cols={50}
            {...register("desc")}
            value={formData?.desc}
            onChange={handleChange}
          />
        </div>
        <div className="display-flex">
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              className="form-control due-date"
              {...register("dueDate")}
              value={formData?.dueDate}
              onChange={handleChange}
              min={moment().format("YYYY-MM-DD")}
            />
          </div>
          <div className="form-group">
            <label>Piority</label>
            <select
              className="form-control piority"
              {...register("piority")}
              value={formData?.piority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <button type="submit" className="default-btn">
            {type ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAdd;
