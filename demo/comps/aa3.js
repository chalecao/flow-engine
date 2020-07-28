
/**
 * xxxx
 * - 返回Promise.resolve();会继续执行流程
 * - 返回Promise.reject();会自动结束当前流程
 * @param {*} xxx
 */
export default (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('aa3')
      resolve({ ...params, aa3: 'aa3' })
    }, 350)
  })
};