import os
import time
from dotenv import load_dotenv
import google.generativeai as genai


# Load environment variables
load_dotenv()


# Configure Gemini
API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")


if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")


genai.configure(api_key=API_KEY)


# Load model dynamically
model = genai.GenerativeModel(MODEL_NAME)



def generate_marketing_copy(prompt, temperature=0.7, top_p=0.9):
    """
    Generate marketing copy using Gemini AI.
    """

    generation_config = genai.types.GenerationConfig(
        temperature=temperature,
        top_p=top_p
    )


    max_retries = 2


    for attempt in range(max_retries):

        try:

            response = model.generate_content(
                prompt,
                generation_config=generation_config
            )


            if response.text:
                return response.text


            return "No content generated. Please try again."


        except Exception as e:

            error_message = str(e).lower()


            # Temporary quota/rate limit handling
            if "429" in error_message or "quota" in error_message:

                if attempt < max_retries - 1:
                    time.sleep(5)
                    continue


                return (
                    "AI service is temporarily unavailable due to high usage. "
                    "Please try again later."
                )


            # Other errors
            return (
                "Something went wrong while generating content. "
                "Please try again."
            )


    return "Unable to generate content currently."