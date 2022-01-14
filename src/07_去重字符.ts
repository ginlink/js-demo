function uniquChar(str) {
  let set = new Set()
  for (let i = 0;i < str.length;++i) set.add(str[i])
  return [...set].join('')
}

let str = '123333世纪东方了即可即3'
str = `
lang=中文
first_title=这一次，众望所归
first_content=三重激励，全新的做市体验
Enter=进入应用
more=了解更多
second_title=创新式范围订单设计
second_content=用户在指定交易对的某一价格区间内挂单
three_title='资本效率提高 <span id="zh-number">7000倍</span>'
three_content=AMM深度挖掘，带来更低滑点
four_title=三重激励
four_content='交易挖矿、流动性挖矿、LP手续费返还<br />持续为生态赋能'
partners=合作伙伴
promise=承诺让我们不断向前
lang=English
first_title='This time<br />as expected'
first_content='Triple incentives, brand new market making experience<br />Enter the application to Learn more'
Enter=Enter
more=More
second_title='Innovation<br />is scope order design'
second_content='The user places an order within a certain<br /> price range of the trading pair'
three_title='Capital efficiency<br />increased<br />by <span id="number">7000</span> times'
three_content='AMM deep excavation brings lower slippage'
four_title='Triple<br />incentives'
four_content='Transaction Mining<br />Yield Farming<br />LP handling fee return<br />Continue to empower the ecology'
partners=Partners
promise=Promise to keep us moving forward
`
console.log('[]:', uniquChar(str))