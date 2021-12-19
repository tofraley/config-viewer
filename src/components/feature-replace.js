const FeatureReplace = ({ features, featureName, featureComponent, defaultComponent }) => {
  return features.find(f => f === featureName) ? 
    featureComponent : defaultComponent
};

export default FeatureReplace;