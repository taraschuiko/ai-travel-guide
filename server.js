import Koa from "koa";
import cors from "@koa/cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config()

const openai = new OpenAI({
  // eslint-disable-next-line no-undef
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
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

  return openai.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        {
          role: "user",
          content: `What are things to ${categoriesListString} in ${capitalizedPlace}.
            Return a JSON object with keys: ${categoriesListString} and values as lists of strings with minimum 5 items.
            Try to make the number of characters in each list as similar as possible.
            Add a corresponding emoji at the beginning of each list item and add space after the emoji.`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    })
    .then((response) => {
      return JSON.parse(response.choices[0].message.content);
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

app.listen(3000);
