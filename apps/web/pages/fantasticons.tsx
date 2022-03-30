import React, { useMemo, useState } from 'react';
import { NextPage } from 'next';
import { animated, config, useTransition } from '@react-spring/web';
import * as Icons from '@terenceodonoghue/react-icons/fantasticons';

const HomePage: NextPage = function HomePage() {
  const icons = useMemo(() => Object.entries(Icons), []);

  const [selectedIcons, setSelectedIcons] = useState(
    Object.keys(Icons).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: false,
      }),
      {},
    ),
  );

  const transitions = useTransition(icons, {
    config: config.gentle,
    from: { opacity: 0, transform: `translate3d(20px,20px,0)` },
    enter: { opacity: 1, transform: `translate3d(0,0,0)` },
    delay: 250,
    trail: 25,
  });

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
      <main className="grid gap-10 p-6 md:p-12 md:gap-20 sm:rounded-md grid-cols-auto-fit justify-items-center">
        {transitions(({ opacity, transform }, [name, Icon]) => (
          <animated.div
            style={{
              opacity,
              transform,
            }}
          >
            <label
              className="relative flex flex-col items-center p-4 transition bg-white rounded cursor-pointer hover:drop-shadow-xl hover:scale-110"
              htmlFor={name.toLowerCase()}
              key={name}
            >
              <input
                className="hidden"
                id={name.toLowerCase()}
                type="checkbox"
                value={name}
                onClick={(e) => {
                  setSelectedIcons({
                    ...selectedIcons,
                    [e.currentTarget.value]:
                      !selectedIcons[e.currentTarget.value],
                  });
                }}
              />
              <Icon className="w-6 h-6 md:w-10 md:h-10" />
            </label>
          </animated.div>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
