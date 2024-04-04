import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
// import  PostCard  from '../components'
import service from "../appwrite/conffig";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.allPosts([]).then(posts => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full ">
      <Container>
        <div className="flex flex-wrap ">
          {posts.map(post => (
            <div
              key={post.$id}
              className="p-2 w-1/4  "
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
