import runnable from '../src/index';
import flowConfig from './config/index'

const ONLY_DEBUG = 1
const ONLY_CONSOLE = 2
const initParam = {
    name: 123,
    debug: {
        mode: ONLY_CONSOLE,
        disableNodes: []
    }
}

const scene = 'demo'
runnable.excute(flowConfig(scene), initParam, (data) => {
    console.log('callback executed!');
    console.log(data);
})

