import createContext from './create-context.js';
import alsHolder from './holders/als-holder.js';
import { ContextFactory, ContextHolderFactory } from './types.js';

const createAlsContext = <T>(
  contextFactory: ContextFactory<T>,
) => createContext<T>(contextFactory, alsHolder as ContextHolderFactory<T>);

export default createAlsContext;
