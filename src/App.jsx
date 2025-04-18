import { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import Spinner from './components/Spinner';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

function App() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hasSpunToday, setHasSpunToday] = useState(false);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const skills = ['React', 'Node.js', 'MongoDB', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'UI/UX Design', 'Git', 'SQL'];

  // Function to select a skill after the spin
  const handleSkillSelection = (skill) => {
    setIsLoading(true);
    setTimeout(() => {
      // Save selected skill and today's date to localStorage
      localStorage.setItem('skillOfTheDay', skill);
      localStorage.setItem('dateOfSpin', new Date().toDateString());

      const today = new Date().toDateString();
      const newHistory = [...history, { skill, date: today }];
      localStorage.setItem('challengeHistory', JSON.stringify(newHistory));

      const lastDate = history.length > 0 ? new Date(history[history.length - 1].date).toDateString() : '';
      let newStreak = streak;
      if (lastDate === today || lastDate === '') {
        newStreak = lastDate === today ? streak + 1 : 1;
      } else {
        newStreak = 1;
      }
      localStorage.setItem('streak', newStreak);

      // Update state
      setSelectedSkill(skill);
      setHasSpunToday(true);
      setHistory(newHistory);
      setStreak(newStreak);
      setIsLoading(false);
    }, 1000); // Simulate a delay for the loading spinner
  };

  useEffect(() => {
    // Retrieve data from localStorage on initial load
    const storedSkill = localStorage.getItem('skillOfTheDay');
    const storedDate = localStorage.getItem('dateOfSpin');
    const storedHistory = JSON.parse(localStorage.getItem('challengeHistory')) || [];
    const storedStreak = parseInt(localStorage.getItem('streak')) || 0;

    if (storedSkill && storedDate === new Date().toDateString()) {
      setSelectedSkill(storedSkill);
      setHasSpunToday(true);
    }
    setHistory(storedHistory);
    setStreak(storedStreak);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Skill Roulette 🎡</h1>

      {isLoading ? (
        <div className="text-white text-2xl">Loading...</div>
      ) : (
        <Spinner skills={skills} onSelect={handleSkillSelection} />
      )}

      {hasSpunToday ? (
        <div className="mt-6 text-center bg-white text-black p-6 rounded-xl shadow-xl max-w-md w-full text-xl">
          🎯 <span className="font-semibold">Today's Challenge:</span> <br />
          <span className="text-2xl font-bold text-purple-600">{selectedSkill}</span>
        </div>
      ) : (
        <p className="text-white mt-4 text-center">Spin to get your challenge for today!</p>
      )}

      {/* Challenge History */}
      <div className="mt-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-white">Challenge History</h2>
        <div className="bg-white text-black p-4 rounded-lg shadow-lg">
          <ul>
            {history.map((item, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{item.date}</span>: {item.skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Streak */}
      <div className="mt-6 text-xl font-semibold">
        <p className="text-white">Your Current Streak: <span className="text-pink-300">{streak} days</span></p>
      </div>

      {/* Share Buttons */}
      {selectedSkill && (
        <div className="mt-6 flex justify-center gap-4">
          <p className="text-white mb-2">Share your challenge with friends:</p>
          <FacebookShareButton url={window.location.href} quote={selectedSkill}>
            <FaFacebook size={32} />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} title={selectedSkill}>
            <FaTwitter size={32} />
          </TwitterShareButton>
        </div>
      )}
    </div>
  );
}

export default App;
