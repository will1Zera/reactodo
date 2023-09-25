import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import C from './TaskForm.module.css'
import { ITask } from '../interfaces/Task';

type Props = {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    task?: ITask | null;
    handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(() => {
        if(task){
            setId(task.id);
            setTitle(task.title);
            setDifficulty(task.difficulty);
        }
    }, [task]);

    // Função que inclui uma nova tarefa
    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        // Previne o reload da página após o envio do formulário
        e.preventDefault();
        if(handleUpdate){
            handleUpdate(id, title, difficulty);
        } else{
            // Cria um id aleatoriamente
            const id = Math.floor(Math.random() *1000);

            const newTask: ITask = {id, title, difficulty};

            setTaskList!([...taskList, newTask]);

            setTitle("");
            setDifficulty(0);
        }
    }
    // Função que altera valores
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'title'){ // Altera o titulo
            setTitle(e.target.value);
        } else{ // Altera a dificuldade
            setDifficulty(parseInt(e.target.value));
        }
    }

  return (
    // Executa a função ao dar submit no formulário
    <form onSubmit={addTaskHandler} className={C.form}>
        <div className={C.input__container}>
            <label htmlFor="title">Título</label>
            <input type="text" name='title' placeholder='Digite o título' onChange={handleChange} value={title}/>
        </div>
        <div className={C.input__container}>
            <label htmlFor="difficulty">Dificuldade</label>
            <input type="text" name='difficulty' placeholder='Digite a dificuldade' onChange={handleChange} value={difficulty}/>
        </div>
        <input type="submit" value={btnText}/>
    </form>
  )
};

export default TaskForm;