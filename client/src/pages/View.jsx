import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function View() {
  const nav = useNavigate();
  const param = useParams();
  const [item, setItem] = useState([]);

  useEffect(() => {
    const getBoardItem = () => {
      Axios.post(
        `http://${import.meta.env.VITE_API_HOST}:8000/api/view/${param.idx}`,
        {}
      )
        .then((res) => {
          setItem(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBoardItem();
  }, []);

  return (
    <div>
      <Header />

      <div className="container comm_title">
        <div className="row">
          <h2>VIEW</h2>
        </div>
      </div>

      <div className="container board_view">
        <div className="row">
          <div className="title">{item.TITLE}</div>

          <div className="writer">{item.CREATED_BY}</div>

          <div className="content">{item.CONTENT}</div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                nav('/list');
              }}
            >
              List
            </button>
          </div>
          <div className="col"></div>
          <div className="col t_right">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                nav(`/edit/${param.idx}`);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
