const API_KEY = "AIzaSyDvnoLPmBCN5dE5tjNYiCAlWV5-yFvWhZA"; // Replace with your Google Cloud Vision API key
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

function generateBody(image: string) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: "TEXT_DETECTION",
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}

export async function callGoogleVisionAsync(image: string) {
  try {
    const body = generateBody(image);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    if (result.responses && result.responses[0]?.fullTextAnnotation?.text) {
      return result.responses[0].fullTextAnnotation.text;
    }
    return null;
  } catch (error) {
    console.error("Error calling Google Vision API:", error);
    throw error;
  }
}
