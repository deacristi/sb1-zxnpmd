import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Clock } from 'lucide-react';

interface Stats {
  totalMessages: number;
  lastScrapedTimestamp: string;
  batchesSent: number;
}

function Popup() {
  const [stats, setStats] = useState<Stats>({
    totalMessages: 0,
    lastScrapedTimestamp: '',
    batchesSent: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      chrome.storage.local.get(['stats'], (result) => {
        if (result.stats) {
          setStats(result.stats);
        }
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-64 p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Slack Scraper Stats</h1>
      <div className="space-y-2">
        <div className="flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          <span>Total Messages: {stats.totalMessages}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          <span>Last Scraped: {stats.lastScrapedTimestamp}</span>
        </div>
        <div className="flex items-center">
          <Send className="w-5 h-5 mr-2" />
          <span>Batches Sent: {stats.batchesSent}</span>
        </div>
      </div>
    </div>
  );
}

export default Popup;