import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useBookmarks } from '../contexts/BookmarkContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Eye, Trash2, BookmarkIcon, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
const BookmarkPage: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [selectedBookmark, setSelectedBookmark] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRemoveBookmark = (id: string) => {
    removeBookmark(id);
    toast.success('Bookmark removed');
  };

  const handleHomeNavigation = () => {
    navigate('/');
  };

  const selectedBookmarkData = bookmarks.find(b => b.id === selectedBookmark);

  const formatDate = (date: any) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    } else if (date?.toDate) {
      return date.toDate().toLocaleDateString();  // Firestore Timestamp conversion
    } else {
      return 'Unknown Date';
    }
  };

  return (
    
          <div
  className="min-h-screen bg-background"
  style={{
    backgroundImage: "url('/rep.png')",
    backgroundRepeat: 'repeat',
    backgroundSize: '350px auto', // you can tweak this
    backgroundPosition: 'center',
    opacity: 0.9, // optional for fading
    zIndex: -10, // ensure it's behind
  }}
>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate__animated animate__fadeInDown">
              My Bookmarks
            </h1>
            <p className="text-muted-foreground animate__animated animate__fadeInDown">
              Your saved electronics learning materials
            </p>
          </div>

          <Button
            onClick={handleHomeNavigation}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white animate__animated animate__fadeInDown"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
              <BookmarkIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 animate__animated animate__fadeInDown">No bookmarks yet</h3>
            <p className="text-muted-foreground animate__animated animate__fadeInDown">
              Start learning and bookmark your favorite topics!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
            {bookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="glass-card hover:scale-105 transition-transform duration-300" data-aos="fade-up">
                <CardHeader>
                  <CardTitle className="text-lg">{bookmark.title}</CardTitle>
                  <CardDescription>{bookmark.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(bookmark.createdAt)}
                    </span>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBookmark(bookmark.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedBookmarkData?.title}</DialogTitle>
                            <DialogDescription>
                              Saved on {formatDate(selectedBookmarkData?.createdAt)}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                              <p className="whitespace-pre-wrap leading-relaxed">
                                {selectedBookmarkData?.content}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveBookmark(bookmark.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
