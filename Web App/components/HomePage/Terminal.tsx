import React, { useState, useEffect, useRef } from 'react';

type AboutCommand = {
  name: string;
  college: string;
  description: string;
  established: string;
};

type TeamCommand = {
  description: string;
  total_members: number;
  domains: string[];
};

type CommandDescriptions = {
  [key: string]: string;
};

type Commands = {
  about: AboutCommand;
  team: TeamCommand;
};

const TerminalComponent: React.FC = () => {
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const wingsNames: string[] = [
    "Software Development",
    "Competitive Programming", 
    "AI / Machine Learning",
    "Robotics and IoT",
    "Spark (Electronics)",
    "Cybersecurity",
    "Arcanum (UI/UX and Game Dev)"
  ];

  const about: string[] = [
    '{',
    '\xa0\xa0\xa0\xa0name: "House of Geeks",',
    '\xa0\xa0\xa0\xa0college: "IIIT Ranchi",',
    '\xa0\xa0\xa0\xa0description: "Premier technical society fostering innovation and skill development",',
    '\xa0\xa0\xa0\xa0established: "2020",',
    '}'
  ]

  const commands: Commands = {
    'about': {
      name: 'House of Geeks',
      college: 'IIIT Ranchi',
      description: 'Premier technical society fostering innovation and skill development',
      established: '2020',
    },
    'team': {
      description: 'Passionate tech enthusiasts driving innovation at IIIT Ranchi',
      total_members: 50,
      domains: ['Leadership', 'Technical', 'Design', 'Management']
    }
  };

  const commandDescriptions: CommandDescriptions = {
    'help': 'Available commands: about, team, wings, clear',
    'clear': 'Clear terminal screen'
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handleCommand = (input: string): void => {
    const lowercaseInput = input.toLowerCase().trim();
    let response: string | string[] | AboutCommand | TeamCommand;

    switch (lowercaseInput) {
      case 'help':
        response = commandDescriptions['help'];
        break;
      case 'clear':
        setTerminalOutput([]);
        return;
      case 'wings':
        response = wingsNames;
        break;
      case 'about':
        response = about;
        break;
      case 'team':
        response = commands[lowercaseInput as keyof Commands];
        break;
      default:
        response = 'Unknown command. Type "help" for available commands.';
    }

    const newOutput = [
      ...terminalOutput,
      `$ ${input}`,
      ...(Array.isArray(response) 
        ? response 
        : [JSON.stringify(response, null, 2)])
    ];

    setTerminalOutput(newOutput);
    setTerminalInput('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (terminalInput.trim()) {
      handleCommand(terminalInput);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="max-w-xl mx-auto min-w-[26rem] shadow-lg shadow-black rounded-lg">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-900 px-4 py-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-sm text-gray-400 font-medium">
            house-of-geeks — bash
          </div>
        </div>

        <div className="bg-black p-4 md:p-6">
          <div 
            ref={terminalRef}
            className="h-52 md:h-64 overflow-y-auto mb-4 text-sm font-mono custom-scrollbar"
          >
            {terminalOutput.map((line, index) => (
              <div
                key={index}
                className={
                  line.startsWith('$')
                    ? 'text-purple-600'
                    : 'text-white'
                }
              >
                {line}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <span className="mr-2 font-mono text-purple-600">{'$'}</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-sm font-mono text-purple-600 outline-none flex-grow"
              placeholder="Type a command (help)"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TerminalComponent;