const DynamicTitle = (dynamicTitle) => {
  return (document.title = dynamicTitle + " | Child Adoption System");
};

export default DynamicTitle;
