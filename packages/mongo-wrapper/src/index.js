const { MongoClient } = require('mongodb');
const EventEmitter = require('events');

export default class MongoWrapper extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;

    this.db = null;
    this.client = null;
    this.url = '';
  }

  async connect(url) {
    this.url = url;

    await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }, (error, client) => {
      if (error) {
        this.emit('error', error);
        return;
      }

      this.client = client;
      this.db = this.client.db(this.name);
      this.emit('connected');
    });
  }

  async disconnect() {
    if (!this.client) {
      throw new Error('Database connection missing');
    }

    await this.client.close();
  }
}
