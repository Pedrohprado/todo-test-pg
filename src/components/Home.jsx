import React from 'react';
import AddNewTask from './AddNewTask';
import Button from './Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const [value, setValue] = React.useState(null);
  const [task, setTask] = React.useState(false);

  React.useEffect(() => {
    const getInfo = async () => {
      const response = await fetch('https://192.168.112.1:3000/api/todos');
      const data = await response.json();
      setValue(data);
    };

    getInfo();
  }, []);

  function handleCheckBox(id) {
    const updateItems = value.map((item) => {
      if (item.id === id) {
        const sendInfo = async () => {
          const send = {
            done: !item.done,
          };
          await fetch(`https://192.168.112.1:3000/api/todo/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(send),
          });
        };
        sendInfo();
        return { ...item, done: !item.done };
      }
      return item;
    });
    setValue(updateItems);
    console.log(updateItems);
  }
  return (
    <div className=' w-full h-2/3 absolute bottom-0 right-0 rounded-t-lg flex flex-col items-center justify-center bg-white'>
      <h2>home page</h2>
      <ul className='bg-gray-200 w-5/6 h-1/4 max-h-5/6 overflow-y-auto p-3'>
        {value ? (
          value.map(({ id, title, done }) => (
            <Link
              to={`/task/${id}`}
              key={id}
              className=' flex w-full justify-between items-center mb-2'
            >
              <li>{title}</li>
              <input
                type='checkbox'
                checked={done}
                onChange={() => handleCheckBox(id)}
                id={id}
              />
            </Link>
          ))
        ) : (
          <p className=' font-normal text-sm'>sem tarefas por aqui!</p>
        )}
      </ul>

      <Button
        name='add new task'
        setTask={() => setTask(true)}
        className={' text-white p-2 bg-black rounded font-medium'}
      />
      {task ? <AddNewTask setTask={setTask} /> : null}
    </div>
  );
};

export default Home;
