import React from 'react';
import { NextPage } from 'next';
import * as glyphs from '@terenceodonoghue/react-icons/glyphs';

const HomePage: NextPage = () => (
  <div className="flex flex-wrap">
    {Object.entries(glyphs).map(([iconName, Icon]) => (
      <Icon className="m-6 h-6 w-6" key={iconName} />
    ))}
  </div>
);

export default HomePage;
