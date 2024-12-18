const { multiCall } = require("../helper/chain/starknet");
const { assetTokenAbi } = require("./abi");

const supplyTokens = [
  // WBTC
  "0x0735d0f09a4e8bf8a17005fa35061b5957dcaa56889fc75df9e94530ff6991ea",
  "0x05b7d301fa769274f20e89222169c0fad4d846c366440afc160aafadd6f88f0c",
  "0x073132577e25b06937c64787089600886ede6202d085e6340242a5a32902e23e",
  "0x036b68238f3a90639d062669fdec08c4d0bdd09826b1b6d24ef49de6d8141eaa",
  // ETH
  "0x01fecadfe7cda2487c66291f2970a629be8eecdcb006ba4e71d1428c2b7605c7",
  "0x057146f6409deb4c9fa12866915dd952aa07c1eb2752e451d7f3b042086bdeb8",
  "0x07170f54dd61ae85377f75131359e3f4a12677589bb7ec5d61f362915a5c0982",
  "0x044debfe17e4d9a5a1e226dabaf286e72c9cc36abbe71c5b847e669da4503893",
  // USDC
  "0x002fc2d4b41cc1f03d185e6681cbd40cced61915d4891517a042658d61cba3b1",
  "0x05dcd26c25d9d8fd9fc860038dcb6e4d835e524eb8a85213a8cda5b7fff845f6",
  "0x06eda767a143da12f70947192cd13ee0ccc077829002412570a88cd6539c1d85",
  "0x05f296e1b9f4cf1ab452c218e72e02a8713cee98921dad2d3b5706235e128ee4",
  // DAIv0
  "0x022ccca3a16c9ef0df7d56cbdccd8c4a6f98356dfd11abc61a112483b242db90",
  "0x04f18ffc850cdfa223a530d7246d3c6fc12a5969e0aa5d4a88f470f5fe6c46e9",
  "0x02b5fd690bb9b126e3517f7abfb9db038e6a69a068303d06cf500c49c1388e20",
  "0x005c4676bcb21454659479b3cd0129884d914df9c9b922c1c649696d2e058d70",
  // USDT
  "0x0360f9786a6595137f84f2d6931aaec09ceec476a94a98dcad2bb092c6c06701",
  "0x0453c4c996f1047d9370f824d68145bd5e7ce12d00437140ad02181e1d11dc83",
  "0x06669cb476aa7e6a29c18b59b54f30b8bfcfbb8444f09e7bbb06c10895bf5d7b",
  "0x0514bd7ee8c97d4286bd481c54aa0793e43edbfb7e1ab9784c4b30469dcf9313",
  // wstETH
  "0x7e2c010c0b381f347926d5a203da0335ef17aefee75a89292ef2b0f94924864",
  "0x5eb6de9c7461b3270d029f00046c8a10d27d4f4a4c931a4ea9769c72ef4edbb",
  "0xca44c79a77bcb186f8cdd1a0cd222cc258bebc3bec29a0a020ba20fdca40e9",
  "0x9377fdde350e01e0397820ea83ed3b4f05df30bfb8cf8055d62cafa1b2106a",
  // LORDS
  "0xd294e16a8d24c32eed65ea63757adde543d72bad4af3927f4c7c8969ff43d",
  "0x2530a305dd3d92aad5cf97e373a3d07577f6c859337fb0444b9e851ee4a2dd4",
  "0x507eb06dd372cb5885d3aaf18b980c41cd3cd4691cfd3a820339a6c0cec2674",
  "0x739760bce37f89b6c1e6b1198bb8dc7166b8cf21509032894f912c9d5de9cbd",
  // STRK
  "0x7c535ddb7bf3d3cb7c033bd1a4c3aac02927a4832da795606c0f3dbbc6efd17",
  "0x40f5a6b7a6d3c472c12ca31ae6250b462c6d35bbdae17bd52f6c6ca065e30cf",
  "0x26c5994c2462770bbf940552c5824fb0e0920e2a8a5ce1180042da1b3e489db",
  "0x7c2e1e733f28daa23e78be3a4f6c724c0ab06af65f6a95b5e0545215f1abc1b",
  // nstSTRK
  "0x4b11c750ae92c13fdcbe514f9c47ba6f8266c81014501baa8346d3b8ba55342",
  "0x0142af5b6c97f02cac9c91be1ea9895d855c5842825cb2180673796e54d73dc5",
  "0x78a40c85846e3303bf7982289ca7def68297d4b609d5f588208ac553cff3a18",
  "0x67a34ff63ec38d0ccb2817c6d3f01e8b0c4792c77845feb43571092dcf5ebb5",
  // UNO
  "0x1325caf7c91ee415b8df721fb952fa88486a0fc250063eafddd5d3c67867ce7",
  "0x2a3a9d7bcecc6d3121e3b6180b73c7e8f4c5f81c35a90c8dd457a70a842b723",
  "0x6757ef9960c5bc711d1ba7f7a3bff44a45ba9e28f2ac0cc63ee957e6cada8ea",
  "0x7d717fb27c9856ea10068d864465a2a8f9f669f4f78013967de06149c09b9af",
  // NSTR
  "0x2b674ffda238279de5550d6f996bf717228d316555f07a77ef0a082d925b782",
  "0x6f8ad459c712873993e9ffb9013a469248343c3d361e4d91a8cac6f98575834",
  "0x2589fc11f60f21af6a1dda3aeb7a44305c552928af122f2834d1c3b1a7aa626",
  "0x46ab56ec0c6a6d42384251c97e9331aa75eb693e05ed8823e2df4de5713e9a4",
  // DAI
  "0x0184dd6328115c2d5f038792e427f3d81d9552e40dd675e013ccbf74ba50b979",
  "0x036e722e04ef2ccadb9229b5415272353aaeb9554c989b83d4d932dba8dbe8f9",
  "0x065bde349f553cf4bdd873e54cd48317eda0542764ebe5ba46984cedd940a5e4",
  "0x000215cbd38a1e765cfd2c60bcb291c9d0b0bb7e7f56f682f0d3501303586185",
  // EKUBO
  "0x45863a5605ea7e77f2b043888a9efb1ff6e6b0fb9e62790ff987b2e084ca1f6",
  "0x6b1063a4d5c32fef3486bf29d1719eb09481b52d31f7d86a50c64b0b8d5defb",
  "0x06fd4a9efd0c884e0b29506169dd2fcad6b284d5bdbd46ede424abc26d71164",
  "0x2360bd006d42c1a17d23ebe7ae246a0764dea4ac86201884514f86754ccc7b8",
  // xSTRK
  "0x6878fd475d5cea090934d690ecbe4ad78503124e4f80380a2e45eb417aafb9c",
  "0x1b8d8e31f9dd1bde7dc878dd871225504837c78c40ff01cbf03a255e2154bf0",
  "0x4d1125a716f547a0b69413c0098e811da3b799d173429c95da4290a00c139f7",
  "0x257afe480da9255a026127cd3a295a580ef316b297a69be22b89729ae8c1d2a",
  // BROTHER
  "0x674d79e17ae51cbf3b49d443266460dce15215277d9c3aedd7e1733112e9e52",
  "0x296f271f5ec4f45c93c1fd351bd44117795f5ef80c5134137d7dc9fce3dc364",
  "0xf7c7bf6267b4c19d531ccd959cc4fb6ca39bc04af8b173f8255567b5688636",
  "0x21bb27bc057be40e31752c53e7e8867b6d1b155ce46ae32454619adff0be777",
  // sSTRK
  "0x271f97bd18cdb2e7aff148db683be36891b0dbbffcd42024237a849ef7ad6cd",
  "0x1dd8cab616528ba64689a2b7f10bad1acd6bb4e2de3f4f5dab1839f7a89a82e",
  "0x24fbb2888e04b47f1bc1f3232528dcfc1ddf69d150b19241628e6d42b3545c6",
  "0x1fb33831f458b0786e1a041ac2e9df7603635a7caa88aa4ed30c23a787d4e3a",
];
const debtTokens = [
  "0x0491480f21299223b9ce770f23a2c383437f9fbf57abc2ac952e9af8cdb12c97",
  "0x00ba3037d968790ac486f70acaa9a1cab10cf5843bb85c986624b4d0e5a82e74",
  "0x063d69ae657bd2f40337c39bf35a870ac27ddf91e6623c2f52529db4c1619a51",
  "0x066037c083c33330a8460a65e4748ceec275bbf5f28aa71b686cbc0010e12597",
  "0x024e9b0d6bc79e111e6872bb1ada2a874c25712cf08dfc5bcf0de008a7cca55f",
  "0x348cc417fc877a7868a66510e8e0d0f3f351f5e6b0886a86b652fcb30a3d1fb",
  "0x35778d24792bbebcf7651146896df5f787641af9e2a3db06480a637fbc9fff8",
  "0x1258eae3eae5002125bebf062d611a772e8aea3a1879b64a19f363ebd00947",
  "0x292be6baee291a148006db984f200dbdb34b12fb2136c70bfe88649c12d934b",
  "0x4b036839a8769c04144cc47415c64b083a2b26e4a7daa53c07f6042a0d35792",
  "0x3e0576565c1b51fcac3b402eb002447f21e97abb5da7011c0a2e0b465136814",
  "0x06726ec97bae4e28efa8993a8e0853bd4bad0bd71de44c23a1cd651b026b00e7",
  "0x73fa792a8ad45303db3651c34176dc419bee98bfe45791ab12f884201a90ae2",
  "0x424638c9060d08b4820aabbb28347fc7234e2b7aadab58ad0f101e2412ea42d",
  "0x25a079284c3cd58bbed989250a169e7e52929070b4bcefaf8f0b9b7be77e5b1",
  "0x4349ca3d519e1b1da9da5da3cf19e2039b1776a9fe98c529f95ead7964fe0d",
];

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

async function tvl(api) {
  const supplied = await multiCall({
    calls: supplyTokens,
    abi: assetTokenAbi.totalSupply,
  });
  const borrowed = await multiCall({
    calls: debtTokens,
    abi: assetTokenAbi.totalSupply,
  });
  const underlyings = await multiCall({
    calls: debtTokens,
    abi: assetTokenAbi.underlyingAsset,
  });
  const data = [...chunks(supplied, 4)].map((chunk, i) => {
    const totalSupply = chunk.reduce((acc, cur) => acc + cur, 0);
    return totalSupply - borrowed[i];
  });
  api.addTokens(underlyings, data);
}

async function borrowed(api) {
  const borrowed = await multiCall({
    calls: debtTokens,
    abi: assetTokenAbi.totalSupply,
  });
  const underlyings = await multiCall({
    calls: debtTokens,
    abi: assetTokenAbi.underlyingAsset,
  });
  api.addTokens(underlyings, borrowed);
}

module.exports = {
  methodology:
    "The TVL is calculated as a difference between supplied and borrowed assets.",
  starknet: {
    tvl,
    borrowed,
  },
  hallmarks: [
    [1697634000, "Nostra Money Market launch"]
  ]
};
