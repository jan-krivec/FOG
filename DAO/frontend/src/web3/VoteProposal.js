import { ethers } from "ethers";
import { useState } from "react";
import * as React from 'react';

import contractAddresses from "../chain-info/deployments/map.json";
import boxContractABI from "../chain-info/contracts/Box.json"
import moralisGovernorABI from "../chain-info/contracts/MoralisGovernor.json"





export function useVoteProposal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalContent, setModalContent] = useState();
    const [isLoading, setIsLoading] = useState(false); // added isLoading state


    async function voteInProposal(signer, proposalId, support, reason) {
        setIsLoading(true); 
        try {

            const moralisGovernor = contractAddresses["5"]["MoralisGovernor"][0];

            const moralisGovernorAbi = moralisGovernorABI.abi;
            const moralisGovernorContractInstance = new ethers.Contract(moralisGovernor, moralisGovernorAbi, signer);
            console.log(proposalId, support, reason);
            const voteTx = await moralisGovernorContractInstance.castVoteWithReason(proposalId, support, reason)
            const voteReceipt = await voteTx.wait(1)
        } catch (err) {
            setModalContent(`Error creating proposal: ${err.message}`);
            handleOpen();
            console.log(err)
            setIsLoading(false); 
        }
        finally {
            setIsLoading(false); 
        }

    }

    return { voteInProposal, open, handleOpen, handleClose, modalContent, isLoading }

}