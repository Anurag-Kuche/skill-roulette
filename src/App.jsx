import React, { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FaFacebook, FaTwitter } from 'react-icons/fa'; // Correct import for icons
import Spinner from './components/Spinner';
import YouTube from 'react-youtube'; // Import react-youtube

function App() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hasSpunToday, setHasSpunToday] = useState(false);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const skills = ['React', 'Node.js', 'MongoDB', 'CSS', 'JavaScript', 'Python', 'Machine Learning', 'UI/UX Design', 'Git', 'SQL'];

  // Mapping skills to YouTube video IDs
  const videoMappings = {
    React: 'Jb2pOgAkqXM', // Example React video ID
    'Node.js': 'TlB_eWDSMt4', // Example Node.js video ID
    MongoDB: 'O8Q7A1d0W50', // Example MongoDB video ID
    CSS: '1RsCNv65bT8', // Example CSS tutorial video ID
    JavaScript: 'upDLF7iOwmw', // Example JavaScript video ID
    Python: 'rfscVS0vtbw', // Example Python tutorial video ID
    'Machine Learning': 'Cr6VqTRO1v0', // Example ML video ID
    'UI/UX Design': 'LzpQQe6A6Wk', // Example UI/UX Design video ID
    Git: 'SWYqp7iY_Tc', // Example Git video ID
    SQL: '7S_tz1z_5bA', // Example SQL tutorial video ID
  };

  const handleSkillSelection = (skill) => {
    setIsLoading(true);
    setTimeout(() => {
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

      setSelectedSkill(skill);
      setHasSpunToday(true);
      setHistory(newHistory);
      setStreak(newStreak);
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  };

  useEffect(() => {
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

      {/* YouTube Video Section */}
      {selectedSkill && (
        <div className="mt-8 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4 text-white">Learn more about {selectedSkill}:</h2>
          <YouTube
            videoId={videoMappings[selectedSkill]}
            opts={{
              height: '390',
              width: '640',
              playerVars: {
                autoplay: 1, // Enable autoplay if you want
                controls: 1,
                modestbranding: 1,
                rel: 0,
              },
            }}
          />
        </div>
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
