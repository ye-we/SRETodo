import React from "react";
import { Button, Modal, Form, Radio, Checkbox, Input, DatePicker } from "antd";
import { useState } from "react";
import { useContext } from "react";
import TodoContext from "../../context/todo-context";

const TaskModal = ({ task }) => {
  const { modalState, setModalState, tasksState, setTasksState } =
    useContext(TodoContext);
  let { collections } = useContext(TodoContext);
  console.log(tasksState);
  const handleOk = () => {
    setModalState(1);
  };
  const handleCancel = () => {
    setModalState(1);
  };
  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    const date = new Date(values.date.$d).toISOString().split("T")[0];
    console.log(date);
    try {
      const res = await fetch(`/api/addNewTodo`, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          collection: values.collection,
          date: date,
        }),
      });
      const response = await res.json();
      console.log(response);
      setModalState(1);
      setTasksState(!tasksState);
    } catch (err) {
      console.log("Adding new todo error", err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Task Updates
  const updateTodo = async (values) => {
    console.log(values);
    const newTitle = values.newtitle || task.title;
    const completed = values.completed || false;
    try {
      const res = await fetch(`/api/updateTodo/${task.id}`, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          completed,
        }),
      });
      const response = await res.json();
      console.log(response);
      setTasksState(!tasksState);
      setModalState(1);
    } catch (err) {
      console.log("Adding new todo error", err);
    }
  };
  const updateTodoFailed = (error) => {
    console.log(error);
  };

  const handleDeleteTask = async () => {
    console.log(task.id);
    try {
      const res = await fetch(`/api/deleteTodo/${task.id}`, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(await res.json());
      setTasksState(!tasksState);
      setModalState(1);
    } catch (err) {
      console.log("error deleting todo", err);
    }
  };
  return (
    <>
      {modalState === 2 && (
        <Modal
          title="Add New Todo"
          open={modalState === 2}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{
            background: "#21212D",
          }}
          okButtonProps={{
            hidden: true,
          }}
          cancelButtonProps={{
            hidden: true,
          }}
        >
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-[80%]"
          >
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input The task title!",
                },
              ]}
            >
              <Input placeholder="Task title..." />
            </Form.Item>
            <Form.Item
              name="collection"
              rules={[
                {
                  required: true,
                  message: "Please select the collection!",
                },
              ]}
            >
              <Radio.Group onChange={onChange}>
                {collections.map((collection) => (
                  <Radio.Button key={collection.id} value={collection.id}>
                    {collection.name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item name="date">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Add Task</Button>
              <Button
                className="ml-5"
                onClick={() => {
                  setModalState(1);
                }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* Update task modal */}
      {modalState === 3 && (
        <div>
          <Modal
            title="Update Todo"
            open={modalState === 3}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{
              background: "#21212D",
            }}
            okButtonProps={{
              hidden: true,
            }}
            cancelButtonProps={{
              hidden: true,
            }}
          >
            <Form
              name="basic"
              onFinish={updateTodo}
              onFinishFailed={updateTodoFailed}
              autoComplete="off"
              className="w-[80%]"
            >
              <Form.Item name="newtitle">
                <Input defaultValue={task.title} placeholder="Task title..." />
              </Form.Item>
              <Form.Item name="completed" valuePropName="checked">
                <Checkbox>Completed</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Update Task</Button>
                <Button
                  className="ml-5"
                  onClick={() => {
                    setModalState(1);
                  }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
      {modalState === 4 && (
        <div>
          <Modal
            title="Delete Todo"
            open={modalState === 4}
            onOk={handleDeleteTask}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
            style={{
              background: "#21212D",
            }}
            okButtonProps={{
              className: "text-white border-solid bg-red-700 hover:bg-red-500",
            }}
            cancelButtonProps={{
              className: "text-black",
            }}
          >
            <h1>Are you sure you want to delete this todo?</h1>
          </Modal>
        </div>
      )}
    </>
  );
};

export default TaskModal;
