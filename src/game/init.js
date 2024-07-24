import { Application, Graphics } from 'pixi.js'

import { RowNumber, gridLength } from './config.js'

const init = async (refValue) => {
  let app = new Application()
  await app.init({
    width: RowNumber * gridLength + 100,
    height: RowNumber * gridLength,
    background: 0xcfcbc7
  })
  refValue.appendChild(app.canvas)
}

export { init }
