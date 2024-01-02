enum MongooseFunctionsNamesEnum {
  DELETE_ONE = 'deleteOne',
  CREATE = 'create',
  UPDATE_ONE = 'updateOne',
  UPDATE_MANY = 'updateMany'
}

interface IStack {
  operation: {
    model: any
    execMongooseFn: MongooseFunctionsNamesEnum
    args: object[]
  }
  callAfterOperation?: {
    fn: (...args) => Promise<any>
    args: any[]
  }
}

interface IStackEngine {
  add: (newStack: IStack) => void
  get: () => IStack[]
}

const init = () => {
  const stacks: IStack[] = []

  return {
    add: (newStack: IStack) => {
      stacks.push(newStack)
    },
    get: () => stacks
  }
}

const exec = async (stacks: IStack[]) => {
  while (stacks?.length > 0) {
    const currentStack = stacks.pop()

    if (currentStack) {
      const { model, execMongooseFn, args } = currentStack.operation
      if (args.length) {
        await model[execMongooseFn](...args)
      }

      if (currentStack.callAfterOperation?.fn) {
        const { fn, args } = currentStack.callAfterOperation
        await fn(...args)
      }
    }
  }
}

const stack = {
  init,
  exec
}

export {
  stack,
  IStack,
  IStackEngine,
  MongooseFunctionsNamesEnum
}
