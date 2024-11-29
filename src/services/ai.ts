import { model } from '../config/gemini';
import { useKnowledgeBase } from '../store/knowledgeBase';
import { useSystemInstructions } from '../store/systemInstructions';

function preparePrompt(userPrompt: string): string {
  const { documents, enabled: kbEnabled } = useKnowledgeBase.getState();
  const { content: instructions, enabled: insEnabled } = useSystemInstructions.getState();
  
  let finalPrompt = '';

  if (insEnabled) {
    finalPrompt += `${instructions}\n\n`;
  }

  if (kbEnabled && documents.length > 0) {
    finalPrompt += `Context information:\n${documents.join('\n\n')}\n\n`;
  }

  finalPrompt += userPrompt;
  return finalPrompt;
}

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const enhancedPrompt = preparePrompt(prompt);
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response. Please try again.');
  }
}