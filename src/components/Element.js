const Element = ({ tiles, x, y }) => {
  if (!Array.isArray(tiles)) return <></>;
  return (
    <table className="elements">
      <tbody>
        {tiles.map((row, r) => (
          <tr className="element-row" key={r}>
            {row.map((col, c) => (
              <td key={c} className={"element-col " + col}>
                {col}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Element;
