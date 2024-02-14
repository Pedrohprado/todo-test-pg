/* eslint-disable react/prop-types */

const Button = ({ name, setTask, className }) => {
  return (
    <button className={className} onClick={setTask}>
      {name}
    </button>
  );
};

export default Button;
