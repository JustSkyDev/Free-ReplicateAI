export declare enum ImageGenerationModel {
    Stable_Diffusion_3 = "stability-ai/stable-diffusion-3",
    SDXL_Lightning = "bytedance/sdxl-lightning-4step",
    Playground_V2_5 = "playgroundai/playground-v2.5-1024px-aesthetic",
    Flux_Schnell = "black-forest-labs/flux-schnell"
}
export declare enum TextGenerationModel {
    Llama3 = "meta/meta-llama-3-70b-instruct",
    Mixtral = "mistralai/mixtral-8x7b-instruct-v0.1",
    Gemma_2b = "google-deepmind/gemma-2b-it"
}
export declare enum MusicGenerationModel {
    Musicgen = "meta/musicgen",
    Riffusion = "riffusion/riffusion",
    Musicgen_Songstarter = "nateraw/musicgen-songstarter-v0.2"
}
export declare enum SpeechGenerationModel {
    Styletts2 = "adirik/styletts2",
    Xtts_v2 = "lucataco/xtts-v2",
    Bark = "suno-ai/bark"
}
export declare class Replicate {
    private readonly __headers;
    private readonly __main_url;
    private __model;
    constructor(model: ImageGenerationModel | TextGenerationModel | MusicGenerationModel | SpeechGenerationModel);
    run(input: {
        prompt: string;
        speaker?: string;
    }): Promise<{
        generation_id: string;
        generation_status: string;
        created_at: string;
        model: string;
        input: {
            prompt: string;
            speaker?: string;
        };
    }>;
    getGeneration(generation_id: string): Promise<{
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
    }>;
    getUntilSuccess(generation_id: string, interval_ms: number): Promise<unknown>;
}
