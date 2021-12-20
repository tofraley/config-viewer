
import { useContext } from "react";
import FeatureContext from './feature-context'

export default function UnlessFeature({name, children }) {
  const features = useContext(FeatureContext)
  if(!features.find(f => f === name)) { 
    return children
  }
  return null
}
