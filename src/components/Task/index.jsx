import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Task = () => {
  const [task, setTask] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getTask = async () => {
      const response = await fetch(`https://192.168.112.1:3000/api/todo/${id}`);
      const data = await response.json();
      setTask(data);
    };

    getTask();
  }, [id]);

  async function deleteTask() {
    const confirm = window.confirm('Deseja deletar a tarefa?');

    if (confirm) {
      await fetch(`https://192.168.112.1:3000/api/todo/${id}`, {
        method: 'DELETE',
      });

      navigate('/');
    }
  }

  if (task)
    return (
      <div>
        <h2>{task.title}</h2>
        <button
          onClick={deleteTask}
          className=' bg-red-300 text-red-700 font-bold py-2 px-4 rounded'
        >
          deletar
        </button>
      </div>
    );
};

export default Task;
