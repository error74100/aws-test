import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useState } from 'react';
import Axios from 'axios';

function Write() {
  const nav = useNavigate();
  const [text, setText] = useState({
    title: '',
    writer: '',
    content: '',
  });

  const onChangeEvent = (e) => {
    const { name, value } = e.target;

    setText({
      ...text,
      [name]: value,
    });
  };

  const onCreateEvent = () => {
    const onCreate = () => {
      Axios.post(`http://${import.meta.env.VITE_API_HOST}:8000/api/write`, {
        text,
      })
        .then((res) => {
          alert('저장 완료되었습니다.');
          nav('/list');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (confirm('저장 하시겠습니까?')) {
      onCreate();
    }
  };

  const cancleEvent = () => {
    if (confirm('취소 하시겠습니까?')) {
      nav('/');
    }
  };

  return (
    <div>
      <Header />

      <div className="container comm_title">
        <div className="row">
          <h2>WRITE</h2>
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
              name="content"
              value={text.content}
              className="form-control"
              rows="5"
              placeholder="content.."
              onChange={onChangeEvent}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-primary"
              onClick={cancleEvent}
            >
              Cancle
            </button>
          </div>
          <div className="col"></div>
          <div className="col t_right">
            <button
              type="button"
              className="btn btn-success"
              onClick={onCreateEvent}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
