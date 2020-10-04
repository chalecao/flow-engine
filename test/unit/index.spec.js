/* eslint-disable */
// 单元测试用例示例
import { expect } from 'chai';
import runnable from '../../src/index.js';

let info = [];
const clog = (msg) => {
  info.push(msg);
};
const aa1 = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clog('aa1')
      resolve({ aa1: 'aa1' })
    }, 300)
  })
}

const aa2 = (time = 300) => (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clog('aa2')
      resolve({ ...params, aa2: 'aa2' })
    }, time)
  })
}

const aa3 = (time = 300) => (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clog('aa3')
      resolve({ ...params, aa3: 'aa3' })
    }, time)
  })
}

const bb1 = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clog('bb1')

      resolve({ ...params, bb1: 'bb1' })
    }, 300)
  })
}

const cc1 = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clog('cc1')

      resolve({ ...params, cc1: 'cc1' })
    }, 300)
  })

}
const cc2 = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      clog('cc2')

      resolve({ ...params, cc2: 'cc2' })
    }, 300)
  })
}

const config = {
  normal1: [
    [aa1, aa3],
    [bb1],
    [cc2, cc1],
  ],
  normal2: [
    [aa1, aa2],
    [bb1],
    [cc2],
  ],
  normal3: [
    [aa1, aa2(), aa3()],
    bb1,
    [cc1, cc2],
  ],
  embed1: [
    [[cc1, cc2], aa2(700), aa3(800)],
    bb1,
    [aa2(400), aa3()],
  ],
  embed2: [
    [[cc1, cc2], aa2(700), aa3(800)],
    bb1,
    [[aa2(400), aa3()]],
  ]
}

describe('测试流程执行器', function () {
  it('通过log测试', function (done) {
    info = []
    runnable.excute(config['normal3'])
    setTimeout(() => {
      expect(JSON.stringify(info)).to.be.equal(JSON.stringify(['aa1', 'aa2', 'aa3', 'bb1', 'cc1', 'cc2']));
      done();
    }, 1000)

  });

  it('通过返回值测试', async function () {
    await runnable.excute(config['normal3'], { 11: 11 }, (result) => {
      expect(JSON.stringify(result)).to.be.equal(JSON.stringify({ 11: 11, "aa1": "aa1", "bb1": "bb1", "cc1": "cc1" }));
    })
  });

  it('嵌套流程测试', async () => {
    await runnable.excute(config['embed1'], { 11: 11 }, (result) => {
      expect(JSON.stringify(result)).to.be.equal(JSON.stringify({ "11": 11, "cc1": "cc1", "cc2": "cc2", "bb1": "bb1", "aa3": "aa3" }));
    })
  });

  it('嵌套流程测试2', async () => {
    await runnable.excute(config['embed2'], { 11: 11 }, (result) => {
      expect(JSON.stringify(result)).to.be.equal(JSON.stringify({ "11": 11, "cc1": "cc1", "cc2": "cc2", "bb1": "bb1", "aa2": "aa2", "aa3": "aa3" }));
    })
  });
  it('测试入参层次传递', async () => {
    await runnable.excute(config['embed2'], { 22: 11 }, (result) => {
      expect(JSON.stringify(result)).to.be.equal(JSON.stringify({ "22": 11, "cc1": "cc1", "cc2": "cc2", "bb1": "bb1", "aa2": "aa2", "aa3": "aa3" }));
    })
  });
});

