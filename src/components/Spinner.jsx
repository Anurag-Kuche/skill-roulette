import { useState } from 'react';
import './Spinner.css';

// List of skills
const skills = [
  "Learn 6 Spanish words",
  "Try an origami animal",
  "Write a haiku",
  "Draw your favorite food",
  "Build a CSS button",
  "Meditate for 5 mins",
  "Take a tech quiz",
  "Try a yoga pose"
];

// Function to shuffle the skills array
const shuffleSkills = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function Spinner({ onSelect }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [angle, setAngle] = useState(0);

  const spin = () => {
    if (isSpinning) return;

    const shuffledSkills = shuffleSkills(skills); // Shuffle skills each time
    const randomIndex = Math.floor(Math.random() * shuffledSkills.length);
    const newAngle = 360 * 5 + (randomIndex * (360 / shuffledSkills.length));
    setAngle(prev => prev + newAngle);
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      onSelect(shuffledSkills[randomIndex]);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="wheel-container">
        <div
          className="wheel"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {skills.map((skill, i) => {
            const rotation = i * (360 / skills.length);
            return (
              <div
                key={i}
                className="segment"
                style={{
                  transform: `rotate(${rotation}deg) translate(50%)`,
                }}
              >
                <span className="segment-text">
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
        <div className="pointer">▲</div>
      </div>
      <button
        onClick={spin}
        className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
      >
        🎡 Spin the Wheel
      </button>
    </div>
  );
}

export default Spinner;
