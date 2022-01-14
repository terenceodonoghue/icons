import React from 'react';
import { NextPage } from 'next';
import * as Icons from '@terenceodonoghue/react-icons/fantasticons';

const HomePage: NextPage = () => (
  <div className="container max-w-screen-lg px-12 mx-auto">
    <header className="py-24 text-center text-white">
      <h1 className="font-medium tracking-tight text-8xl">Fantasticons</h1>
      <h2 className="my-8 text-lg text-fantasticons">
        ✨ A totally free icon collection
      </h2>
    </header>
    <main className="grid gap-12 p-12 bg-white rounded-md grid-cols-auto-fit justify-items-center">
      {Object.entries(Icons).map(([Icon, IconComponent]) => (
        <div className="relative flex flex-col items-center cursor-pointer group">
          <IconComponent key={Icon.toLowerCase()} className="w-10 h-10" />
          <span className="absolute bottom-0 transition-opacity translate-y-8 opacity-0 group-hover:opacity-100 ">
            {Icon}
          </span>
        </div>
      ))}
    </main>
  </div>
);

export default HomePage;
