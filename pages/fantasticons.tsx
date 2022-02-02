import React, { useState } from 'react';
import { NextPage } from 'next';
import * as Icons from '@terenceodonoghue/react-icons/fantasticons';

const HomePage: NextPage = function HomePage() {
  const [selectedIcons, setSelectedIcons] = useState(
    Object.keys(Icons).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: false,
      }),
      {},
    ),
  );

  return (
    <div className="container max-w-screen-lg p-6 mx-auto md:p-12">
      <header className="p-6 text-center text-white md:p-12">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl lg:text-8xl">
          Fantasticons
        </h1>
        <h2 className="mt-8 text-lg text-fantasticons">
          ✨ A totally free icon collection
        </h2>
      </header>
      <main className="grid gap-12 p-6 md:p-12 md:gap-20 sm:rounded-md grid-cols-auto-fit justify-items-center">
        {Object.entries(Icons).map(([Icon, IconComponent]) => (
          <label
            className="relative flex flex-col items-center p-4 transition bg-white rounded cursor-pointer hover:drop-shadow-xl hover:scale-110"
            htmlFor={Icon.toLowerCase()}
            key={Icon}
          >
            <input
              className="hidden"
              id={Icon.toLowerCase()}
              type="checkbox"
              value={Icon}
              onClick={(e) => {
                setSelectedIcons({
                  ...selectedIcons,
                  [e.currentTarget.value]:
                    !selectedIcons[e.currentTarget.value],
                });
              }}
            />
            <IconComponent className="w-6 h-6 md:w-10 md:h-10" />
          </label>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
