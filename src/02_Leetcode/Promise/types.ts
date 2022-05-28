export type Executor = (resolve: (result: any) => void, reject: (reason: any) => void) => void

export enum PromiseState {
  PENDING,
  FULFILLED,
  REJECTED,
}
