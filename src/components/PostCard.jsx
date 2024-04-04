import React from "react";
// import appwriteService from '../appwrite/conffig'
import { Link } from "react-router-dom";
import service from "../appwrite/conffig";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div className="bg-midnight-blue text-black py-4  ">
          <div className="w-full h-48 flex justify-center mb-4  ">
            <div className="h-48 w-56 ">
              <img
                src={service.getFilePreview(featuredImage)}
                alt={title}
                className="rounded-xl h-48 w-64 border-4 border-yellow-600 "
              />
            </div>
          </div>
          <h2 className="text-xl font-bold text-center">{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
