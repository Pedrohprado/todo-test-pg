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
    <div className=' w-full h-3/4 absolute bottom-0 right-0 rounded-t-lg flex flex-col items-center justify-center bg-white'>
      <ul className=' w-5/6 max-h-42 overflow-y-auto p-2'>
        {value ? (
          value.map(({ id, title, done }) => (
            <div
              key={id}
              className=' flex w-full justify-between items-center mb-3 border py-1 px-4 rounded'
            >
              <Link to={`/task/${id}`} className='w-5/6'>
                <li>{title}</li>
              </Link>

              <input
                type='checkbox'
                checked={done}
                onChange={() => handleCheckBox(id)}
                id={id}
              />
            </div>
          ))
        ) : (
          <p className=' font-normal text-sm'>sem tarefas por aqui!</p>
        )}
      </ul>

      <Button
        name='+'
        setTask={() => setTask(true)}
        className={` text-white py-2 px-4 bg-black rounded font-medium fixed bottom-2 right-7`}
      />
      {task ? <AddNewTask setTask={setTask} /> : null}
    </div>
  );
};

export default Home;
