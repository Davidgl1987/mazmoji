const Element = ({ type, x, y }) => {
  return <div className={"element " + type}>{type}</div>;
};

export default Element;
