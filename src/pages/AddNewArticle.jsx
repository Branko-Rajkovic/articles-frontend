import axios from "axios";
import { useReducer, useState } from "react";
import useAuth from "../hooks/useAuth";

const initialState = {
  title: "",
  summary: "",
  subtitles: [],
  paragraphs: [],
  images: [],
  layoutOrder: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: action.payload,
      };
    case "paragraph":
      return {
        ...state,
        paragraphs: [...state.paragraphs, action.payload],
        layoutOrder: [
          ...state.layoutOrder,
          { type: "paragraph", index: state.paragraphs.length },
        ],
      };
    case "summary":
      return {
        ...state,
        summary: action.payload,
      };
    case "subtitle":
      return {
        ...state,
        subtitles: [...state.subtitles, action.payload],
        layoutOrder: [
          ...state.layoutOrder,
          { type: "subtitle", index: state.subtitles.length },
        ],
      };
    case "image":
      return {
        ...state,
        images: [...state.images, action.payload],
        layoutOrder: [
          ...state.layoutOrder,
          { type: "image", index: state.images.length },
        ],
      };

    default:
      return {
        state,
      };
  }
}

export default function AddNewArticle() {
  const [text, setText] = useState(" ");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [images, setImages] = useState([]);
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fieldType, setFieldType] = useState("title");
  const [notImage, setNotImage] = useState(true);

  function addContent(field) {
    field === "image" ? setNotImage(false) : setNotImage(true);
    setFieldType(field);
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleChange(e) {
    console.log(e.target.files[0]);
    if (e.target.files) {
      setImages(() => [...images, e.target.files[0]]);
    }
    const payload = URL.createObjectURL(e.target.files[0]);

    dispatch({ type: "image", payload: payload });
  }

  function addField(e, type) {
    setText("");
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(type);

    const formInput = Object.fromEntries(formData.entries());
    console.log(formInput);
    const payload = formInput.textarea;
    console.log(payload);

    dispatch({ type: type, payload: payload });
    console.log(state);
  }

  async function saveArticle() {
    setIsLoading(true);
    try {
      const articleData = {
        title: state.title,
        summary: state.summary,
        subtitles: state.subtitles,
        paragraphs: state.paragraphs,
        layoutOrder: state.layoutOrder,
      };

      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/articles/",
        JSON.stringify(articleData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response.data.data.doc);
      if (response.statusText === "Created") {
        const formData = new FormData(images);
        console.log(images);

        console.log(formData);
        const uploadImages = await axios.patch(
          `http://127.0.0.1:3000/api/v1/articles/${response.data.data.doc._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        console.log(uploadImages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="flex flex-col w-64 p-4 bg-white shadow-md">
          <h2 className="mb-6 text-xl font-bold">Add Content</h2>
          <button
            onClick={() => addContent("title")}
            className="px-4 py-2 mb-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
          >
            Title
          </button>
          <button
            onClick={() => addContent("summary")}
            className="px-4 py-2 mb-2 font-semibold text-white bg-pink-400 rounded hover:bg-pink-500"
          >
            Summary
          </button>
          <button
            onClick={() => addContent("subtitle")}
            className="px-4 py-2 mb-2 font-semibold text-white bg-purple-500 rounded hover:bg-purple-700"
          >
            Subtitle
          </button>
          <button
            onClick={() => addContent("paragraph")}
            className="px-4 py-2 mb-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Paragraph
          </button>

          <button
            onClick={() => addContent("image")}
            className="px-4 py-2 mb-2 font-semibold text-white rounded bg-emerald-400 hover:bg-emerald-700"
          >
            Image
          </button>

          <div className="mt-auto">
            <button
              onClick={saveArticle}
              disabled={isLoading}
              className={`w-full ${
                isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              } text-white px-4 py-2 rounded`}
            >
              {isLoading ? "Saving..." : "Save Article"}
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <form
            className="flex items-center border h-1/4"
            onSubmit={(e) => addField(e, fieldType)}
          >
            <div className="items-center ">
              <label className="m-2 font-semibold">Insert {fieldType} :</label>
              {/* <input ref={articleField} type={fieldType} onChange={handleChange} /> */}
              <textarea
                className="border"
                name="textarea"
                rows={fieldType === "title" || fieldType === "subtitle" ? 2 : 5}
                cols="40"
                disabled={!notImage}
                hidden={!notImage}
                value={text}
                onChange={handleTextChange}
              />
              <input
                type="file"
                multiple
                accept="image/*"
                disabled={notImage}
                hidden={notImage}
                onChange={handleChange}
              />
            </div>

            {notImage && (
              <button
                type="submit"
                className="px-4 py-1 m-4 font-semibold rounded-md bg-sky-400 text-slate-50 hover:bg-sky-600"
              >
                Add {fieldType}
              </button>
            )}
          </form>

          <div>
            <h2 className="text-3xl font-semibold">{state.title}</h2>
            <p>{state.summary}</p>

            <div>
              {state.layoutOrder.map((element, index) => {
                if (element.type === "image")
                  return <img key={index} src={state.images[element.index]} />;
                if (element.type === "subtitle")
                  return (
                    <h2 key={index} className="text-xl font-semibold">
                      {state.subtitles[element.index]}
                    </h2>
                  );
                if (element.type === "paragraph")
                  return <p key={index}>{state.paragraphs[element.index]}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
