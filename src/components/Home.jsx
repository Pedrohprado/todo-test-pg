import React from 'react';
import AddNewTask from './AddNewTask';
import Button from './Button';

const Home = () => {
  const [value, setValue] = React.useState(null);
  const [task, setTask] = React.useState(false);

  React.useEffect(() => {
    const getInfo = async () => {
      const response = await fetch('http://localhost:3000/api/todos');
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
          await fetch(`http://localhost:3000/api/todo/${id}`, {
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
    <div className=' w-screen h-screen flex flex-col items-center justify-center bg-white'>
      <h2>home page</h2>
      <ul className='bg-gray-200 w-5/6 max-h-5/6 overflow-y-auto p-3'>
        {value
          ? value.map(({ id, title, done }) => (
              <div
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
              </div>
            ))
          : null}
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
