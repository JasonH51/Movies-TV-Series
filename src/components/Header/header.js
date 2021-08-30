import './header.css';

function header() {
  return (
    <div>
      <span onClick={() => window.scroll(0, 0)} className="header">
        🎬 Movies & TV Series 🎥{' '}
      </span>
    </div>
  );
}

export default header;
