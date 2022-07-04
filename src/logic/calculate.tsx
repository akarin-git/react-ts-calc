export function calculate(button: string, state: State): State {

    // 数値かどうか
    if(isNumberButton(button)) {
        return handleNumberButton(button, state)
    }
    // オペレーターかどうか
    if(isOperatorButton(button)) {
        // console.log(button)
        return handleOperatorButton(button, state)
    }
    // // .かどうか
    if(isDotButton(button)) {
        return handleDotButton(state)
        
    }
    // // 削除ボタンかどうか
    if(isDeleteButton(button)) {
        return handleDeleteButton(state)
    }
    // // ACかどうか
    if(isAllClearButton(button)) {
        return handleAllClearButton()
    }
    // // = かどうか
    if(isEqualButton(button)) {
        return handleEqualButton(state)
    }
    return state;
}

export interface State {
    // 現在の状態
    current: string;
    // 計算に使う数値
    operand: number;
    // どのような計算をするのか
    operator: string | null,
    // クリアすべきか
    isNextClear: boolean
}

function isNumberButton(button: string) {
    return(
        parseInt(button)
        // button === "0" ||
        // button === "1" ||
        // button === "2" ||
        // button === "3" ||
        // button === "4" ||
        // button === "5" ||
        // button === "6" ||
        // button === "7" ||
        // button === "8" ||
        // button === "9" 
        )
};
// numberボタンが押された時の状態変化
function handleNumberButton(button: string, state: State): State {
    // console.log(button)
    if(state.isNextClear) {
        return {
            current: button,
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        }
    }
    if(state.current === "0") {
        return {
            current: button,
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        }
    }
    return {
        current: state.current + button,
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
};

// オペレーターボタンが押された時
function isOperatorButton(button: string) {
    return button === "+" || button === "-";
}
// オペレーターボタンが押された時の状態変化
function handleOperatorButton(button: string, state: State): State {
    // console.log(button);
    if(state.operand === null) {
        return {
            current: state.current,
            operand: parseFloat(state.current),
            operator: button,
            isNextClear: true
        }
    }
    const nextValue= operate(state)
    return {
        current: `${nextValue}`,
        operand: nextValue,
        operator: button,
        isNextClear: true
    }
}
// .ボタンが押された時
function isDotButton(button: string) {
    // console.log(button);
    return button === ".";
}
// .ボタンが押された時の状態変化
function handleDotButton(state: State): State {
    console.log(state);
    if(state.current.indexOf('.') !== -1) {
        return state
    }
    return {
        current: state.current + ".",
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}
// Dボタンが押された時
function isDeleteButton(button: string) {
    console.log(button)
    return button === "D";
}
// Dボタンが押された時の状態変化
function handleDeleteButton(state: State): State {
    if(state.current.length === 1) {
        return {
            current: "0",
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        }
    }
    // １文字削除
    return {
        current: state.current.substring(0, state.current.length - 1),
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}

// ACボタンかどうか
function isAllClearButton(button: string) {
    // console.log(button)
    return button === "AC";
}

function handleAllClearButton(): State {
    return {
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false
    }
}

// =ボタンかどうか
function isEqualButton(button: string) {
    return button === "=" ;
}

function handleEqualButton(state: State): State {
    // もし+や-が押されていなかった時はそのままの状態にしておく
    if (state.operator === null ) {
        return state
    }
    const nextValue = operate(state)
    return {
        current: `${nextValue}`,
        operand: 0,
        operator: null,
        isNextClear: true
    }
}

// 計算
function operate(state:State): number {
    const current = parseFloat(state.current)
    if(state.operator === "+") {
        return state.operand + current
    }
    if(state.operator === "-") {
        return state.operand - current
    }
    return current;
}