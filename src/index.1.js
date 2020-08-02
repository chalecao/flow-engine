/**
 * 流程执行引擎，具体使用参考test/unit/runFlow.spec.js测试用例
 */
const runnable = {
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
