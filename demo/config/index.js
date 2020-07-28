import aa1 from '../comps/aa1';
import aa3 from '../comps/aa3';
import bb1 from '../comps/bb1';
import config from './config.flow.json';

export default scene => ({
  config: config[scene] && config[scene].config,
  comps: {
    aa1,aa3,bb1
  },
});