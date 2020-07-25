import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import TestInfo from '../src/index'

const Wrapper = () => {

    const [id, setId] = useState('')

    return <div>
        <button type="button" className="getData" onClick={() => {
            setId('xxx')
        }}>GetData</button>
        <TestInfo id={id} />
    </div>
}

ReactDOM.render(<Wrapper></Wrapper>, document.querySelector('#root'))
