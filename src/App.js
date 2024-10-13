import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import LoanList from './components/LoanList';
import LoanDetails from './components/LoanDetails';

function App() {
    const userId = 1; // This should come from authentication context

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoanList userId={userId} />} />
                <Route path="/loans/:loanId" element={<LoanDetailsWrapper />} />
            </Routes>
        </Router>
    );
}

const LoanDetailsWrapper = () => {
  const { loanId } = useParams();
  return <LoanDetails loanId={loanId} />;
};

export default App;
