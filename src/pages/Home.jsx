import React, { useEffect, useState } from "react";
import service from "../appwrite/conffig";
import { Container, PostCard } from "../components";
// import PostCard  from '../components'

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.allPosts().then(posts => {
      setPosts(posts.documents);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 flex  mt-4 text-center">
        <Container>
          <div className="flex  ">
            <div className="p-2 w-full h-full">
              <h1 className="text-2xl font-bold hover: text-black">
                {" "}
                Login to read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <>
      <div className="w-full pb-4 flex mb-4">
        <Container>
          <div className="flex flex-wrap gap-16 pl-14  ">
            {posts.map(post => (
              <div key={post.$id} className="p-2 w-72 h-60 ">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
