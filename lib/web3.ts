import Web3 from 'web3';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';

// IPFS configuration with Pinata
const projectId = process.env.NEXT_PUBLIC_PINATA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

// Smart contract configuration
export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const contractABI = []; // Add your contract ABI here

export const getWeb3 = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      return web3;
    } catch (error) {
      throw new Error('Please connect to MetaMask');
    }
  } else {
    throw new Error('Please install MetaMask');
  }
};

export const uploadToIPFS = async (data: any) => {
  try {
    const added = await ipfsClient.add(JSON.stringify(data));
    return added.path;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

export const getContract = async () => {
  const web3 = await getWeb3();
  return new web3.eth.Contract(contractABI, contractAddress);
};