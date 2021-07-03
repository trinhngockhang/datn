var q = "items";

var open = require("amqplib").connect("amqp://localhost");
var elasticsearch = require("elasticsearch");

var client = new elasticsearch.Client({
  hosts: "http://localhost:9200",
});

client.indices.create(
  {
    index: "items",
  },
  function (err, resp, status) {
    if (err) {
      // console.log(err);
    } else {
      console.log("create", resp);
    }
  }
);

open
  .then(function (conn) {
    return conn.createChannel();
  })
  .then(function (ch) {
    return ch.assertQueue(q).then(function (ok) {
      return ch.consume(q, function (msg) {
        if (msg !== null) {
          console.log(msg.content.toString());
         
          
          insertToElastic(JSON.parse(msg.content), () => ch.ack(msg));
        }
      });
    });
  })
  .catch(console.warn);

const insertToElastic = (item, cb) => {
  client.index(
    {
      index: "items",
      id: item.id,
      type: "items",
      body: item
    },
    function (err, resp, status) {
    if(!err)cb();
      console.log(resp);
    }
  );
};
