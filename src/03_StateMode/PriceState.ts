import { ApiWayState, BaseState, BnbWayState, SpcWayState, StateWay } from './Ways'

type SatePayload = {
  price?: number
}

export class PriceState {
  private _currentPrice: number | undefined
  stateQueue: BaseState[] = []
  stateIndex: StateWay = StateWay.SPC

  setState(stateIndex: StateWay, payload?: SatePayload) {
    const { price } = payload || {}

    this.stateIndex = stateIndex
    this._currentPrice = price
  }

  computePrice() {
    if (this.stateIndex === StateWay.UNKNOWN) {
      return console.warn('[warn]:', 'All methods have been tried to get the price, but not success')
    }

    this.stateQueue[this.stateIndex].computePrice()
  }

  getPrice() {
    return this._currentPrice
  }
}
