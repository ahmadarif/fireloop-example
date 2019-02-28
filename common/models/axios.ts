import { Model } from '@mean-expert/model';
import axios from 'axios';
import { disableAllRemoteMethods } from '../../server/helpers/remote-method.helper';

@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    myRemote: {
      returns : { root: true },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})
class Axios {
  constructor(public model: any) {
    disableAllRemoteMethods(model);
  }

  beforeSave(ctx: any, next: Function): void {
    console.log('Queue: Before Save');
    next();
  }

  async myRemote(next: Function) {
    const res = await axios.get('http://localhost:3000');

    if (Math.random() > 0.5) {
      const error: any = {
        statusCode: 422,
        message: 'Something error'
      };
      return next(error);
    } else {
      return next(null, res.data);
    }
  }
}

module.exports = Axios;
