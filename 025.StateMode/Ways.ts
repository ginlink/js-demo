import { PriceState } from './PriceState'
import { now } from './Util'

export enum StateWay {
  SPC = 0,
  BNB,
  API,
  UNKNOWN,
}

export class BaseState {
  priceState: PriceState

  constructor(priceState) {
    this.priceState = priceState
  }

  computePrice() {
    throw new Error('[computePrice] Implement this method')
  }
}

const startTime = now()

export class SpcWayState extends BaseState {
  computePrice() {
    setTimeout(() => {
      console.log('[diff]:', now() - startTime)

      if (now() - startTime > 2000) {
        ++this.priceState.stateIndex
        return this.priceState.setState(StateWay.BNB, { price: undefined })
      }

      this.priceState.setState(StateWay.SPC, { price: 1 })
    }, 1000)
  }
}

export class BnbWayState extends BaseState {
  computePrice() {
    setTimeout(() => {
      if (now() - startTime > 10 * 1000) {
        ++this.priceState.stateIndex
        return this.priceState.setState(StateWay.API, { price: undefined })
      }

      this.priceState.setState(StateWay.BNB, { price: 2 })
    }, 1000)
  }
}

export class ApiWayState extends BaseState {
  computePrice() {
    if (now() - startTime > 15 * 1000) {
      // ++this.priceState.stateIndex
      return this.priceState.setState(StateWay.UNKNOWN, { price: undefined })
    }

    this.priceState.setState(StateWay.API, { price: 3 })
  }
}
