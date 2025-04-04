import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import Loader from "../components/Loader";
import Error from "./Error";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useState } from "react";

export default function EditArticle() {
  const [updates, setUpdates] = useState({
    title: "",
    summary: "",
    subtitles: [],
    paragraphs: [],
    codeSnippets: [],
    images: [],
    layoutOrder: [],
  });
  const [updatedImages, setUpdatedImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { auth } = useAuth();
  const params = useParams();

  const { data, loading, error } = useFetchData(
    `http://127.0.0.1:3000/api/v1/articles/${params.articleId}`
  );

  async function saveChanges(id) {
    try {
      const result = await axios.patch(
        `http://127.0.0.1:3000/api/v1/articles/${id}`,
        updates,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(result);
      if (updatedImages) {
        const formData = new FormData();

        console.log("images", updatedImages);
        updatedImages.forEach((image) => {
          console.log(image);
          formData.append("images", image);
        });

        console.log(formData);
        const uploadImages = await axios.patch(
          `http://127.0.0.1:3000/api/v1/articles/${data.data.doc._id}`,
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
      console.log("saving to the server action ended.");
    }
  }

  function handleEdit() {
    setEditMode(() => !editMode);
  }

  function handleChange(event, index) {
    console.log(event.target.files[0]);
    console.log("length", updatedImages.length);
    if (updatedImages.length === 0) {
      setUpdatedImages(() => [...data.data.doc.images]);
    }
    console.log(updatedImages);
    if (event.target.files) {
      setUpdatedImages(() => [...updatedImages, event.target.files[0]]);
    }
    const newImage = URL.createObjectURL(event.target.files[0]);

    data.data.doc.images[index] = newImage;

    setUpdates(() => {
      return {
        ...data.data.doc,
      };
    });
    console.log(updates.images);
  }

  function updateField(event, index) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formInput = Object.fromEntries(formData.entries());

    console.log(formInput);
    if (formInput.subtitle) {
      data.data.doc.subtitles[index] = formInput.subtitle;
    }
    if (formInput.paragraph) {
      data.data.doc.paragraphs[index] = formInput.paragraph;
    }
    if (formInput.codeSnippet) {
      data.data.doc.codeSnippets[index] = formInput.codeSnippet;
    }
    if (formInput.image) {
      data.data.doc.images[index] = formInput.image;
      if (event.target.files) {
        setUpdatedImages(() => [...updatedImages, event.target.files[0]]);
      }
    }

    setUpdates(() => {
      return {
        ...data.data.doc,
      };
    });

    setEditMode(true);
  }

  function handleDelete(field, index) {
    if (field === "subtitle") {
      data.data.doc.subtitles[index] = "";

      setUpdates(() => {
        return { ...data.data.doc };
      });
    }
  }

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <main className="page-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
      >
        <Header />

        <button
          className="px-2 py-1 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
          onClick={() => saveChanges(params.articleId)}
        >
          Save Document
        </button>
        <button
          className="px-2 py-1 mx-2 rounded-sm bg-amber-300 hover:bg-amber-500 text-amber-900"
          onClick={() => handleEdit()}
        >
          {!editMode ? "Enable Editing" : "Disable Editing"}
        </button>
        {!loading && (
          <div className="flex flex-col items-center mx-4">
            <h2 className="m-2 text-4xl font-bold text-slate-500">
              {data.data.doc.title}
            </h2>
            <p className="italic font-semibold">{data.data.doc.summary}</p>

            <div>
              {data.data.doc.layoutOrder.map((element, index) => {
                if (element.type === "image")
                  return (
                    <div key={index}>
                      <img
                        src={`http://127.0.0.1:3000/images/articles/${
                          data.data.doc.images[element.index]
                        }`}
                      />
                      <img
                        hidden={!editMode}
                        src={data.data.doc.images[element.index]}
                      />
                      <form>
                        <input
                          type="file"
                          multiple
                          name="image"
                          accept="image/*"
                          hidden={!editMode}
                          onChange={(event) =>
                            handleChange(event, element.index)
                          }
                        />
                      </form>
                    </div>
                  );
                if (element.type === "subtitle")
                  return (
                    <div key={index} className="m-2 border">
                      <form
                        onSubmit={(event) => updateField(event, element.index)}
                      >
                        <input
                          type="text"
                          name="subtitle"
                          defaultValue={data.data.doc.subtitles[element.index]}
                          hidden={!editMode}
                        />
                        <h2
                          className="my-2 text-xl font-semibold"
                          hidden={editMode}
                        >
                          {data.data.doc.subtitles[element.index]}
                        </h2>
                        <button
                          className="px-2 py-1 mx-2 rounded-sm bg-amber-300 hover:bg-amber-500 text-amber-900"
                          type="submit"
                          hidden={!editMode}
                        >
                          Edit
                        </button>
                      </form>

                      <button
                        className="px-2 py-1 mx-2 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
                        onClick={() => handleDelete("subtitle", element.index)}
                        hidden={!editMode}
                      >
                        Delete
                      </button>
                      <div className="flex">
                        <button
                          className="px-2 py-1 mx-2 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
                          hidden={!editMode}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  );
                if (element.type === "paragraph")
                  return (
                    <div key={index}>
                      <p hidden={editMode}>
                        {data.data.doc.paragraphs[element.index]}
                      </p>
                      <form
                        onSubmit={(event) => updateField(event, element.index)}
                      >
                        <textarea
                          name="paragraph"
                          cols="60"
                          rows="3"
                          defaultValue={data.data.doc.paragraphs[element.index]}
                          hidden={!editMode}
                        />
                        <button
                          className="px-2 py-1 mx-2 rounded-sm bg-amber-300 hover:bg-amber-500 text-amber-900"
                          type="submit"
                          hidden={!editMode}
                        >
                          Edit
                        </button>
                      </form>
                      <button
                        className="px-2 py-1 mx-2 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
                        onClick={() => handleDelete("paragraph", element.index)}
                        hidden={!editMode}
                      >
                        Delete
                      </button>
                      <div className="flex">
                        <button
                          className="px-2 py-1 mx-2 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
                          hidden={!editMode}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  );
                if (element.type === "codeSnippet")
                  return (
                    <div key={index}>
                      <p
                        className="px-4 mx-8 bg-slate-800 text-slate-200"
                        hidden={editMode}
                      >
                        {data.data.doc.codeSnippets[element.index]}
                      </p>
                      <form
                        onSubmit={(event) => updateField(event, element.index)}
                      >
                        <textarea
                          name="codeSnippet"
                          cols="60"
                          rows="3"
                          defaultValue={
                            data.data.doc.codeSnippets[element.index]
                          }
                          hidden={!editMode}
                        />
                        <button
                          className="px-2 py-1 mx-2 rounded-sm bg-amber-300 hover:bg-amber-500 text-amber-900"
                          type="submit"
                          hidden={!editMode}
                        >
                          Edit
                        </button>
                      </form>
                      <button
                        className="px-2 py-1 mx-2 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
                        onClick={() =>
                          handleDelete("codeSnippet", element.index)
                        }
                        hidden={!editMode}
                      >
                        Delete
                      </button>
                      <div className="flex">
                        <button
                          className="px-2 py-1 mx-2 text-red-900 bg-red-300 rounded-sm hover:bg-red-500"
                          hidden={!editMode}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        )}
      </motion.div>
      <Footer />
    </main>
  );
}
