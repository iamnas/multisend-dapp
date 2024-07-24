'use client'
import { useState } from 'react';
import { Importer, ImporterField, BaseRow } from 'react-csv-importer';
import { ethers, Contract } from 'ethers';

import multisendJSON from './multisend.json';

const blockchainExplorerUrls: { [key: string]: string } = {
  "11155111": "https://sepolia.etherscan.io/tx/"
};

type Payment = { address: string; amount: string; currency: string };

export default function Home() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [sending, setSending] = useState(false);
  const [blockchainExplorer, setBlockchainExplorer] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<string | null>(null);

  const sendPayments = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const { chainId } = await provider.getNetwork();
      setBlockchainExplorer(blockchainExplorerUrls[chainId.toString()]);

      setSending(true);

      const sendData = payments.reduce((acc: { address: string[], amounts: string[], total: number }, val) => {
        acc.address.push(val.address);
        acc.amounts.push(val.amount);
        acc.total += parseInt(val.amount);
        return acc;
      }, { address: [], amounts: [], total: 0 });

      console.log(sendData.address, sendData.amounts, sendData.total);

      const contractInstance = new Contract(multisendJSON.address, multisendJSON.abi, signer);

      try {
        const tx = await contractInstance.send(sendData.address, sendData.amounts, { value: sendData.total });
        const txReceipt = await tx.wait();
        setTransaction(txReceipt.hash);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("There was a problem processing the transaction. Please try again later.");
      } finally {
        setSending(false);
      }
    } else {
      setError("MetaMask is not installed. Please install it to proceed.");
    }
  };

  const handleData = (rows: BaseRow[]) => {
    const formattedRows: Payment[] = rows.map(row => ({
      address: row.address as string,
      amount: row.amount as string,
      currency: row.currency as string,
    }));
    setPayments(formattedRows);
  };

  return (
    <div className="container-fluid mt-5 d-flex justify-content-center">
      <div className="row" id="content">
        <div className="col" id="content-inner">
          <div className="text-center">
            <h1 className="fw-bold" id="title">MULTISEND</h1>
            <p className="mt-4 fw-bold" id="sub-title">
              <span>Send many payments<br />in just 1 transaction</span>
            </p>
          </div>
          <Importer
            dataHandler={handleData}
            defaultNoHeader={false}
            restartable={false}
          >
            <ImporterField name="address" label="Address" />
            <ImporterField name="amount" label="Amount" />
            <ImporterField name="currency" label="Currency" />
          </Importer>
          <div className="text-center">
            <button
              className="btn btn-primary mt-5"
              onClick={sendPayments}
              disabled={sending || payments.length === 0}
            >
              Send Payments
            </button>
          </div>
          {sending && <div className="alert alert-info mt-4 mb-0">Your payments are processing. Please wait until the transaction is mined.</div>}
          {transaction && <div className="alert alert-success mt-4 mb-0">Congrats! Payments were sent. <a href={`${blockchainExplorer}/${transaction}`} target="_blank" rel="noopener noreferrer">{`${transaction.substr(0, 20)}...`}</a></div>}
          {error && <div className="alert alert-danger mt-4 mb-0">{error}</div>}
        </div>
      </div>
    </div>
  );
}
