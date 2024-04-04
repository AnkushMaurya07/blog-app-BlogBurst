import React, { useEffect, useState } from "react";
import service from "../appwrite/conffig";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Button } from "../components";
import parse from "html-react-parser";

const Post = () => {
  const [post, setpost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then(post => {
        if (post) {
          setpost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  const deletePost = () => {
    service.deletePost(post.$id).then(status => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8  flex flex-row ">
      <Container>
        <div className="w-full flex justify-center mb-4 relative  rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                {" "}
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 ">
          <h1 className=" font-bold text-4xl " style={{ color: "#166534" }}>
            {post.title}
          </h1>
        </div>
        <div className="browser-css w-full text-black text-left flex justify-center">
          <div className="w-3/4 ">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
