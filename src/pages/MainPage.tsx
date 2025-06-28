import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ElectronicComponents from '../components/ElectronicComponents';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Search, BookmarkIcon, Download } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}


const formatAIResponse = (content: string) => {
  const sections = content.split(/-\s\*/g).filter(Boolean);

  return sections.map((section, index) => {
    const [titleLine, ...rest] = section.split(':');
    const title = titleLine.trim();
    const bodyRaw = rest.join(':').trim();

    if (!title || !bodyRaw) return null;

    const body = bodyRaw
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('*')) {
          return `- ${trimmed.substring(1).trim()}`;
        }
        return `- ${trimmed}`;
      })
      .join('\n');

    if (title.toLowerCase().includes('official datasheet link')) {
      return (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-blue-600 dark:text-blue-400">{title}</h3>
          <a
            href={bodyRaw}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-all text-sm break-all"
          >
            📄 View Datasheet
          </a>
        </div>
      );
    }

    return (
      <div key={index} className="mb-4">
        <h3 className="font-semibold text-blue-600 dark:text-blue-400">{title}</h3>
        <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-100">{body}</pre>
      </div>
    );
  });
};


 

const MainPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addBookmark } = useBookmarks();

  const handleSearch = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://volectrosheet-backend.onrender.com/volectro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content })
      });

      const data = await response.json();
      console.log(data);

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response || 'Sorry, AI did not return a response.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      toast.error('Failed to get AI response.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
  };

  const handleBookmark = (message: ChatMessage) => {
    const title = `Electronics Query - ${new Date().toLocaleDateString()}`;
    const description = message.content.substring(0, 100) + '...';
    addBookmark(title, description, message.content);
    toast.success('Saved to bookmarks!');
  };

  const handleDownloadPDF = (message: ChatMessage) => {
    const blob = new Blob([message.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `electronics-info-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded successfully!');
  };

  return (
    <div
  className="min-h-screen bg-background"
  style={{
    backgroundImage: "url('/rep.png')",
    backgroundRepeat: 'repeat',
    backgroundSize: '350px auto', 
    backgroundPosition: 'center',
    opacity: 0.9, 
    zIndex: -10, 
  }}
>
      <Navbar onNewChat={handleNewChat} />

      <div className="container mx-auto px-4 py-8">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate__animated animate__fadeInDown">
                Welcome to VolectroSheets
              </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 animate__animated animate__fadeInDown">
              Your AI-powered electronics learning companion
          </p>

              <ElectronicComponents />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 mb-8 pb-40">
            {messages.map((message) => (
              <div key={message.id} className="animate-fade-in">
                {message.type === 'user' ? (
                  <div className="flex justify-end">
                    <div className="max-w-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-6 py-4">
                      <p>{message.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <Card className="max-w-3xl glass-card">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">AI</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-foreground leading-relaxed space-y-2">
                              {formatAIResponse(message.content)}
                            </div>
                            <div className="flex space-x-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBookmark(message)}
                                className="flex items-center space-x-2"
                              >
                                <BookmarkIcon className="w-4 h-4" />
                                <span>Bookmark</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadPDF(message)}
                                className="flex items-center space-x-2"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <Card className="max-w-3xl glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">AI</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

      
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
          <Card className="glass-card animate__animated animate__fadeInUp">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about electronics... (e.g., 'Tell me about 1N4007 diode')"
                  className="flex-1 bg-white/50 dark:bg-black/50"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                  onClick={handleSearch}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
