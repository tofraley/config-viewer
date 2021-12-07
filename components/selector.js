import List from "./list";
import Search from "./search";
import { useState } from "react";

export default function Selector({data, selectedItem, setSelectedItem}) {
  const [filteredData, setFilteredData] = useState(data);
  const filter = (terms) => 
            setFilteredData(
              data.filter((d) => d.toLowerCase().startsWith(terms.toLowerCase()))
            );
  return (
    <>
      <Search changeHandler={(e) => filter(e.target.value)} />
      <List data={filteredData} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
    </>
  );
}
