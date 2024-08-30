# @justskydev/replicateai

(**Un-official Package)**

🚀 **A Node.js package that integrates Replicate AI for free.** 🚀

## 📚 Overview

The `@justskydev/replicateai` package provides a TypeScript library for interacting with Replicate AI models. It supports a variety of models for image, text, music, and speech generation. Easily integrate advanced AI capabilities into your Node.js applications!

## 🛠 Features

- **Image Generation**: Generate images using models like Stable Diffusion and Playground V2.5.
- **Text Generation**: Create text with models like Llama3 and Mixtral.
- **Music Generation**: Compose music with models like Musicgen and Riffusion.
- **Speech Generation**: Synthesize speech with models like Styletts2 and Xtts_v2.

## 📋 Note

- **Single Input**: The current implementation supports only a single input field "prompt" due to the free nature of the service. This means you can only provide the prompt for generation and cannot specify additional parameters.

## 🚀 Installation

To install the package, use npm:

```bash
npm install @justskydev/replicateai
```

## 📦 Usage

ES Modules (ESM)

```javascript
import Replicate, {
  ImageGenerationModel,
  TextGenerationModel,
  MusicGenerationModel,
  SpeechGenerationModel,
} from "@justskydev/replicateai";

const replicate = new Replicate(ImageGenerationModel.Stable_Diffusion_3);

const result = await replicate.run({
  prompt:
    "Generate an image of a brave knight in shining armor, standing on a hilltop with a dramatic sunset in the background.",
});
console.log(result);
```

CJS:

```javascript
const {
  Replicate,
  ImageGenerationModel,
  TextGenerationModel,
  MusicGenerationModel,
  SpeechGenerationModel,
} = require("@justskydev/replicateai");

const replicate = new Replicate(ImageGenerationModel.Stable_Diffusion_3);

replicate
  .run({
    prompt:
      "Generate an image of a brave knight in shining armor, standing on a hilltop with a dramatic sunset in the background.",
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

## 💬 Support

For support or questions, please open an [issue]() on GitHub.

## 📝 License

This package is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
