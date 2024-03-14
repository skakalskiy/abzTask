import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Title from "./components/Title/Title";
import { HOST } from './components/hooks/constants';
import Users from "./components/Users/Users";
import Form from "./components/Form/Form";
import Footer from "./components/Footer/Footer";

function App() {
  const [data, setData] = useState({
    users: [],
    token: {},
    position: {},

  });

  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      return response.json();
    };

    const fetchAllData = async () => {
      const [users, token, position] = await Promise.all([
        fetchData(`${HOST}/users?page=1&count=6`),
        fetchData(`${HOST}/token`),
        fetchData(`${HOST}/positions`),
      ]);

      setData({
        users,
        token,
        position,
      });
      setNextUrl(users.links?.next_url);
    };

    fetchAllData();
  }, []);

  const users = data.users.users;
  const token = data.token;
  const position = data.position;


  const fetchNextPageData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const fetchNextPage = (url) => {
    return fetchNextPageData(url);
  };

  const handleClick = async () => {
    const dataPage = await fetchNextPage(nextUrl);

    if (dataPage) {
      users.push(...dataPage?.users);
      setNextUrl(dataPage.links?.next_url)
    }
  }

  const getUserInstanse = async (id) => {
    const response = await fetch(`${HOST}/users/${id}`);
    const res = await response.json();
    if (res) {
      users.unshift(res?.user)
      console.log(res.user)
      console.log(users)
    }
  }
  

  return (
    <>
      <Navbar />
      <div className="container">
        <Banner />
        <Title title='Working with GET request' />
        <Users users={users} nextUrl={nextUrl} handleClick={handleClick} />
        <Title title='Working with POST request' />
        <Form token={token} position={position} getUserInstanse={getUserInstanse}/>
        <Footer />
      </div>
    </>
  );
}

export default App;
