/* eslint-disable */
/**
 * 流程执行引擎，具体使用参考test/unit/runFlow.spec.js测试用例
 */
const ONLY_DEBUG = 1
const ONLY_CONSOLE = 2
const runnable = {
  /**
   * @param config - 流程配置，[[a1,a2],b1,c1], 表意是a1和a2先执行的返回作为第一部，返回数据是第二步b1的入参，然后执行b1,
   * 然后执行c1，支持嵌套。
   * @param params - 初始化入参数，会和函数返回值合并（返回值会覆盖入参同名参数），依次会传入所有参数
   *  - debugMod, =1 会在每次执行的时候debug, =2只打印函数名和出入参
   * @param callback - 回调函数，回调函数的入参是最后执行的返回值
   */
  excute: async (config, params, callback) => {
    let trancformConfig = config
    if (config.config && config.comps) {
      runnable.comps = config.comps
      trancformConfig = config.config
    }
    try {
      const result = await runnable.callbackWrapper(0, trancformConfig)(params);
      callback && callback(result);
      return result;
    } catch (e) {
      if (e) {
        console.log(`执行函数： 回调函数异常：`, e)
        console.log(`配置：`, config)
        console.log(`参数：`, params)
        console.log(`回调：`, callback)
      }
    }
  },
  callbackWrapper: (index, config) => async (params) => {
    if (config[index]) {
      const next = index + 1;
      return await runnable.exec(config[index], params, config[next] ? runnable.callbackWrapper(next, config) : null);
    }
  },
  exec: async (funcs, params, callback) => {
    if (!Array.isArray(funcs)) {
      funcs = [funcs];
    }
    const asyncFunc = [];
    funcs.forEach((func) => {
      asyncFunc.push(new Promise(async (resolve, reject) => {
        if (typeof func === 'string') {
          let realFunc = runnable.comps[func]
          if (realFunc) {
            try {
              if (params.debug) {
                let { mode, disableNodes } = params.debug
                if ([ONLY_DEBUG, ONLY_CONSOLE].includes(+mode)) {
                  console.log(`执行函数：${func},参数：`, params)
                }
                if (ONLY_DEBUG === +mode) {
                  debugger;
                }
                if (disableNodes && disableNodes.includes(func)) {
                  reject()
                }
              }
              resolve(await realFunc(params));
            } catch (e) {
              if (e) {
                console.error(`执行函数：${func} 异常：`, e)
                console.error(`参数：`, params)
              }
            }
          } else {
            console.error(`${func}函数不存在，请check函数引用！`)
            reject()
          }
        } else if (Array.isArray(func)) {
          resolve(await runnable.excute(func, params));
        }
      }));
    });
    const result = { ...params, ... await Promise.race(asyncFunc) };
    return callback ? await callback(result) : result;
  },
};

export default runnable;
