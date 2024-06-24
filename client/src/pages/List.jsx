import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function List() {
  const nav = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    const getBoardList = async () => {
      await Axios.get(
        `http://${import.meta.env.VITE_API_HOST}:8000/api/list`,
        {}
      )
        .then((res) => {
          setList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBoardList();
  }, []);

  const goViewEvent = (idx) => {
    nav(`/view/${idx}`);
  };

  return (
    <div>
      <Header />

      <div className="container comm_title">
        <div className="row">
          <h2>LIST</h2>
        </div>
      </div>

      <div className="container board_list">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Writer</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, idx) => (
              <tr
                key={item.IDX}
                onClick={() => {
                  goViewEvent(item.IDX);
                }}
              >
                <th scope="row">{idx + 1}</th>
                <td>{item.TITLE}</td>
                <td>{item.CONTENT}</td>
                <td>{item.CREATED_BY}</td>
                <td>{item.CREATED_AT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
