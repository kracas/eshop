import tailwindConfig from '../../../tailwind.config';
import { IS_BROWSER } from '@lib/constants';

const getBreakpointValue = (value: string): number =>
  +tailwindConfig.theme.extend?.screens[value]!.slice(
    0,
    tailwindConfig.theme.extend?.screens[value]!.indexOf('px')
  )

export const isBreakpoint = (breakpoint: string): boolean => {
  let isBreakpoint: boolean = false;
  if (IS_BROWSER) {
    const viewportWidth = window.innerWidth;
    const breakpointValue = getBreakpointValue(breakpoint);
    isBreakpoint = viewportWidth >= breakpointValue
  }
  return isBreakpoint;
};

export default isBreakpoint;