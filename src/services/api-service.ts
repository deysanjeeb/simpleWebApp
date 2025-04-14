
/**
 * Represents the response from the external API after submitting data.
 */
export interface ApiResponse {
  /**
   * A message indicating the status of the submission.
   */
  message: string;
  /**
   * A boolean indicating if the submission was successful.
   */
  success: boolean;
}

/**
 * Asynchronously submits data to a specified URL via a POST request.
 *
 * @param data The data to be submitted.
 * @param url The URL to which the data will be submitted.
 * @returns A promise that resolves to an ApiResponse object.
 */
export async function postData(data: any, url: string): Promise<ApiResponse> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle HTTP errors (e.g., 500, 404)
      console.error(`HTTP error! status: ${response.status}`);
      return {
        message: `Submission failed: HTTP error ${response.status}`,
        success: false,
      };
    }

    const result = await response.json(); // Assuming the API returns JSON
    return {
      message: result.message || 'Data successfully submitted!',
      success: result.success === true, // Ensure success is a boolean
    };
  } catch (error) {
    // Handle network errors or JSON parsing errors
    console.error("Submission error:", error);
    return {
      message: 'Submission failed due to an error.',
      success: false,
    };
  }
}
