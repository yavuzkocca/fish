import { useState, useEffect } from "react"
import NFTBox from "./nftBox"
import FishABI from "../constants/FishABI.json"
import { useAccount } from 'wagmi'
import { ethers } from "ethers";
import dotenv from 'dotenv';
import { fetchIPFSData } from "../utils/fetchIPFSData"

export default function NFTBoxContainer() {
    const [balance, setBalance] = useState("")
    const [nftsData, setNftsData] = useState([])
    const provider = new ethers.providers.JsonRpcProvider(`https://base-sepolia.g.alchemy.com/v2/${process.env.BASE_SEPOLIA_PROVIDER}`);
    const FishContract = process.env.FISH_CONTRACT;
    const contract = new ethers.Contract(FishContract, FishABI, provider);

    const { address, isConnecting, isConnected, isDisconnected, chainId } = useAccount();

    const listenToFishMintedEvent = async () => {
        contract.on("FishMinted", (owner, tokenId, tokenURI, event) => {
            updateUI()
        });
    };

    const balanceOfOwner = async () => {
        const balance = await contract.balanceOf(address)
        setBalance(balance.toNumber())
    }

    const fetchTokenIdsAndData = async () => {
        var tokensData = []
        for (var i = 0; i < balance; i++) {
            const tokenId = await contract.tokenOfOwnerByIndex(address, i)
            const tokenURI = await contract.tokenURI(tokenId)
            const data = await fetchIPFSData(tokenURI);
            tokensData.push({ tokenId: tokenId.toNumber(), tokenURI: tokenURI, ...data })
        }
        setNftsData(tokensData)
    }

    async function updateUI() {
        await balanceOfOwner()
        await fetchTokenIdsAndData()
    }

    useEffect(() => {
        listenToFishMintedEvent();
        return () => {
            contract.removeAllListeners("FishMinted");
        };
    }, [isConnected]);

    useEffect(() => {
        if (isConnected) {
            updateUI()
        }
    }, [isConnected, balance])

    useEffect(() => {
        if (isDisconnected) {
            setNftsData([]);
        }
    }, [isDisconnected]);

    return (
        <div className="flex flex-wrap justify-center">
            {nftsData.map((token, index) => (
                <NFTBox key={index} name={token.name} image={token.image} description={token.description} attributes={token.attributes} />
            ))}
        </div>
    )
}
