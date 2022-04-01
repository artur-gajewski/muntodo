import './Row.css';

function Row(props) {
  const doneStyle = props.item.incomplete ? 'item' : 'item-done';
  return (
    <div className="row" onClick={() => props.onSelectRow(props.item.id)}>
      <div className={doneStyle}>{props.item.title}</div>
    </div>
  );
}

export default Row;
