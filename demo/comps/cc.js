
/**
 * xxxx
 * - 返回Promise.resolve();会继续执行流程
 * - 返回Promise.reject();会自动结束当前流程
 * @param {*} xxx
 */
export default () => {
  // todo
  let temp = 'cc';
  console.log(temp);
  return Promise.resolve({ cc: temp });
};