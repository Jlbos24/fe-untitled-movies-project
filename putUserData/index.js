const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-2" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "eu-west-2",
  });

  let responseBody = "";
  let statusCode = 0;

  const { id, name, username, password, email } = JSON.parse(event.body);

  const params = {
    TableName: "users",
    Item: {
      id: id,
      name: name,
      username: username,
      password: password,
      email: email,
    },
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = "unable to post user data";
    statusCode = 404;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      myHeader: "test",
    },
    body: responseBody,
  };
  return response;
};
