import runnable from '../src/index'
import flowConfig from './config/index'

const scene = 'demo'

const ONLY_DEBUG = 1
const ONLY_CONSOLE = 2
const initParam = {
    name: 123,
    debug: {
        mode: ONLY_CONSOLE,
        disableNodes: [],
    },
}

runnable.excute(flowConfig(scene), initParam, (data) => {
    console.log('callback executed!')
    console.log(data)
})