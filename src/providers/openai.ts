import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

export default openai;
