import {Client, expect} from '@loopback/testlab';
import {ImgClassifier} from '../..';
import {setupApplication} from '../helpers/test-helper';
// import  MobileNetModel from '../../mobilenet/MobileNetModel'

describe('ClassificationController (acceptance)', () => {
  let app: ImgClassifier
  let client: Client

  before('setupApplication', async () => {
    ({app, client} = await setupApplication())
    // await MobileNetModel.getModel()
  })

  after(async () => {
    await app.stop()
  });

  it('invokes GET /classify', async function () {
    const pandaJpgUrl = 'https%3A%2F%2Fpublic-media.si-cdn.com%2Ffiler%2F97%2F20%2F97201eaf-294a-4420-a5fb-543ed60c18ad%2Fnzp-20110503-030mm.jpg'
    const res = await client.get(`/classify?url=${pandaJpgUrl}`).expect(200);
    expect(res.body).to.containEql({success: true});
  }).timeout(20000);
});
