import { GoogleGenAI, GenerateContentParameters, Content } from '@google/genai';
import { SYSTEM_INSTRUCTION, spotifyTool, googleHomeTool, youtubeMusicTool } from '../constants';

// This is a placeholder. In a real environment, the API key would be securely managed.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Please set the environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const tools = [{ functionDeclarations: [spotifyTool, googleHomeTool, youtubeMusicTool] }];

export const sendMessageToGem = async (history: Content[], userMessage: string): Promise<{ text: string }> => {
  const modelName = 'gemini-3-pro-preview';
  console.log(`Using model: ${modelName}`);

  const latestUserContent: Content = { role: 'user', parts: [{ text: userMessage }] };
  
  const request: GenerateContentParameters = {
    model: modelName,
    contents: [...history, latestUserContent],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: tools,
    },
  };

  try {
    const response = await ai.models.generateContent(request);

    const functionCalls = response.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
        const modelTurn = response.candidates?.[0]?.content;
        if (!modelTurn) {
            return { text: "[SAD] I seem to have lost my train of thought after that action." };
        }
        
        const toolTurn: Content = {
            role: 'tool',
            parts: functionCalls.map(functionCall => ({
                functionResponse: {
                    name: functionCall.name,
                    response: { result: `[NEUTRAL] Okay, I've handled the action: ${functionCall.name}.` },
                }
            }))
        };

        // Send the function response back to the model for a final text response
        const secondResponse = await ai.models.generateContent({
            model: modelName,
            contents: [...history, latestUserContent, modelTurn, toolTurn],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                tools: tools,
            }
        });
        return { text: secondResponse.text ?? "[SAD] I seem to have lost my train of thought after that action." };
    }

    return { text: response.text ?? "[SAD] I'm sorry, I couldn't think of a response." };
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw error;
  }
};