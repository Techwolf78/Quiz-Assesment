import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="bg-white w-full py-4 sm:py-6 lg:py-8 mb-20 fixed top-0 left-0 z-10">
        <div className="text-red-500 text-lg sm:text-xl lg:text-2xl font-bold text-center">
          ARE YOU DISILLUSIONED?
        </div>
      </div>
    );
  }
}

export default Header;
