import { useNavigate } from 'react-router-dom';

function Header() {
  const nav = useNavigate();

  return (
    <div className="container header_btn_wrap">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          nav('/');
        }}
      >
        HOME
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          nav('/list');
        }}
      >
        List
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          nav('/write');
        }}
      >
        Write
      </button>
    </div>
  );
}

export default Header;
