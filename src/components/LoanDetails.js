// src/components/LoanDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanDetails = ({ loanId }) => {
    const [loan, setLoan] = useState(null);
    const [repayments, setRepayments] = useState([]);
    const [repaymentAmount, setRepaymentAmount] = useState('');

    useEffect(() => {
        axios.get(`/api/loans/${loanId}`)
            .then(response => setLoan(response.data))
            .catch(error => console.error(error));

        axios.get(`/api/loans/${loanId}/repayments`)
            .then(response => setRepayments(response.data))
            .catch(error => console.error(error));
    }, [loanId]);

    const handleRepayment = () => {
        axios.post(`/api/loans/${loanId}/repayments`, null, { params: { amount: repaymentAmount } })
            .then(response => {
                setRepayments([...repayments, response.data]);
                // Update loan details accordingly
                setLoan(prev => ({
                    ...prev,
                    balancePrincipal: prev.balancePrincipal - response.data.principalPaid,
                    balanceInterest: prev.balanceInterest - response.data.interestPaid
                }));
                setRepaymentAmount('');
            })
            .catch(error => console.error(error));
    };

    if (!loan) return <div>Loading...</div>;

    return (
        <div>
            <h2>Loan Details</h2>
            <p><strong>Principal Amount:</strong> {loan.principalAmount}</p>
            <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
            <p><strong>Total Payable:</strong> {loan.totalPayable}</p>
            <p><strong>Balance Principal:</strong> {loan.balancePrincipal}</p>
            <p><strong>Balance Interest:</strong> {loan.balanceInterest}</p>

            <h3>Make Early Repayment</h3>
            <input 
                type="number" 
                value={repaymentAmount} 
                onChange={(e) => setRepaymentAmount(e.target.value)} 
                placeholder="Amount" 
            />
            <button onClick={handleRepayment}>Repay</button>

            <h3>Repayment Schedule</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount Paid</th>
                        <th>Principal Paid</th>
                        <th>Interest Paid</th>
                        <th>Remaining Principal</th>
                        <th>Remaining Interest</th>
                    </tr>
                </thead>
                <tbody>
                    {repayments.map(rep => (
                        <tr key={rep.id}>
                            <td>{rep.repaymentDate}</td>
                            <td>{rep.amountPaid}</td>
                            <td>{rep.principalPaid}</td>
                            <td>{rep.interestPaid}</td>
                            <td>{rep.remainingPrincipal}</td>
                            <td>{rep.remainingInterest}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanDetails;
