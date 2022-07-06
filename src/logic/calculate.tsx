export function calculate(button: string,state: State): State {
    // 数値かどうか
    if(isNumberButton(button)) {
        return handleNumberButton(button, state)
    }
    
    // オペレーターかどうか
    if(isOperatorButton(button)) {
        return handleOperator(button,state)
    }

    // .かどうか
    if(isDotButton(button)) {
        return handleDotButton(state)
    }

    // 削除ボタンかどうか
    if(isDeleteButton(button)) {
        return handleDeleteButton(button,state)
    }

    // ACかどうか
    if(isAllClearButton(button)) {
        return handleAllClearButton()
    }

    // =かどうか
    if(isEqualButton(button)) {
        return handleEqualButton(state)
    }
    return state;
}

export interface State {
    // 現在の状態
    current: string,
    // 計算に使う数値
    operand: number,
    // オペレーター(どのように計算すべきか)
    operator: string | null,
    // 次クリアすべきか
    isNextClear: boolean

}

// 数値かどうか
function isNumberButton(button: string){
    return (
        parseInt(button)
    )
}

function handleNumberButton(button: string, state:State): State {
    if(state.isNextClear === true) {
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
}
// オペレーターかどうか
function isOperatorButton(button: string) {
    console.log(button)
    return button === "+" || button === "-";
}

function handleOperator(button: string,state: State):State {
    console.log(state);
    if(state.operand === null) {
        return {
            current: state.current,
            operand: parseFloat(state.current),
            operator: button,
            isNextClear: false
        }
    }
    // プラスを連打すると勝手に足される現象回避（だが3回押すと同じ現象になる）
    // if(state.isNextClear === true ) {
    //     return {
    //         current: state.current,
    //         operand: parseFloat(state.current),
    //         operator: button,
    //         isNextClear: false
    //     }
    // }
    const nextValue = operate(state)
    return {
        current: `${nextValue}`,
        operand: nextValue,
        operator: button,
        isNextClear: true
    }
}

// ドットかどうか
function isDotButton(button: string) {
    return button === ".";
}

function handleDotButton(state: State): State {
    if(state.current.indexOf(".") !== -1) {
        return state
    }
    return {
        current: state.current + ".",
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}

// デリートボタンかどうか
function isDeleteButton(button:string) {
    return button === "D"
}

function handleDeleteButton(button: string,state: State): State {
    // 1文字しかない時の処理
    if(state.current.length === 1) {
        return {
            current: "0",
            operand: state.operand,
            operator: state.operator,
            isNextClear: false
        }
    }
    // 1文字削除
    return {
        current: state.current.substring(0, state.current.length - 1),
        operand: state.operand,
        operator: state.operator,
        isNextClear: false
    }
}

// ACかどうか
function isAllClearButton(button: string) {
    return button === "AC";
}

function handleAllClearButton() {
    // 初期値に戻す
    return {
        current: "0",
        operand: 0,
        operator: null,
        isNextClear: false
    }
}

// =かどうか
function isEqualButton(button: string) {
    return button === "=";
}

function handleEqualButton(state: State): State {
    if(state.operator === null) {
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
function operate(state: State): number {
    const current = parseFloat(state.current)
    // console.log(state);
    if(state.operator === "+") {
        return state.operand + current
    }
    if(state.operator === "-") {
        return state.operand - current
    }
    return current;
}
