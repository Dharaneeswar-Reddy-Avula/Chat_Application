import React, { useState, useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatContainer from '../components/ChatContainer';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Typical mobile breakpoint
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='min-h-screen bg-base-200'>
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {isMobile ? (
              // Optional: show only one at a time based on selection
              selectedUser ? <ChatContainer /> : <Sidebar />
            ) : (
              <>
                <Sidebar />
                {selectedUser ? <ChatContainer /> : <NoChatSelected />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
