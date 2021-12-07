
export default function Box({borderColor, children }) {
  const color = () => {
    if(borderColor == 'green') {
      return 'border-green-300';
    } else {
      return 'border-blue-300';
    }  
  };

  return (
    <div className={`border-4 border-solid rounded-lg ${color()}`}>
      { children }
    </div>
  );
}