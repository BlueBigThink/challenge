import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
import Web3 from 'web3';
import { isAddress } from 'web3-validator';
export default function Home() {
    const { user } = useAuth();
    const getUser = useUser()
    const [balance, setBalance] = useState(null)
    useEffect(() => {
        getUser()
    }, [])
    
    useEffect(() => {
        const address = user.wallet_address
        const fetchBalance = async () => {
            if(!address) return;
            //98cfc59c4cdf46e69aec779b57b175db : This is my Infura ID
            const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/98cfc59c4cdf46e69aec779b57b175db'));
            try {
                if(!isAddress(address)){
                    throw new Error('Invalid Ethereum address')
                }
                const weiBalance = await web3.eth.getBalance(address);
                console.log(weiBalance)
                const ethBalance = web3.utils.fromWei(weiBalance, 'ether');
                console.log(ethBalance)
                setBalance(ethBalance)
            } catch (err) {
                throw new Error('Error fetching balance')
            }
        }
        fetchBalance()
    }, [user])

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? `List user Ethereum balance ${balance}` : 'Please login first'}
                    </div>
                </div>
            </h2>
        </div>
    )
}
