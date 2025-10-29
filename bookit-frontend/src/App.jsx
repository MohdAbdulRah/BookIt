import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';
import Header from './components/Header';
import API from './api';

export default function App() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch experiences once (shared for all pages)
  useEffect(() => {
    API.get('/experiences')
      .then((res) => {
        setList(res.data);
        setFilteredList(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Handle search filter
  useEffect(() => {
    const filtered = list.filter((exp) =>
      exp.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, list]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header remains outside */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={<Home list={filteredList} loading={loading} />}
          />
          <Route path="/experience/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
    </div>
  );
}

