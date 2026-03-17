import createContext from './create-context.js';
import mixinHolder from './holders/mixin-holder.js';
import { ContextFactory, ContextHolderFactory } from './types.js';

const createAlsContext = <T>(
  contextFactory: ContextFactory<T>,
) => createContext<T>(contextFactory, mixinHolder as ContextHolderFactory<T>);

export default createAlsContext;
