
/**
 * xxxx
 * - 返回Promise.resolve();会继续执行流程
 * - 返回Promise.reject();会自动结束当前流程
 * @param {*} xxx
 */
export default () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('aa1')
      resolve({ aa1: 'aa1' })
    }, 300)
  })
};