import useStorage from './storageService'

export default function useGroups(data) {
  const [groups, setGroups] = useStorage([{
    name: "Default Group",
    data: data
  }])
  
  return [groups, setGroups]
}