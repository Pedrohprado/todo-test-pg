/* eslint-disable react/prop-types */

import React from 'react';
import Button from '../Button';

const AddNewTask = ({ setTask }) => {
  const [value, setValue] = React.useState('');
  const [res, setRes] = React.useState('');
  const [mensage, setMensage] = React.useState('');

  React.useEffect(() => {
    if (res) {
      setMensage('task created with sucess!');
      setValue('');
    }
    const timeout = setTimeout(() => {
      setMensage(null);
    }, 3000);

    return () => {
      clearInterval(timeout);
    };
  }, [res]);

  async function sendTaks(body) {
    const send = {
      title: body,
    };
    const response = await fetch('http://192.168.208.1:3000/api/addtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send),
    });
    const data = await response.json();
    setRes(data);
    console.log(data);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (value) {
      sendTaks(value);
    }
  }

  return (
    <div className=' absolute z-10 top-0 right-0 w-full h-screen bg-black/50 flex items-center justify-center'>
      <div className=' w-5/6 h-1/2 bg-white rounded flex flex-col items-center justify-start py-3'>
        <div className=' w-5/6 flex flex-col items-end justify-center mb-10'>
          <Button
            name='x'
            setTask={() => setTask(false)}
            className={
              'px-5 py-2 bg-gray-100 rounded font-bold hover:bg-gray-300'
            }
          />
        </div>
        <p>Anote uma nova tarefa</p>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center gap-5 w-5/6 mt-5'
        >
          <input
            type='text'
            className=' border-2 w-5/6 py-1 px-2'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            name='anotar'
            className={' text-white py-2 px-5 bg-black rounded font-medium'}
          />
        </form>

        {mensage ? (
          <p className=' w-5/6 py-5 px-2 flex items-center justify-center fixed top-5 right-auto z-100 bg-white border-gray-100 rounded'>
            {mensage}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default AddNewTask;
