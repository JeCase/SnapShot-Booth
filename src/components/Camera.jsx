import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import Button from './Button';

const Camera = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [snapped, setSnapped] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImage(screenshot);
    setSnapped(true);
  };

  const retake = () => {
    setImage(null);
    setSnapped(false);
  };

  const savePicture = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'captured-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-sm">📸 SnapShot Booth</h1>
        <p className="text-gray-400 text-sm mt-1">Capture, Retake, and Save your moments!</p>
      </header>

      <button onClick={() => setDarkMode(!darkMode)} className="absolute top-4 right-4 px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white transition">
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className={`p-4 rounded-lg shadow-md border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
        {image ? (
          <>
            <img src={image} alt="Captured" className="w-[640px] h-[480px] rounded-lg shadow-sm" />
            {snapped && <p className="text-center text-2xl font-semibold text-green-500 mt-4">Snapped!</p>}
          </>
        ) : (
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-[640px] h-[480px] rounded-lg shadow-sm" />
        )}
      </div>

      <div className="mt-4 flex gap-3">
        {!image ? (
          <Button onClick={capture} color="blue">
            📷 Snap!
          </Button>
        ) : (
          <>
            <Button onClick={retake} color="yellow">
              🔄 Retake
            </Button>
            <Button onClick={savePicture} color="green">
              💾 Save Picture
            </Button>
          </>
        )}
      </div>

      <footer className="mt-8 text-gray-500 text-sm">© 2025 Made by Jerry</footer>
    </div>
  );
};

export default Camera;
