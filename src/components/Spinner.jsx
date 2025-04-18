import { useState } from 'react';
import './Spinner.css';

const skills = [
  "Learn 5 Spanish words",
  "Try an origami animal",
  "Write a haiku",
  "Draw your favorite food",
  "Build a CSS button",
  "Meditate for 5 mins",
  "Take a tech quiz",
  "Try a yoga pose"
];

function Spinner({ onSelect }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [angle, setAngle] = useState(0);

  const spin = () => {
    if (isSpinning) return;

    const randomIndex = Math.floor(Math.random() * skills.length);
    const newAngle = 360 * 5 + (randomIndex * (360 / skills.length)); // 5 full spins + land
    setAngle(prev => prev + newAngle);
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      onSelect(skills[randomIndex]);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="wheel-container">
        <div
          className="wheel"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {skills.map((skill, i) => (
            <div
              key={i}
              className="segment"
              style={{ transform: `rotate(${i * (360 / skills.length)}deg)` }}
            >
              {skill}
            </div>
          ))}
        </div>
        <div className="pointer">▲</div>
      </div>
      <button
        onClick={spin}
        className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
      >
        Spin the Wheel
      </button>
    </div>
  );
}

export default Spinner;
