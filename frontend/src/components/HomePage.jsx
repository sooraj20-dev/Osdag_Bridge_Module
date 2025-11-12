import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartDesign = () => {
    navigate('/group-design');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="flex justify-center mb-4">
          <img 
            src="https://fossee.in/sites/all/themes/fossee/img/logo_osdag.png" 
            alt="OSDAG Logo" 
            className="h-24 md:h-32 w-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={handleStartDesign}
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Osdag Bridge Module
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 font-medium">
          Web-Based UI for Bridge Group Design
        </p>
        
        <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
          Input bridge parameters, validate geometry, and view a visual reference.
          A streamlined tool for preliminary bridge design and configuration.
        </p>
        
        <div className="pt-4">
          <button
            onClick={handleStartDesign}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-sm"
          >
            Start Group Design
          </button>
        </div>
      </div>
      
      <footer className="absolute bottom-6 text-sm text-slate-500">
        Developed by Sooraj
      </footer>
    </div>
  );
};

export default HomePage;