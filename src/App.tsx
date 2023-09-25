import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import C from './App.module.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { ITask } from './interfaces/Task';
import Modal from './components/Modal';

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    )
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if(display){
      modal!.classList.remove("hide");
    } else{
      modal!.classList.add("hide");
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = {id, title, difficulty};

    const updateItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task;
    })

    setTaskList(updateItems);
    hideOrShowModal(false);
  }

  return (
    <>
      <Modal children={<TaskForm btnText='Editar' taskList={taskList} task={taskToUpdate} handleUpdate={updateTask}/>} />
      <Header />

      <main className={C.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText='Criar' taskList={taskList} setTaskList={setTaskList}/>
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
