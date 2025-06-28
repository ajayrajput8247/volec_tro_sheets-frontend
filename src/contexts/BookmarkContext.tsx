import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebaseBookmark';
import {auth} from '../firebaseAuth'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface BookmarkItem {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
}

interface BookmarkContextType {
  bookmarks: BookmarkItem[];
  addBookmark: (title: string, description: string, content: string) => void;
  removeBookmark: (id: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setBookmarks([]);  // Clear bookmarks on logout
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!userId) return;

      const snapshot = await getDocs(collection(db, 'users', userId, 'bookmarks'));
      const loadedBookmarks: BookmarkItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<BookmarkItem, 'id' | 'createdAt'>),
        createdAt: new Date((doc.data() as any).createdAt?.seconds * 1000 || Date.now()),
      }));
      setBookmarks(loadedBookmarks);
    };

    fetchBookmarks();
  }, [userId]);

  const addBookmark = async (title: string, description: string, content: string) => {
    if (!userId) return;

    const docRef = await addDoc(collection(db, 'users', userId, 'bookmarks'), {
      title,
      description,
      content,
      createdAt: new Date(),
    });

    setBookmarks((prev) => [
      { id: docRef.id, title, description, content, createdAt: new Date() },
      ...prev,
    ]);
  };

  const removeBookmark = async (id: string) => {
    if (!userId) return;

    await deleteDoc(doc(db, 'users', userId, 'bookmarks', id));
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
