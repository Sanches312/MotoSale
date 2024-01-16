import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import { ComparisonProvider } from './Contexts/ComparisonContext';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Motorcycle from './Pages/Motorcycles';
import Equipment from './Pages/Equipment';
import Comparison from './Pages/Comparison';
import Cabinet from './Pages/Cabinet';
import Reviews from './Pages/Reviews';
import OrderForm from './Pages/OrderForm';
import TestDriveForm from './Pages/TestDriveForm';
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ComparisonProvider>
              <div>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/motorcycles" element={<Motorcycle />} />
                  <Route path="/gear" element={<Equipment />} />
                  <Route path="/comparison" element={<Comparison />} />
                  <Route path="/cabinet" element={<Cabinet />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/order/:productId" element={<OrderForm />} />
                  <Route path="/test-drive/:motorcycleId" element={<TestDriveForm />} />
                </Routes>
                <Footer />
              </div>
        </ComparisonProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;