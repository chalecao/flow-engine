import aa from '../comps/aa';
import bb from '../comps/bb';
import cc from '../comps/cc';
import dd from '../comps/dd';
import config from './config.flow.json';

export default scene => ({
  config: config[scene] && config[scene].config,
  comps: {
    aa,bb,cc,dd
  },
});