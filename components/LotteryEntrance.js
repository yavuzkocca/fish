import FishABI from "../constants/FishABI.json"
import { useNotification } from "web3uikit"
import { useAccount } from 'wagmi'
import { ethers } from "ethers";
import dotenv from 'dotenv';
import Wrapper from "./Wrapper"
import { useContext } from 'react';
import { DataContext } from '../components/DataContext';
import { useState } from "react"

import { captureCanvasImage } from "../utils/captureCanvasImage";


dotenv.config();

export default function LotteryEntrance() {
    const provider = new ethers.providers.JsonRpcProvider(`https://base-sepolia.g.alchemy.com/v2/${process.env.BASE_SEPOLIA_PROVIDER}`);
    const FishContract = process.env.FISH_CONTRACT;

    const provide = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provide.getSigner();

    const dispatch = useNotification();
    const contract = new ethers.Contract(FishContract, FishABI, signer);

    const { address, isConnecting, isConnected, isDisconnected, chainId } = useAccount();
    const unixTimestamp = Math.floor(Date.now() / 1000);
    const { data } = useContext(DataContext);
    const [userData, setUserData] = useState(null)
    const [id, setId] = useState("")

    const tokenID = async () => {
        const id = await contract.totalSupply()
        setId(id)
        const userData = {
            contractAddress: process.env.FISH_CONTRACT,
            chainId: chainId,
            editionSize: 100,
            mintSize: '1',
            mintIteration: '1',
            // hash: '0xabc...',
            // blockHash: '0xdef...',
            // blockNumber: toString(blockNumber),
            tokenId: id.toNumber(),
            walletAddress: address,
            timestamp: unixTimestamp,
            // gasPrice: '100',
            // gasUsed: '50',
            // isCurated: '0',
        }
        setUserData(userData)
    }

    console.log("dat" + JSON.stringify(data))


    console.log(JSON.stringify(userData))





    async function mintFish(tokenId, URI) {
        const contract = new ethers.Contract(FishContract, FishABI, signer);
        console.log(URI)

        try {

            const transaction = await contract.mintFish(tokenId, URI, {
                value: ethers.utils.parseEther("0.000001"),

            });
            await transaction.wait();
            handleSuccess(transaction);
            setId("")
            return transaction;

        } catch (error) {
            if (error.code === ethers.errors.INSUFFICIENT_FUNDS) {
                return "Insufficient funds in the wallet.";
            } else if (error.message.includes("reverted")) {
                return "Transaction reverted: Ether value sent is below the price.";
            } else {
                return `Error: ${error.message}`;
            }
        }
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    };

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1);
            handleNewNotification(tx);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="p-5 flex h-[700px] w-[700px] items-center justify-center">
                <div className="w-full max-w-2xl items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-5 pb-5">
                        <div>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">DrawProof's NFT</h5>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-l font-bold text-gray-900 dark:text-white"> 0.001 ETH</span>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-20 py-3.5 rounded ml-auto"
                                onClick={async () => {

                                    await tokenID()
                                    console.log("ççç")
                                    setTimeout(async () => {
                                        console.log("aaa");
                                        if (userData) {
                                            const URL = await captureCanvasImage(data);
                                            console.log(URL);
                                            const cleanUri = URL.replace('ipfs://', '');
                                            const lastUri = `https://ipfs.io/ipfs/${cleanUri}`;
                                            await mintFish(id, lastUri);
                                        } else {
                                            console.log('User data is not available after 5 seconds');
                                        }
                                    }, 5000);
                                }}
                            >
                                Mint
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Wrapper userData={userData} />

        </>
    );
}
