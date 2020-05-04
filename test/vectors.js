const test = require('tape')

// http://131002.net/blake/blake.pdf
const vectors = [{
  input: '00',
  blake224: '4504cb0314fb2a4f7a692e696e487912fe3f2468fe312c73a5278ec5',
  blake256: '0ce8d4ef4dd7cd8d62dfded9d4edb0a774ae6a41929a74da23109e8f11139c87',
  blake384: '10281f67e135e90ae8e882251a355510a719367ad70227b137343e1bc122015c29391e8545b5272d13a7c2879da3d807',
  blake512: '97961587f6d970faba6d2478045de6d1fabd09b61ae50932054d52bc29d31be4ff9102b9f69e2bbdb83be13d4b9c06091e5fa0b48bd081b634058be0ec49beb3'
}, {
  input: '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blake224: 'f5aa00dd1cb847e3140372af7b5c46b4888d82c8c0a917913cfb5d04',
  blake256: 'd419bad32d504fb7d44d460c42c5593fe544fa4c135dec31e21bd9abdcc22d41'
}, {
  input: '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blake384: '0b9845dd429566cdab772ba195d271effe2d0211f16991d766ba749447c5cde569780b2daa66c4b224a2ec2e5d09174c',
  blake512: '313717d608e9cf758dcb1eb0f0c3cf9fc150b2d500fb33f51c52afc99d358a2f1374b8a38bba7974e7f6ef79cab16f22ce1e649d6e01ad9589c213045d545dde'
}]

module.exports = (name, createHash) => {
  for (let i = 0; i < vectors.length; ++i) {
    const vector = vectors[i]
    const input = Buffer.from(vector.input, 'hex')

    for (const hash of Object.keys(vector)) {
      if (hash === 'input') continue

      test(`${name} ${hash} vector#${i}`, (t) => {
        t.equal(createHash(hash).update(input).digest('hex'), vector[hash])
        t.end()
      })
    }
  }
}
