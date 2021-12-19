import List from "./list";
import { useState } from "react";

export default function Group({id, name, isOpen = false, data, selectedItem, setSelectedItem, onClick}) {
  const [state, setState] = useState(isOpen)
  const toggle = () => setState(!state)
  if (state) {
    return (
      <div id={`group-${id}`}>
        <h3 onClick={toggle}>{name}</h3>
        <List data={data} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
      </div>
    )
  }
  else {
    return (
      <div id={`group-${id}`}>
        <h3 onClick={toggle}>{name}</h3>
      </div>
    )
  }
}