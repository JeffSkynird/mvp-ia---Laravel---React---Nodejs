import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  try {
  /*  const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(req.body.prompt, req.body.command),
      temperature: 0.6,
      max_tokens: 100
    });*/
    //res.status(200).json({ result: completion.data.choices[0].text });
    res.status(200).json({ result: "Hola" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result:'Error: Revisar token de acceso o intentar de nuevo' });
  }
}

function generatePrompt(prompt, command) {
  return `
  ${prompt}
  Con el texto anterior haz lo siguiente:
  ${command}
  `;
}
