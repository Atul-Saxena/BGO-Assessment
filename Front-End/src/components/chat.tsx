import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addMessage } from '../app/features/messageSlice';
import { RootState } from '../app/store';

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);

  const handleSend = async () => {
    if (input.trim() === '') return;

    dispatch(addMessage({ sender: 'user', text: input }));

    try {
      const response = await axios.post('http://localhost:5000/messages/responses', { message: input });
      dispatch(addMessage({ sender: 'ai', text: response.data.reply }));
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput('');
  };

  return (
    <div className="h-screen bg-gray-600 flex flex-col items-center justify-center">
      <div className="m-10 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-row my-2">
            <div className={msg.sender === 'user' ? 'bg-indigo-100 p-2 rounded-md' : 'bg-gray-100 p-2 rounded-md'}>
              <strong>{msg.sender === 'user' ? 'You' : 'AI'}</strong><br />
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Type Something" required />
      </div>
    </div>
  );
};

export default Chat;
