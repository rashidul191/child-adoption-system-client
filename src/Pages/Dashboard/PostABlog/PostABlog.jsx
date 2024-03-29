import React, { useRef } from "react";
import { signOut } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { format } from "date-fns";
import Swal from "sweetalert2";

const PostABlog = () => {
  DynamicTitle("Post A Blog");
  const navigate = useNavigate();
  const postDate = format(new Date(), "PP");
  const blogDescription = useRef("");
  const {
    register: postABlog,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user] = useAuthState(auth);

  const imageStorageKey = `830f12aefec823fea323e5fd7f93c732`;
  const onSubmit = (data) => {
    const image =
      data.img[0] ||
      "https://davidhallsocialmedia.files.wordpress.com/2011/04/blogwordcloud.jpg";
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgStoreOutput) => {
        if (imgStoreOutput.success) {
          const img = imgStoreOutput.data.url;
          const blogDetails = {
            blogImg: img,
            blogTitle: data.blogTitle,
            postDate,
            displayName: data.displayName,
            description: blogDescription.current.value,
          };

          fetch(
            "https://child-adoption-system-server.onrender.com/api/v1/blog",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
              body: JSON.stringify(blogDetails),
            }
          )
            .then((res) => {
              if (res.status === 401 || res.status === 403) {
                signOut(auth);
                localStorage.removeItem("access-token");
                Navigate("/login");
              }
              return res.json();
            })
            .then((data) => {
              if (data?.data?.insertedId) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: `Post a Blog done`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/dashboard/blogs-manage");
                window.location.reload();
              } else {
                Swal.fire({
                  position: "top-center",
                  icon: "error",
                  title: `Failed to Post A Blog`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };
  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">Post A Blog</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <div className="form-control w-full max-w-xs">
            <label className="label font-bold">Date*:</label>
            <input
              {...postABlog("postDate")}
              type="text"
              value={postDate}
              disabled
              className="input input-bordered input-sm md:w-96 max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs mt-0">
            <label className="label font-bold" htmlFor="childImage">
              Photo*:
            </label>
            <div className="flex items-center">
              <div className="flex items-center space-x-6">
                <label className="block">
                  <span className="sr-only">Choose photo</span>
                  <input
                    {...postABlog("img")}
                    type="file"
                    name="img"
                    id="childImage"
                    className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label font-bold">Blog Title*:</label>
            <input
              {...postABlog("blogTitle", {
                required: {
                  value: true,
                  message: "Blog Title is required",
                },
              })}
              type="text"
              placeholder="Blog Title"
              className="input input-bordered input-sm md:w-96 max-w-xs"
            />
            <label className="label">
              {errors.blogTitle?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.blogTitle?.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-full max-w-xs mt-0">
            <label className="label font-bold">Blogger by*:</label>
            <input
              {...postABlog("displayName", {
                required: {
                  value: true,
                  message: "Full Name is required",
                },
              })}
              type="text"
              placeholder="Full Name"
              defaultValue={user?.displayName}
              className="input input-bordered input-sm md:w-96 max-w-xs"
            />
            <label className="label">
              {errors.displayName?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.displayName?.message}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="form-control">
          <label className="label font-bold">Blog Description:</label>
          <textarea
            ref={blogDescription}
            className="textarea textarea-bordered h-48 w-80 md:w-5/6"
            placeholder="Text Here"
          ></textarea>
        </div>

        <input
          className="btn btn-primary text-white w-80 md:w-96 rounded-none mt-3"
          type="submit"
          value="Post A Blog"
        />
      </form>
    </section>
  );
};

export default PostABlog;
