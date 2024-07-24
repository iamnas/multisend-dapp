'use client'
import { useState } from 'react';
import { Importer, ImporterField } from 'react-csv-importer';
import { ethers } from "ethers";
import { Contract } from 'ethers';

import multisendJSON from './multisend.json'

const blockchainExplorerUrls: { [key: string]: string } = {
  "11155111": "https://sepolia.etherscan.io/tx/"
}


export default function Home() {

  // const [payments, setPayments] = useState<{ address: string, amount: string, currency:string}[] | undefined>([])
  const [payments, setPayments] = useState<{ address: string, amount: string, currency: string }[] | undefined>([]);

  const [sending, setSending] = useState(false)
  const [blockchainExplorer, setBlockchainExplorer] = useState<string | undefined>()

  const [error, setError] = useState(false)
  const [transaction, setTransaction] = useState<string>()

  const sendPayments = async () => {

    // connect to MetaMask 
    if (window.ethereum) {


      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const { chainId } = await provider.getNetwork();
      setBlockchainExplorer(blockchainExplorerUrls[chainId.toString()]);

      // Show feedback to the user
      setSending(true);
      // Format arguments for the smart contract function 

      const sendData = payments?.reduce((acc: { address: string[], amounts: string[], total: number }, val) => {
        acc.address.push(val.address);
        acc.amounts.push(val.amount);
        acc.total += parseInt(val.amount);
        return acc;
      }, { address: [], amounts: [], total: 0 });

      console.log(sendData?.address, sendData?.amounts,sendData?.total);
      
      // Send tx
      const contractInstance = new Contract(multisendJSON.address, multisendJSON.abi, signer)

      try {
        const tx = await contractInstance.send(sendData?.address, sendData?.amounts, { value: sendData?.total })
        const txReceipt = await tx.wait()
        setTransaction(txReceipt.hash);
      } catch (error) {
        // console.log(error);
        setError(true)
      }
    }

  }

  return (
    <div className="container-fluid mt-5 d-flex justify-content-center">
      <div className="row" id="content">
        <div className="col" id="content-inner">
          <div className="text-center">
            <h1 className="fw-bold" id="title"> MULTISEND</h1>
            <p className="mt-4 fw-bold" id="sub-title"> <span>Send many payment <br /> in just 1 transaction </span></p>
          </div>
          <Importer
            dataHandler={async rows => setPayments(rows)}

            defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
            restartable={false} // optional, lets user choose to upload another file when import is complete
          >
            <ImporterField name="address" label="address" />
            <ImporterField name="amount" label="amount" />
            <ImporterField name="currency" label="currency" />
          </Importer>
          <div className="text-center">
            <button
              className='btn btn-primary mt-5'
              onClick={sendPayments}
              disabled={sending || payments?.length <= 0}
            >
              Send Payments
            </button>
          </div>
          {sending && <div className="alert alert-info mt-4 mb-0"> Your payments are processing. Please wait until the transaction are mined.</div>}
          {transaction && <div className="alert alert-success mt-4 mb-0">Congrass! payment were send at <a href={`${blockchainExplorer}/${transaction}`} target='_blank'>{`${transaction.substr(0, 20)}...`}</a></div>}
          {error && <div className="alert alert-danger mt-4 mb-0">Oooops... There was a proble. Please try again later.</div>}
        </div>
      </div>
    </div >
  );
}
