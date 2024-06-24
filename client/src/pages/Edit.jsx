import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function Edit() {
  const nav = useNavigate();
  const param = useParams();
  const [text, setText] = useState({
    title: '',
    writer: '',
    content: '',
  });

  useEffect(() => {
    const getBoardItem = () => {
      Axios.post(
        `http://${import.meta.env.VITE_API_HOST}:8000/api/view/${param.idx}`,
        {}
      )
        .then((res) => {
          setText({
            title: res.data[0].TITLE,
            writer: res.data[0].CREATED_BY,
            content: res.data[0].CONTENT,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBoardItem();
  }, []);

  const onChangeEvent = (e) => {
    const { name, value } = e.target;

    setText({
      ...text,
      [name]: value,
    });
  };

  const onDeleteEvent = () => {
    const onDelete = () => {
      Axios.post(
        `http://${import.meta.env.VITE_API_HOST}:8000/api/delete/${param.idx}`,
        {}
      )
        .then((res) => {
          alert('삭제 되었습니다.');
          nav('/list');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (confirm('삭제 하시겠습니까?')) {
      onDelete();
    }
  };

  const onUpdateEvent = () => {
    const onUpdate = () => {
      Axios.put(
        `http://${import.meta.env.VITE_API_HOST}:8000/api/edit/${param.idx}`,
        { text }
      )
        .then((res) => {
          alert('수정 완료되었습니다.');
          nav(`/view/${param.idx}`);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (confirm('수정 하시겠습니까?')) {
      onUpdate();
    }
  };

  return (
    <div>
      <Header />

      <div className="container comm_title">
        <div className="row">
          <h2>EDIT</h2>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="mb-3">
            <label className="form-label">* title</label>
            <input
              type="text"
              name="title"
              value={text.title}
              className="form-control"
              placeholder="title.."
              onChange={onChangeEvent}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">* writer</label>
            <input
              type="text"
              name="writer"
              value={text.writer}
              className="form-control"
              placeholder="writer.."
              onChange={onChangeEvent}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">* content</label>
            <textarea
              value={text.content}
              name="content"
              className="form-control"
              rows="5"
              placeholder="content.."
              onChange={onChangeEvent}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="container footer_btn_wrap">
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                nav(-1);
              }}
            >
              Cancle
            </button>
          </div>
          <div className="col right_type">
            <button
              type="button"
              className="btn btn-danger"
              onClick={onDeleteEvent}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={onUpdateEvent}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
