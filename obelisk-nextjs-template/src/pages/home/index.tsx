import {NetworkType, Obelisk} from "@0xobelisk/client";
import {ConnectButton, useWallet} from '@suiet/wallet-kit';
import {useEffect} from "react";

const main = async () => {
    const NETWORK: NetworkType = 'testnet';
    const obelisk = new Obelisk({
        secretKey: 'c71a1529d774a80d521e02953ce656f1b1cef126451daacaebec763f8dd0b535',
        networkType: NETWORK,
    });
    // const obeject_id = '0x97706e7066536b8c542c175e77eec801989cca8c3c4c68b80db056c5ca30330f'
    // const result = await obelisk-cocos-template.getObjects([obeject_id])
    // console.log(result[0].objectFields.number)
    const world_id = '0xea07f58052bcdef935a3eee097d41a97bc4a0f0b1b60ff6b18f2caa858609bf8'
    const system_name = 'counter_change'
    const counter =  '0x97706e7066536b8c542c175e77eec801989cca8c3c4c68b80db056c5ca30330f'
    const result= await obelisk.call(world_id,system_name,counter)
    console.log(result)
}

// main()

const Home = () =>{
    // const wallet = useWallet()
    //
    // useEffect(() => {
    //     if (!wallet.connected) return;
    //     console.log('connected wallet name: ', wallet.name)
    //     console.log('account address: ', wallet.account?.address)
    //     console.log('account publicKey: ', wallet.account?.publicKey)
    // }, [wallet.connected])
    return (
        <div>
            <header>
                <ConnectButton/>
            </header>
            <button onClick={main}>call system</button>
        </div>
    )
}

export default Home


