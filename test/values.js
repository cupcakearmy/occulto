export const Precomputed = {
  Encoding: {
    Base64: {
      occulto: 'b2NjdWx0bw==',
      test: 'dGVzdA==',
      'hello world': 'aGVsbG8gd29ybGQ=',
    },
    Hex: {
      test: '74657374',
      occulto: '6f6363756c746f',
      'hello world': '68656c6c6f20776f726c64',
    },
    Bytes: {
      test: [0x74, 0x65, 0x73, 0x74],
      occulto: [0x6f, 0x63, 0x63, 0x75, 0x6c, 0x74, 0x6f],
    },
  },
  Hash: {
    SHA_1: {
      test: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      'hello world': '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed',
      occulto: 'f4b27cfb9e01492f409295fbbc339753fa839c0f',
    },
    SHA_256: {
      test: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      'hello world': 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9',
      occulto: 'df2b97515886051821e4375a33df10486ce55cb3d14acd05dd7465f820ef2481',
    },
    SHA_384: {
      test: '768412320f7b0aa5812fce428dc4706b3cae50e02a64caa16a782249bfe8efc4b7ef1ccb126255d196047dfedf17a0a9',
      'hello world': 'fdbd8e75a67f29f701a4e040385e2e23986303ea10239211af907fcbb83578b3e417cb71ce646efd0819dd8c088de1bd',
      occulto: '133c1968e937462ed66732409fa305c63335ee62b1114dd2d0ae98b4dd8fa6aca4656c919b295e41efa2d63f0d3c9951',
    },
    SHA_512: {
      test: 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff',
      'hello world':
        '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f',
      occulto:
        '9f7ff06148d415b12290ab7c21f021964ed627574f94f66c994aad4a8e319aa3168a9871edace3e736096cbd957cafa42dbf3feb6efd7763bf936ddc933c9470',
    },
  },
  Crypto: {
    Bytes: {
      14: 'e0b28a24252963ff30dd2bb3ec9c',
      16: '65eeb2044e9eb115956dbf4d0d70cd8f',
      24: '9fa9e0aace3b0bdcbc871aa3ee3ddb1bece759b811fa4603',
      32: '848ca08f01f82e28bfa91c85d55ef2a98afd8b32c707c9c790e86b1c53a177e4',
    },
    Messages: {
      test: 'test',
      occulto: 'occulto',
      weird: 'Some 🃏 weird 🃏 text',
      nietzscheIpsum:
        'Marvelous intentions joy deceptions overcome sexuality spirit against. Selfish of marvelous play dead war snare eternal-return ultimate. Reason aversion suicide.',
    },
  },
}
