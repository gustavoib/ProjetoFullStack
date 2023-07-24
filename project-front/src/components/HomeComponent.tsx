import React from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';

const HomeComponent = () => {
    return (
        <div>
          <>
            <HeaderComponent />
            <h1>Home</h1>
            <FooterComponent />
          </>
        </div>
    );
};

export default HomeComponent;