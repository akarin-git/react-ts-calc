import Display from "./Display"
import ButtonPanel from "./ButtonPanel"
import { calculate, State } from "../logic/calculate"
import { useState } from "react"

export default function Calculator() {
    const [state, setState] = useState<State>({
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false
    })
    const buttonHandler = (code: string) => {
        // console.log(code);
        const nextState = calculate(code,state)
        setState(nextState)
    }
    return (
        <div>
            {/* <Display value={state.current}/> */}
            <Display value={state.current}/>
            {/* <ButtonPanel buttonHandler={buttonHandler}/> */}
            <ButtonPanel buttonHandler={buttonHandler}/>
        </div>

    )
}