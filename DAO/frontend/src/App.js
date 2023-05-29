import { Header } from './components/Header';
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar';
import { useMetamaskState } from './web3/ConnectWallet';
import { useGetValue } from './web3/GetCurrentValue';
import { useGetBalance } from './web3/GetTokenBalance';
import { useRequestFunds } from './web3/GetFunds';
import { useCreateProposal } from './web3/NewProposal';
import BasicModal from './components/BasicModal';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import "./App.css"



function App() {

  const { boxValue, getValue } = useGetValue();
  const { isConnected, account, signer, connectToMetamask } = useMetamaskState();
  const { userBalance, getBalance } = useGetBalance();
  const { requestFunds } = useRequestFunds();
  const { createProposal, proposal, newValue, proposalDescription, open, handleClose, modalContent, isLoading } = useCreateProposal();

  return (
    <>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Waiting until the transaction has been confirmed 3 times
          <br/>
          <CircularProgress />
        </div>
      ) : (
         <div>
      <BasicModal open={open} handleClose={handleClose}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Error
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalContent}
        </Typography>
      </BasicModal>
            <Header connectToMetamask={connectToMetamask} isConnected={isConnected} account={account} signer={signer} getBalance={getBalance} />
            <Navbar boxValue={boxValue} getValue={getValue} userBalance={userBalance} getBalance={getBalance} signer={signer} requestFunds={requestFunds} createProposal={createProposal} proposal={proposal} newValue={newValue} proposalDescription={proposalDescription} />
      <Footer />
          </div>
      )
      }
    </>
  );
}

export default App;
