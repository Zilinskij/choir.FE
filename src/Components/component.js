export function ButtonNoty({ onClick, nazva }) {
  return (
    <button className="button-noty"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }} style={{ marginLeft: '1em' }}>
      {nazva}
    </button>
  );
};