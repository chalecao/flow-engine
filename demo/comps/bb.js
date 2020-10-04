
/**
 * xxxx
 * - 返回Promise.resolve();会继续执行流程
 * - 返回Promise.reject();会自动结束当前流程
 * @param {*} xxx
 */
export default () => {
  // todo
  let temp = 'bb';
  console.log(temp);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ bb: temp })
    }, 1000)
  })
};