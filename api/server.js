/* eslint-disable no-undef */
const Koa = require("koa");
const cors = require("@koa/cors");
const dotenv = require("dotenv");
const NodeCache = require("node-cache");
const OpenAI = require("openai");
// const mockedResponse = require("./mockedResponse.json");

dotenv.config();
const myCache = new NodeCache();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const categories = [
  "do",
  "see",
  "eat",
  "drink",
  "buy",
  "know",
  "avoid",
  "bring",
  "wear",
];

const getThingsToDo = (place) => {
  const capitalizedPlace = place.charAt(0).toUpperCase() + place.slice(1);
  const categoriesListString = categories.join(", ");

  const cachedValue = myCache.get(capitalizedPlace);
  if (cachedValue != undefined) {
    return Promise.resolve(cachedValue);
  }

  // Mocked response for testing
  // return Promise.resolve(mockedResponse);

  return openai.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        {
          role: "user",
          content: `What are things to ${categoriesListString} specifically in ${capitalizedPlace}.
            Return a JSON object with keys: ${categoriesListString} and values as lists of strings with minimum 5 and maximum 10 items.
            Try to make the number of characters in each list as similar as possible.
            Add a corresponding emoji at the beginning of each list item and add space after the emoji.`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    })
    .then((response) => {
      const data = response.choices[0].message.content;
      myCache.set(capitalizedPlace, data);

      return data;
    });
};

const app = new Koa();

app.use(cors());

app.use(async (ctx) => {
  try {
    ctx.response.status = 200;
    ctx.response.message = "OK";
    ctx.response.body = await getThingsToDo(ctx.request.url.split("/")[1]);
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.message = "Internal Server Error";
    ctx.response.body = { error };
  }
});

app.listen(process.env.PORT);
