export default class client_service {
  getClient(code) {
    return clients.find(client => client.code == code);
  }
}

const clients = [
  {
    code: 49002010965,
    segment: 0,
    modifier: 0,
  },
  {
    code: 49002010976,
    segment: 1,
    modifier: 100,
  },
  {
    code: 49002010987,
    segment: 2,
    modifier: 300,
  },
  {
    code: 49002010998,
    segment: 3,
    modifier: 1000,
  },
];
