
import React, { useState } from 'react';
import { LightbulbIcon, ThermometerIcon } from './Icons';

interface SmartHomeControlsProps {
  onSendCommand: (command: string) => void;
  isLoading: boolean;
}

const SmartHomeControls: React.FC<SmartHomeControlsProps> = ({ onSendCommand, isLoading }) => {
  const [temperature, setTemperature] = useState('72');
  const [lightsOn, setLightsOn] = useState(false);

  const handleLightToggle = () => {
    const newLightsState = !lightsOn;
    if (newLightsState) {
      onSendCommand('Turn on the living room lights');
    } else {
      onSendCommand('Turn off the living room lights');
    }
    setLightsOn(newLightsState);
  };

  const handleSetTemp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSendCommand(`Set thermostat to ${temperature} degrees`);
  };

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg mb-4">
      <h3 className="text-sm font-bold text-purple-300 mb-3 tracking-wider">SMART HOME</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lights Control */}
        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-3">
            <LightbulbIcon className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Lights</span>
          </div>
          <button
            onClick={handleLightToggle}
            disabled={isLoading}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed ${
              lightsOn ? 'bg-purple-600' : 'bg-gray-600'
            }`}
            role="switch"
            aria-checked={lightsOn}
            aria-label={lightsOn ? 'Turn lights off' : 'Turn lights on'}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${
                lightsOn ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {/* Thermostat Control */}
        <form onSubmit={handleSetTemp} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-3">
            <ThermometerIcon className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Thermostat</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              disabled={isLoading}
              className="w-16 p-1.5 text-center bg-gray-800 border border-gray-600 rounded-md disabled:opacity-50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              aria-label="Temperature"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              aria-label="Set temperature"
            >
              Set
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmartHomeControls;