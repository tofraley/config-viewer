import useStorage from './storageService'

function getDefaultGroups(data) {

  const firstHalf = data.slice(0, data.length/2)
  const secondHalf = data.slice(data.length/2+1)
  return [{
    id: "first-half",
    name: "First Half",
    isOpen: true,
    data: firstHalf
  },
  {
    id: "second-half",
    name: "Second Half",
    isOpen: false,
    data: secondHalf
  }]
}

export default function useGroups(data) {
  const defaultGroups = getDefaultGroups(data)
  const [groups, setGroups] = useStorage(defaultGroups)
  
  return [groups, setGroups]
}