export default function Search({changeHandler}) {
  return (
    <input 
      placeholder="Search..."
      className="mt-2 ml-2 text-lg pl-1 h-10 rounded border-2 border-blue-300 focus:outline-none w-1/2" type="search"  
      onChange={changeHandler} />
  );
}