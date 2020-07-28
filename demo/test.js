import runnable from '../src/index.js';
import flow from './config'

/**
 * 指定对应流程标识的配置流程
 * @param {*} scene 具体流程标识
 */
const exeAlipayFlow = (scene) => {
    return runnable.excute(flow(scene), {
        debug: {
            mode: 2, // 打印执行流程
            // mode: 1,  // debug执行流程
            disabledNodes: [], // 禁用的流程
        },
    }, (data) => {
        // 流程最后执行完的回调函数
        console.log("流程执行结束", data)
    });
}

exeAlipayFlow('test')