const Queue = require('bee-queue')

export const updatePriceQueue = new Queue('updatePrice')
export const emitUpdatePrice = (price: PriceDto) => {}