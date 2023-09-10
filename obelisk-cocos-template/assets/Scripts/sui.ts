import { _decorator, Component,find, sys } from 'cc';
import { obeliskConfig } from './obelisk.config';
import { NETWORK, PACKAGE_ID, WORLD_ID } from './chain/config';


const { ccclass, property } = _decorator;

type data = {
    type:string;
    fields:Record<string, any>;
    hasPublicTransfer:boolean;
    dataType:"moveObject";
}

@ccclass('sui')
export class sui extends Component {

    async start() {
        this.sui_account_create()
    }


    async sui_account_create(){
        // @ts-ignore
        // const sui  = window.sui;
         // @ts-ignore
        const obelisk_sdk = window.obelisk;
        const decode = JSON.parse(sys.localStorage.getItem('userWalletData'));
        if (decode == null){
            const keypair = new obelisk_sdk.Ed25519Keypair();
            const wallet = keypair.export()
            const code = JSON.stringify(wallet)
            sys.localStorage.setItem('userWalletData', code);
            const metadata = await obelisk_sdk.getMetadata(NETWORK, PACKAGE_ID);
            const obelisk = new obelisk_sdk.Obelisk({
                networkType: NETWORK,
                packageId: PACKAGE_ID,
                metadata: metadata,
            });
            const component_name = Object.keys(obeliskConfig.singletonComponents)[1];
            const component_value = await obelisk.getComponentByName(WORLD_ID,component_name);
            console.log(component_value);
        }else{
            const metadata = await obelisk_sdk.getMetadata(NETWORK, PACKAGE_ID);
            const obelisk = new obelisk_sdk.Obelisk({
                networkType: NETWORK,
                packageId: PACKAGE_ID,
                metadata: metadata,
            });
            const component_name = Object.keys(obeliskConfig.singletonComponents)[1];
            const component_value = await obelisk.getComponentByName(WORLD_ID,component_name);
            const content = component_value.data.content as data
            const value = content.fields.value.fields.value
            const counter_node = find('Canvas/Camera/counter')
            const label = counter_node.getComponent("cc.Label")
            label.string = `当前counter数值为${value}`
        }

    }


    export_wallet(){
        // @ts-ignore
        // const sui  = window.sui;
        // const fromB64 = sui.fromB64;
        // @ts-ignore
        const obelisk_sdk = window.obelisk;
        const fromB64 = obelisk_sdk.fromB64;
        const decode = JSON.parse(sys.localStorage.getItem('userWalletData'));
        const decode_private_key = decode.privateKey;
        const base_64_privkey = fromB64(decode_private_key);
        const keypair = obelisk_sdk.Ed25519Keypair.fromSecretKey(base_64_privkey,{skipValidation:false});
        const address = keypair.getPublicKey().toSuiAddress();
        console.log(address);
        const hex_privkey = Array.prototype.map.call(base_64_privkey, x => ('00' + x.toString(16)).slice(-2)).join('');
        return hex_privkey;
    }

    async gameStart() {
        // @ts-ignore
        const obelisk_sdk = window.obelisk;
        const metadata = await obelisk_sdk.getMetadata(NETWORK, PACKAGE_ID);

        const privateKey = this.export_wallet();

        // new obelisk class
        const obelisk = new obelisk_sdk.Obelisk({
            networkType: NETWORK,
            packageId: PACKAGE_ID,
            metadata: metadata,
            secretKey: privateKey
        });

        const tx = new obelisk_sdk.TransactionBlock();
        const world = tx.pure(WORLD_ID);

        const params = [
            world,
        ];

        const result = await obelisk.tx.counter_system.inc(tx, params);
        console.log(result);
        setTimeout(
            async () => {
                const metadata = await obelisk_sdk.getMetadata(NETWORK, PACKAGE_ID);
                const obelisk = new obelisk_sdk.Obelisk({
                    networkType: NETWORK,
                    packageId: PACKAGE_ID,
                    metadata: metadata,
                });
                const component_name = Object.keys(obeliskConfig.singletonComponents)[1];
                const component_value = await obelisk.getComponentByName(WORLD_ID,component_name);
                const content = component_value.data.content as data
                const value = content.fields.value.fields.value
                const counter_node = find('Canvas/Camera/counter')
                const label = counter_node.getComponent("cc.Label")
                label.string = `当前counter数值为${value}`
            },
            1000
        )

    }

    update(deltaTime: number) {

    }
}

