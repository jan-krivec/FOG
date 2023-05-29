
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { VoteProposal } from './VoteBox';
import { ExecuteProposal } from './ExecuteBox';
import { useGetTotalVoters } from '../web3/GetVotersCount';
import { useGetProposals } from '../web3/GetProposalCount';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetState } from '../web3/useGetState';
import useFetchRole from '../web3/useFetchRole';

export const Navbar = ({ boxValue, getValue, userBalance, getBalance, signer, requestFunds, createProposal }) => {

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [shortId, setShortId] = useState();
    const [proposal, setPropId] = useState();
    const [role, setRole] = useState(0);
    const [value, setValue] = useState();
    const { voters, getVoters } = useGetTotalVoters();
    const { proposalCount, getProposalCount } = useGetProposals();
    const [proposalState, setProposalState] = useState(null);
    const roleMapping = {
        0 : 'Reader',
        10: 'Author',
        20: 'Editor',
        30: 'Reviewer'
    };
    const [params, setParams] = useState({
        proposedRole: '',
        proposedAddress: '',
    });

    const { getProposalState } = useGetState();
    useEffect(() => {
        const fetchRole = async () => {
            try {
                if (signer?._address) {
                    const response = await axios.post('http://localhost:8000/get_role/', {
                        wallet_id: signer?._address,
                    });
                    setRole(response.data.role);
                } else {
                    setRole(0);
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch role:', error);
                setRole(0);
                setLoading(false);
            }
        };

        fetchRole();
    }, [signer?._address]);

    const getTheState = async () => {
        const state = await getProposalState(proposal);
        setProposalState(state);
    }

    useEffect(() => {
        getTheState();
    }, [proposal])

    const [selectedRole, setSelectedRole] = useState(10); // Default value is 10 ('Author')
    const handleParamsChange = (e) => {
        setSelectedRole(e.target.value);
        // You may want to do something with this value or set it to another state variable, as per your requirement
    }
    // Get proposal data from backend when component mounts
    useEffect(() => {

        const fetchProposalData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/proposals/');
                const proposal = response.data[0]; // adjust as needed based on API response structure
                setParams({
                    proposedRole: proposal.role,
                    proposedAddress: proposal.address,
                });
            } catch (error) {
                console.error('Failed to fetch proposal data:', error);
            }
        };
        fetchProposalData();
    }, []); // empty dependency array to run once on mount

    const requestAndUpdateBalance = async () => {
        await requestFunds(signer);
        await getBalance(signer["_address"])
    }
    useEffect(() => {
        if (signer) {
            getBalance(signer["_address"]);
        }
    }, [signer]); // <- signer added to dependencies
    useEffect(() => { getValue() }, [boxValue])
    useEffect(() => { getVoters() }, [])
    useEffect(() => { getProposalCount() }, [])
    useEffect(() => {
        const getProposal = async () => {
            // If the proposal is undefined, make the GET request.
            if (!proposal) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8000/proposals/`);
                    // Use the setPropValue function to update the component's state.
                    setPropId(response.data[0].proposalId);
                    setValue(response.data[0].value);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            }
        };
        getProposal();
    }, [proposal]);

    useEffect(() => {
        setShortId(proposal ? proposal.slice(0, 11) + "..." : "0")
    }, [proposal])


    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            ) : (
                // Rest of your components
                <div className='dao'>
                        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                        <CssBaseline />
                        <div className='presentation-container'>
                    
                            <div className='cards'>
                                <div className='card'>
                                    <p>YOUR CURRENT ROLE</p>
                                    <Typography variant="h6" align="left" color="text.primary" component="span" width="70%">
                                        {roleMapping[Number(role)]}
                                    </Typography >
                                    <p className='card-text'>BASED ON DAO VOTES</p>
                                </div>
                                <div className='card'>
                                    <p>PROPOSALS</p>
                                    <Typography variant="h6" align="left" color="text.primary" component="span" width="70%">
                                        {proposalCount} Total proposals
                                    </Typography >
                                    <p className='card-text'>PARTICIPATE AND PROPOSE NOW</p>

                                </div>
                                <div className='card'>
                                    <p>ELIGIBLE VOTERS</p>
                                    <Typography variant="h6" align="left" color="text.primary" component="span" width="70%">
                                        {voters} Total Voters
                                    </Typography >
                                    <p className='card-text'>JOIN THE DAO NOW AND BECOME ONE</p>

                                </div>
                                <div className='card'>
                                    <p>YOUR VOTING POWER</p>
                                    <Typography variant="h6" align="left" color="text.primary" component="span" width="70%">
                                        {userBalance ? userBalance : "0"}
                                    </Typography >
                                    <p className='card-text'>BASED ON YOUR TOKEN BALANCE</p>
                                </div>


                            </div>
                        </div>
                        <div className='dao'>
                            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                                <Typography variant="h6" align="center" color="white" component="span"
                                >

                                    <div>
                                        <Stack spacing={2} direction="row" justifyContent='center'>
                                            <Button disabled={userBalance > 0} variant="contained" onClick={() => {
                                                setActiveTab(1);
                                            }}>Get Funds</Button>
                                            <Button disabled={proposalState === "1" } variant="contained" onClick={() => {
                                                setActiveTab(2)
                                            }}>Propose your role</Button>
                                            <Button variant="contained" onClick={() => {
                                                setActiveTab(3)
                                            }}>Vote</Button>
                                            <Button variant="contained" onClick={() => {
                                                setActiveTab(4)
                                            }}>Execute</Button>

                                        </Stack>
                                        <div>
                          
                                            {activeTab === 1 && (
                                                <div>
                                                    <h2>Get Funds to Participate on the DAO</h2>
                                                    <p>Only the owners of the ERC20 Token can Vote</p>

                                                    <Button  variant='contained' onClick={requestAndUpdateBalance}>Get Funds</Button>
                                                </div>
                                            )}
                                            {activeTab === 2 && (
                                                <div>
                                                    <h2>Propose a new Execution</h2>
                                                    <p>The Dao members will vote to decide what happens next</p>

                                                    <div className='prop-card'>
                                                        <Box
                                                            component="form"
                                                            sx={{
                                                                '& > :not(style)': { m: 1, width: '25ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            Propose yourself for role of:
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={selectedRole}  // Set value to selectedRole
                                                                onChange={handleParamsChange}
                                                            >
                                                                <MenuItem value={10}>Author</MenuItem>
                                                                <MenuItem value={20}>Editor</MenuItem>
                                                                <MenuItem value={30}>Reviewer</MenuItem>
                                                            </Select>
                                                        </Box>
                                                    </div>

                                                    <Button variant='contained' onClick={() => {
                                                        createProposal(signer, selectedRole)
                                                    }}>Create Proposal
                                                    </Button>

                                                </div>
                                            )}
                                            {activeTab === 3 && (
                                                <div>
                                                    <h2>Choose your preference</h2>
                                                    <p>Vote and engage with the DAO</p>

                                                    <p> Wallet {params.proposedAddress} for role {roleMapping[Number(params.proposedRole)]} </p>

                                                    <Box sx={{ minWidth: 275 }}>
                                                        <Card variant="outlined"><VoteProposal lastId={proposal} signer={signer} /></Card>
                                                    </Box>
                                                </div>
                                            )}
                                            {activeTab === 4 && (
                                                <div>
                                                    <h2>Queue & Execute</h2>
                                                    <p>Vote Period has Finished, time to execute!</p>
                                                    <Box sx={{ minWidth: 275 }}>
                                                        <Card variant="outlined"><ExecuteProposal signer={signer} lastId={proposal} value={value} role={params.proposedRole} address={params.proposedAddress} proposalState={proposalState} /></Card>
                                                    </Box>
                                                </div>
                                            )}
 
                                        </div>
                                    </div>

                                </Typography>
                            </Container>
                        </div>
                </div>
            )}
        </>
    )
}





