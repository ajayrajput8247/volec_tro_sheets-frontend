import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, BookmarkIcon, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onNewChat?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewChat }) => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBookmarks = () => {
    navigate('/bookmarks');
  };

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b">
    
      <div className="w-full flex items-center justify-between px-4 py-3 flex-nowrap">

      
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center pulse-glow">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            VolectroSheets
          </h1>
        </div>

     
        <div className="flex items-center space-x-3">
          
          <button
            onClick={toggleTheme}
            className="bubble-btn"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

         
          {isMobile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bubble-btn" aria-label="Menu">
                  <Menu className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleNewChat}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Chat
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleBookmarks}>
                  <BookmarkIcon className="w-4 h-4 mr-2" />
                  Bookmarks
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              
              <button
                onClick={handleNewChat}
                className="bubble-btn"
                aria-label="New chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={handleBookmarks}
                className="bubble-btn"
                aria-label="Bookmarks"
              >
                <BookmarkIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="bubble-btn"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
