var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { model_n_version } from "./models/ai_model";
export var ImageGenerationModel;
(function (ImageGenerationModel) {
    ImageGenerationModel["Stable_Diffusion_3"] = "stability-ai/stable-diffusion-3";
    ImageGenerationModel["SDXL_Lightning"] = "bytedance/sdxl-lightning-4step";
    ImageGenerationModel["Playground_V2_5"] = "playgroundai/playground-v2.5-1024px-aesthetic";
    ImageGenerationModel["Flux_Schnell"] = "black-forest-labs/flux-schnell";
})(ImageGenerationModel || (ImageGenerationModel = {}));
export var TextGenerationModel;
(function (TextGenerationModel) {
    TextGenerationModel["Llama3"] = "meta/meta-llama-3-70b-instruct";
    TextGenerationModel["Mixtral"] = "mistralai/mixtral-8x7b-instruct-v0.1";
    TextGenerationModel["Gemma_2b"] = "google-deepmind/gemma-2b-it";
})(TextGenerationModel || (TextGenerationModel = {}));
export var MusicGenerationModel;
(function (MusicGenerationModel) {
    MusicGenerationModel["Musicgen"] = "meta/musicgen";
    MusicGenerationModel["Riffusion"] = "riffusion/riffusion";
    MusicGenerationModel["Musicgen_Songstarter"] = "nateraw/musicgen-songstarter-v0.2";
})(MusicGenerationModel || (MusicGenerationModel = {}));
export var SpeechGenerationModel;
(function (SpeechGenerationModel) {
    SpeechGenerationModel["Styletts2"] = "adirik/styletts2";
    SpeechGenerationModel["Xtts_v2"] = "lucataco/xtts-v2";
    SpeechGenerationModel["Bark"] = "suno-ai/bark";
})(SpeechGenerationModel || (SpeechGenerationModel = {}));
var Replicate = (function () {
    function Replicate(model) {
        this.__headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
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
        this.__main_url = "https://homepage.replicate.com/api/prediction";
        if (!(model in model_n_version))
            throw new Error("Model \"".concat(model, "\" doesn't exist."));
        this.__model = model;
    }
    Replicate.prototype.run = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var version, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!input.prompt)
                            throw new Error("\"prompt\" is required in the input.");
                        if (this.__model === SpeechGenerationModel.Xtts_v2 && !input.speaker)
                            throw new Error("\"speaker\" is required for the Xtts_v2 model.");
                        version = model_n_version[this.__model];
                        return [4, fetch(this.__main_url, {
                                method: "POST",
                                headers: this.__headers,
                                body: JSON.stringify({
                                    model: this.__model,
                                    version: version,
                                    input: input,
                                }),
                            })];
                    case 1:
                        request = _a.sent();
                        if (!request.ok)
                            throw new Error("Request failed with status ".concat(request.status, "."));
                        return [4, request.json()];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                generation_id: response.id,
                                generation_status: response.status,
                                created_at: response.created_at,
                                model: response.model,
                                input: input,
                            }];
                }
            });
        });
    };
    Replicate.prototype.getGeneration = function (generation_id) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch("https://homepage.replicate.com/api/poll?id=".concat(generation_id), {
                            headers: this.__headers,
                        })];
                    case 1:
                        request = _a.sent();
                        if (!request.ok)
                            throw new Error("Request failed with status ".concat(request.status, "."));
                        return [4, request.json()];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                generation_id: response.id,
                                generation_status: response.status,
                                created_at: response.created_at,
                                started_at: response.started_at,
                                completed_at: response.completed_at,
                                model: response.model,
                                output: response.output[0],
                                metrics: response.metrics,
                            }];
                }
            });
        });
    };
    Replicate.prototype.getUntilSuccess = function (generation_id, interval_ms) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var pollGeneration;
                        var _this = this;
                        return __generator(this, function (_a) {
                            pollGeneration = function () { return __awaiter(_this, void 0, void 0, function () {
                                var result, error_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4, this.getGeneration(generation_id)];
                                        case 1:
                                            result = _a.sent();
                                            if (result.generation_status === "succeeded")
                                                resolve(result);
                                            else if (result.generation_status === "failed")
                                                reject(new Error("Generation failed."));
                                            else
                                                setTimeout(pollGeneration, interval_ms);
                                            return [3, 3];
                                        case 2:
                                            error_1 = _a.sent();
                                            reject(error_1);
                                            return [3, 3];
                                        case 3: return [2];
                                    }
                                });
                            }); };
                            pollGeneration();
                            return [2];
                        });
                    }); })];
            });
        });
    };
    return Replicate;
}());
export { Replicate };
//# sourceMappingURL=replicate.js.map