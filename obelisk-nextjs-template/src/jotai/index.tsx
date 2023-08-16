import {atom} from "jotai";

const SellPop_up_boxState = atom(false)
const SellState = atom({
    type:"",
    hash:"",
    state:false
})
const OpenBoxState = atom(false)

export {SellPop_up_boxState,SellState,OpenBoxState}
