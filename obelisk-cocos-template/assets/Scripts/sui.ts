import { _decorator, Component, log, Node,find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('sui')
export class sui extends Component {
    async start() {
        // console.log("1")
        // const sui  = window.sui;
        // console.log(sui)
        this.sui_account_create()
    }

    async sui_account_create(){
        const window_obelisk = window.obelisk
        console.log(window_obelisk)
        const obelisk  = new window_obelisk.Obelisk({
            secretKey: 'c71a1529d774a80d521e02953ce656f1b1cef126451daacaebec763f8dd0b535',
            networkType: 'testnet',
        })
        const obeject_id = '0x97706e7066536b8c542c175e77eec801989cca8c3c4c68b80db056c5ca30330f'
        const result = await obelisk.getObjects([obeject_id])
        const counter_node = find('Canvas/Camera/counter')
        const label = counter_node.getComponent("cc.Label")
        label.string = `当前counter数值为${result[0].objectFields.number}`

    }

    async gameStart() {
        const window_obelisk = window.obelisk
        console.log(window_obelisk)
        const obelisk  = new window_obelisk.Obelisk({
            secretKey: 'c71a1529d774a80d521e02953ce656f1b1cef126451daacaebec763f8dd0b535',
            networkType: 'testnet',
        })
        const world_id = '0xea07f58052bcdef935a3eee097d41a97bc4a0f0b1b60ff6b18f2caa858609bf8'
        const system_name = 'counter_change'
        const counter =  '0x97706e7066536b8c542c175e77eec801989cca8c3c4c68b80db056c5ca30330f'
        const result= await obelisk.call(world_id,system_name,counter)
        console.log(result)
        setTimeout(
            async () => {
                const obeject_id = '0x97706e7066536b8c542c175e77eec801989cca8c3c4c68b80db056c5ca30330f'
                const result = await obelisk.getObjects([obeject_id])
                const counter_node = find('Canvas/Camera/counter')
                const label = counter_node.getComponent("cc.Label")
                label.string = `当前counter数值为${result[0].objectFields.number}`
            }, 
            1000
        )   
    
        
    }

    update(deltaTime: number) {
        
    }
}

