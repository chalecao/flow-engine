/**
 * 将组件名称转换成具体组件
 * @param {*} arrConfig
 * @param {*} COMPS
 */
export const handleComp = (config, comps) => {
  return config.map((item) => {
    if (Array.isArray(item)) {
      return handleComp(item, comps)
    }
    if (comps[item]) {
      return comps[item]
    } 
      console.log(`${item}函数不存在，请check函数引用！`)
      return () => Promise.reject()
    
  })
}

export default handleComp
