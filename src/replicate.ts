import { model_n_version } from "./models/ai_model";

export enum ImageGenerationModel {
  Stable_Diffusion_3 = "stability-ai/stable-diffusion-3",
  SDXL_Lightning = "bytedance/sdxl-lightning-4step",
  Playground_V2_5 = "playgroundai/playground-v2.5-1024px-aesthetic",
  Flux_Schnell = "black-forest-labs/flux-schnell",
}

export enum TextGenerationModel {
  Llama3 = "meta/meta-llama-3-70b-instruct",
  Mixtral = "mistralai/mixtral-8x7b-instruct-v0.1",
  Gemma_2b = "google-deepmind/gemma-2b-it",
}

export enum MusicGenerationModel {
  Musicgen = "meta/musicgen",
  Riffusion = "riffusion/riffusion",
  Musicgen_Songstarter = "nateraw/musicgen-songstarter-v0.2",
}

export enum SpeechGenerationModel {
  Styletts2 = "adirik/styletts2",
  Xtts_v2 = "lucataco/xtts-v2",
  Bark = "suno-ai/bark",
}

export class Replicate {
  private readonly __headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
    Accept: "application/json",
    "Accept-Language": "en-US,en;q=0.5",
    "Content-Type": "application/json",
    Origin: "https://replicate.com",
    DNT: "1",
    Connection: "keep-alive",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    TE: "trailers",
  };

  private readonly __main_url = "https://homepage.replicate.com/api/prediction";

  private __model:
    | ImageGenerationModel
    | TextGenerationModel
    | MusicGenerationModel
    | SpeechGenerationModel;

  /**
   * Initializes a new instance of the class with the specified model.
   *
   * @param model - The model to be used for image, text, music, or speech generation.
   * @throws Error if the provided model does not exist in the available models.
   */
  constructor(
    model:
      | ImageGenerationModel
      | TextGenerationModel
      | MusicGenerationModel
      | SpeechGenerationModel
  ) {
    if (!(model in model_n_version))
      throw new Error(`Model "${model}" doesn't exist.`);

    this.__model = model;
  }

  /**
   * Asynchronously generates speech based on the provided prompt and speaker (optional).
   * Throws an error if the prompt is missing or if the Xtts_v2 model requires a speaker.
   *
   * @param input - An object containing the prompt and optional speaker for speech generation.
   * @returns A Promise that resolves to an object with details of the generated speech:
   *  - generation_id: The ID of the generated speech.
   *  - generation_status: The status of the speech generation.
   *  - created_at: The timestamp when the speech was generated.
   *  - model: The speech generation model used.
   *  - input: An object with the prompt and optional speaker used for generation.
   */
  async run(input: { prompt: string; speaker?: string }): Promise<{
    generation_id: string;
    generation_status: string;
    created_at: string;
    model: string;
    input: {
      prompt: string;
      speaker?: string;
    };
  }> {
    if (!input.prompt) throw new Error(`"prompt" is required in the input.`);
    if (this.__model === SpeechGenerationModel.Xtts_v2 && !input.speaker)
      throw new Error(`"speaker" is required for the Xtts_v2 model.`);

    const version = model_n_version[this.__model];

    const request = await fetch(this.__main_url, {
      method: "POST",
      headers: this.__headers,
      body: JSON.stringify({
        model: this.__model,
        version,
        input,
      }),
    });

    if (!request.ok)
      throw new Error(`Request failed with status ${request.status}.`);

    const response = await request.json();

    return {
      generation_id: response.id,
      generation_status: response.status,
      created_at: response.created_at,
      model: response.model,
      input,
    };
  }

  /**
   * Asynchronously retrieves information about a specific generation identified by its ID.
   *
   * @param generation_id - The ID of the generation to retrieve information for.
   * @returns A Promise that resolves to an object containing details of the generation:
   *  - generation_id: The ID of the generation.
   *  - generation_status: The status of the generation.
   *  - created_at: The timestamp when the generation was created.
   *  - started_at: The timestamp when the generation started.
   *  - completed_at: The timestamp when the generation completed.
   *  - model: The model used for the generation.
   *  - output: The output of the generation.
   *  - metrics: An object with metrics including image_count and predict_time.
   */
  async getGeneration(generation_id: string): Promise<{
    generation_id: string;
    generation_status: string;
    created_at: string;
    started_at: string;
    completed_at: string;
    model: string;
    output: string;
    metrics: {
      image_count: number;
      predict_time: number;
    };
  }> {
    const request = await fetch(
      `https://homepage.replicate.com/api/poll?id=${generation_id}`,
      {
        headers: this.__headers,
      }
    );

    if (!request.ok)
      throw new Error(`Request failed with status ${request.status}.`);

    const response = await request.json();

    return {
      generation_id: response.id,
      generation_status: response.status,
      created_at: response.created_at,
      started_at: response.started_at,
      completed_at: response.completed_at,
      model: response.model,
      output: response.output[0],
      metrics: response.metrics,
    };
  }

  /**
   * Continuously polls the generation status until it succeeds or fails.
   *
   * @param generation_id - The ID of the generation to poll.
   * @param interval_ms - The polling interval in milliseconds.
   * @returns A Promise that resolves when the generation succeeds or rejects if it fails.
   */
  async getUntilSuccess(generation_id: string, interval_ms: number) {
    return new Promise(async (resolve, reject) => {
      const pollGeneration = async () => {
        try {
          const result = await this.getGeneration(generation_id);
          if (result.generation_status === "succeeded") resolve(result);
          else if (result.generation_status === "failed")
            reject(new Error("Generation failed."));
          else setTimeout(pollGeneration, interval_ms);
        } catch (error) {
          reject(error);
        }
      };

      pollGeneration();
    });
  }
}
