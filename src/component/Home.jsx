

import React from 'react'
import HomeVideo from './HomeVideo';
import SuperNovaPacks from './SuperNovaPacks';
import SuperTitle from './SuperTitle';
import VideoTiktok from './VideoTiktok';
import SuperNovaImg from './SuperNovaImg';
import SuperNovaCard from './SuperNovaCard';
import SuperNovaPeoples from './SuperNovaPeoples';
import Followers from './Followers';

const Home = () => {
  return (
    <div>
      <HomeVideo />
      <SuperNovaPacks />
      <SuperTitle />
      <VideoTiktok />
      <SuperNovaImg />
      <SuperNovaCard />
      <SuperNovaPeoples />
      <Followers />
    </div>
  )
}

export default Home;