/**
 * 设计模式-状态模式
 */

import { PriceState } from './PriceState'
import { ApiWayState, BnbWayState, SpcWayState } from './Ways'

export function main() {
  const priceState = new PriceState()

  const spcState = new SpcWayState(priceState)
  const bnbState = new BnbWayState(priceState)
  const apiState = new ApiWayState(priceState)

  priceState.stateQueue.push(spcState)
  priceState.stateQueue.push(bnbState)
  priceState.stateQueue.push(apiState)

  priceState.computePrice()
  const price = priceState.getPrice()
  console.log('[price]:', price)

  setInterval(() => {
    priceState.computePrice()

    const price = priceState.getPrice()
    console.log('[price]:', price)
  }, 1000)
}

main()

export {}
