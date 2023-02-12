import React from "react";
import { Button, Modal, Form, Radio, Checkbox, Input, DatePicker } from "antd";
import { useState } from "react";
import { useContext } from "react";
import TodoContext from "../../context/todo-context";

const TaskModal = ({ task }) => {
  const {
    modalState,
    setModalState,
    tasksState,
    setTasksState,
    setCollections,
  } = useContext(TodoContext);
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
      const res = await fetch(
        `https://todo-dashobard.onrender.com/api/addNewTodo`,
        {
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
        }
      );
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
      const res = await fetch(
        `https://todo-dashobard.onrender.com/api/updateTodo/${task.id}`,
        {
          method: "POST",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newTitle,
            completed,
          }),
        }
      );
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
    console.log(task);
    try {
      const res = await fetch(
        `https://todo-dashobard.onrender.com/api/deleteTodo/${task.id}`,
        {
          method: "POST",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(await res.json());
      setTasksState(!tasksState);
      setModalState(1);
    } catch (err) {
      console.log("error deleting todo", err);
    }
  };

  const addNewCollection = async (values) => {
    try {
      const res = await fetch(
        `https://todo-dashobard.onrender.com/api/addNewCollection`,
        {
          method: "POST",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
          }),
        }
      );
      console.log(await res.json());
      setCollections([
        ...collections,
        { name: values.name, id: collections[collections.length - 1].id + 1 },
      ]);
      setModalState(1);
    } catch (err) {
      console.log(err);
    }
  };
  const addNewCollectionFailed = (err) => {
    console.log("add new collection failed", err);
  };

  return (
    <>
      {modalState === 2 && (
        <Modal
          title="Add New Todo"
          open={modalState === 2}
          onOk={handleOk}
          onCancel={handleCancel}
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
              <Input
                placeholder="Task title..."
                className="bg-inherit placeholder:text-white border-gray-600 text-white"
              />
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
                  <Radio.Button
                    key={collection.id}
                    value={collection.id}
                    style={{
                      background: "transparent",
                      color: "white",
                    }}
                  >
                    {collection.name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item name="date">
              <DatePicker
                format="YYYY-MM-DD"
                className="bg-inherit placeholder:text-white border-gray-600 text-white"
                style={{
                  color: "white",
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  border: "none",
                }}
                className="text-white bg-gradient-to-bl from-pink to-purple-500 rounded-md "
              >
                Add Task
              </Button>
              <Button
                className="ml-5 text-white bg-slate-700"
                style={{
                  border: "none",
                }}
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
                <Input
                  defaultValue={task.title}
                  placeholder="Task title..."
                  className="bg-inherit placeholder:text-white border-gray-600 text-white"
                />
              </Form.Item>
              <Form.Item name="completed" valuePropName="checked">
                <Checkbox className="text-white">Completed</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{
                    border: "none",
                  }}
                  className="text-white bg-gradient-to-bl from-pink to-purple-500 rounded-md "
                >
                  Update Task
                </Button>
                <Button
                  className="ml-5 text-white"
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
            okButtonProps={{
              className: "text-white border-solid bg-red-700 hover:bg-red-500",
            }}
            cancelButtonProps={{
              className: "text-white",
            }}
          >
            <h1 className="text-white">
              Are you sure you want to delete this todo?
            </h1>
          </Modal>
        </div>
      )}
      {modalState === 5 && (
        <div>
          <Modal
            title="Add A New Collection"
            open={modalState === 5}
            onOk={handleDeleteTask}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              hidden: true,
            }}
            cancelButtonProps={{
              hidden: true,
            }}
            bodyStyle={{
              color: "white",
            }}
          >
            <Form
              name="basic"
              onFinish={addNewCollection}
              onFinishFailed={addNewCollectionFailed}
              autoComplete="off"
              className="md:w-[80%]"
            >
              <Form.Item name="name">
                <Input
                  placeholder="Collection name..."
                  className="bg-inherit placeholder:text-white border-gray-600 text-white"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{
                    border: "none",
                  }}
                  className="text-white md:text-lg text-sm bg-gradient-to-bl from-pink to-purple-500 rounded-md "
                >
                  Add New Collection
                </Button>
                <Button
                  className="ml-5 text-white"
                  onClick={() => {
                    setModalState(1);
                  }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>{" "}
          </Modal>
        </div>
      )}
    </>
  );
};

export default TaskModal;
