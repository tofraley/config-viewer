
import { useContext } from "react";
import FeatureContext from '../components/feature-context'

export default function Feature({name, children }) {
  const features = useContext(FeatureContext)
  if(features.find(f => f === name)) { 
    return children
  }
  return null
}
