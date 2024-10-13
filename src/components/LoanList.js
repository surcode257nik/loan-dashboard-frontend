import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoanList = ({ userId }) => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        axios.get(`/api/loans/user/${userId}`)
            .then(response => setLoans(response.data))
            .catch(error => console.error(error));
    }, [userId]);
    return (
        <div>
            <h2>Your Loans</h2>
            <table>
                <thead>
                    <tr>
                        <th>Loan ID</th>
                        <th>Principal Amount</th>
                        <th>Interest Rate</th>
                        <th>Total Payable</th>
                        <th>Balance Principal</th>
                        <th>Balance Interest</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(loan => (
                        <tr key={loan.id}>
                            <td><Link to={`/loans/${loan.id}`}>{loan.id}</Link></td>
                            <td>{loan.principalAmount}</td>
                            <td>{loan.interestRate}%</td>
                            <td>{loan.totalPayable}</td>
                            <td>{loan.balancePrincipal}</td>
                            <td>{loan.balanceInterest}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanList;