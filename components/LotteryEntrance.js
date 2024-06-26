import TreeABI from "../constants/TreeABI.json";
import { useNotification } from "web3uikit";
import { useAccount } from 'wagmi';
import { ethers } from "ethers";
import dotenv from 'dotenv';
import Wrapper from "./Wrapper";
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../components/DataContext';
import { captureCanvasImage } from "../utils/captureCanvasImage";

dotenv.config();

export default function LotteryEntrance() {
    const provider = new ethers.providers.JsonRpcProvider(`https://base-sepolia.g.alchemy.com/v2/${process.env.BASE_SEPOLIA_PROVIDER}`);
    const TreeContract = process.env.TREE_CONTRACT;

    const provide = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provide.getSigner();

    const dispatch = useNotification();
    const contract = new ethers.Contract(TreeContract, TreeABI, signer);

    const { address, chainId } = useAccount();
    const unixTimestamp = Math.floor(Date.now() / 1000);
    const { data, setData, iref, cata, setCata } = useContext(DataContext);
    const [userData, setUserData] = useState(null);
    const [id, setId] = useState(null);
    const [minting, setMinting] = useState(false);
    const [tsupply, setTsupply] = useState(0)


    const tokenID = async () => {
        const tid = await contract.totalSupply();
        setId(tid.toNumber());
        const userData = {
            contractAddress: process.env.TREE_CONTRACT,
            chainId: chainId,
            tokenId: tid.toNumber(),
            walletAddress: address,
            timestamp: unixTimestamp,
        };
        setUserData(userData);
    };

    async function mintTree(tokenId, URI) {
        const contract = new ethers.Contract(TreeContract, TreeABI, signer);
        try {
            const transaction = await contract.mintTree(tokenId, URI, {
                value: ethers.utils.parseEther("0.000001"),
            });
            await transaction.wait();
            handleSuccess(transaction);
            setId(null);
            setUserData(null)
            setCata(false)
            setData(null)
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
        } finally {
            setMinting(false);
        }
    };

    useEffect(() => {
        if (userData && data && id) {
            const mintTreeProcess = async () => {
                const URL = await captureCanvasImage(data);
                const cleanUri = URL.replace('ipfs://', '');
                const lastUri = `https://ipfs.io/ipfs/${cleanUri}`;
                await mintTree(id, lastUri);
            };
            mintTreeProcess();
        }
    }, [userData, data, id]);

    useEffect(() => {

        const fetchTotalSupply = async () => {
            const total = await contract.totalSupply();
            setTsupply(total.toNumber());
        };
        fetchTotalSupply()

    }, [userData, data, id]);


    return (
        <>
            <div className="p-5 flex h-[700px] w-[700px] items-center justify-center ">
                <div className="w-full max-w-2xl items-center justify-center bg-white border border-zinc-200 shadow dark:bg-zinc-950 dark:border-zinc-700">
                    <div className="p-5 m-10 ">
                        <div>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 tracking-widest">TreeVerse</h5>
                            <p className="leading-6 text-m text-gray-900 dark:text-white mb-4">
                                TreeVerse is a limited-edition generative art collection on the Mint blockchain.
                                Using p5.js, it features a variety of intricate tree designs with unique traits.
                                <br /> Each piece symbolizes a commitment to preserving the natural world, blending technology and nature in a seamless digital experience.
                                <br /> TreeVerse offers a unique opportunity to own a digital representation of nature's beauty in the blockchain era.
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-l font-semibold text-gray-900 dark:text-white tracking-widest">Price: 0.001 ETH</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-l font-semibold text-gray-900 dark:text-white mt-2 tracking-widest">{tsupply} / 10,000 Minted</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className={`bg-green-500 hover:bg-green-700 text-white font-bold px-20 py-3.5 mt-5 ${minting ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={async () => {
                                    setMinting(true);
                                    await tokenID();
                                }}
                                disabled={minting}
                            >
                                {minting ? "Minting..." : "Mint"}
                            </button>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white tracking-widest mt-5">Please wait 10 seconds before the wallet pops up.</p>
                    </div>
                </div>
            </div>

            <Wrapper userData={userData} />
        </>
    );
}
