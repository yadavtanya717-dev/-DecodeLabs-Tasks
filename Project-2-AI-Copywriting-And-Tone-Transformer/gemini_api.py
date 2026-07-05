import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load Gemini model
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_marketing_copy(prompt, temperature=0.7, top_p=0.9):
    """
    Generate marketing copy using Gemini AI.

    Args:
        prompt (str): The prompt to send to Gemini.
        temperature (float): Controls creativity.
        top_p (float): Controls diversity.

    Returns:
        str: AI-generated marketing copy.
    """

    generation_config = genai.types.GenerationConfig(
        temperature=temperature,
        top_p=top_p
    )

    response = model.generate_content(
        prompt,
        generation_config=generation_config
    )

    return response.text