import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
global.navigator = window.navigator;

import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme());
