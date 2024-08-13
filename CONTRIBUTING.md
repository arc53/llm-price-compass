# Contributing to llm-price-compass

Thank you for your interest in contributing to the llm-price-compass project! We appreciate your help in collecting benchmark data by running LLMs on GPUs with different providers. This data will be used to compare providers and GPUs by cost and other metrics.

## Getting Started
> **Note:**
> 
> The following guide is for the vllm library, but you can use any other tool to generate benchmarks. Additionally, you can use any other model.

To contribute benchmark results, please follow these steps:

1. Generate benchmark data by running LLMs on a GPU-enabled server with Ubuntu Jammy.
2. Submit your benchmark results by creating a new issue using the [Benchmark Submission template](https://github.com/arc53/llm-price-compass/issues/new?assignees=&labels=type%3A+benchmark&projects=&template=benchmark_submission.yml&title=%F0%9F%93%8A+Benchmark+Results%3A+). Fill in all the required fields.

## Generating Benchmarks

We recommend using the [vllm](https://github.com/vllm-project/vllm) library to generate benchmarks. However, if you prefer to use another tool, you can adapt the benchmark script provided in the vllm repository.

To generate benchmarks using vllm, follow these steps:

1. Set up a server with a GPU and Ubuntu Jammy.
2. Connect to the server.
   - Note: If you are using a restricted model from Hugging Face, set the `HF_TOKEN` environment variable with your access token.
3. Install the required dependencies:
   ```bash
   sudo apt update
   sudo apt install python3 python3-pip
   pip3 install vllm
   source ~/.bashrc
   ```
4. Serve the model:
   ```bash
   python3 -m vllm.entrypoints.openai.api_server --model meta-llama/Meta-Llama-3.1-8B-Instruct --max_model_len 8192
   ```
   Replace `meta-llama/Meta-Llama-3.1-8B-Instruct` with the desired model name.
5. Download the benchmark data:
   ```bash
   wget https://huggingface.co/datasets/anon8231489123/ShareGPT_Vicuna_unfiltered/resolve/main/ShareGPT_V3_unfiltered_cleaned_split.json
   ```
6. Run the benchmark:
   ```bash
   python3 vllm/benchmarks/benchmark_serving.py \
       --backend vllm \
       --dataset-name sharegpt \
       --dataset-path ./ShareGPT_V3_unfiltered_cleaned_split.json \
       --model meta-llama/Meta-Llama-3.1-8B-Instruct \
       --num-prompts 1000 \
       --endpoint /v1/completions \
       --tokenizer meta-llama/Meta-Llama-3.1-8B-Instruct \
       --save-result
   ```
   The benchmark results will be displayed in the output.

## Submitting Benchmark Results

After generating the benchmark results, create a new issue using the [Benchmark Submission template](https://github.com/arc53/llm-price-compass/issues/new?assignees=&labels=type%3A+benchmark&projects=&template=benchmark_submission.yml&title=%F0%9F%93%8A+Benchmark+Results%3A+) and fill in all the required fields with the data obtained from the benchmark output.

We appreciate your contribution to the llm-price-compass project!