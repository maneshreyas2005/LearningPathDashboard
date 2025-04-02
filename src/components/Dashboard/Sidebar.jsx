import React from 'react';
import { BookOpen, MessageSquare, Settings, User } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-gray-900 flex flex-col items-center py-8 space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <BookOpen className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
        <MessageSquare className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
        <User className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
        <Settings className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
      </div>
    </div>
  );
}