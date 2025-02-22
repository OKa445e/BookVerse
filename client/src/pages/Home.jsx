import React from 'react';
import Content from '../components/Content'
import RecentlyAdded from '../components/RecentlyAdded';

const Home = () => {
  return (
   <div className="bg-zinc-900 text-white px-10 py-8">
    <Content/>
    <RecentlyAdded/>
   </div>
  )
}

export default Home