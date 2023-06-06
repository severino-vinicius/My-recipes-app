import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  return (
    <>
      <Header pageTitle="Profile" showSearch={ false } showIcon />
      <div>Profile</div>
      <Footer />
    </>
  );
}
