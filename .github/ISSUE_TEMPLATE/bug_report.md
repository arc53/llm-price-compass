name: "📊 Benchmark Results"
description: "Submit your benchmark results to help improve the project"
title: "📊 Benchmark Results: "
labels: ["type: benchmark"]
body:
  - type: markdown
    attributes:
      value: |
        Thank you for taking the time to share your benchmark results! 🙏 Your contribution helps us improve the project and provide valuable insights to the community.

  - type: dropdown
    id: provider
    validations:
      required: true
    attributes:
      label: "☁️ Cloud Provider"
      description: "Select the cloud provider you used for the benchmark."
      options:
        - AWS
        - GCP
        - Scaleway
        - RunPod
        - Other

  - type: input
    id: gpu
    validations:
      required: true
    attributes:
      label: "💪 GPU"
      description: "Enter the GPU model used for the benchmark (e.g., NVIDIA L4, NVIDIA A100, NVIDIA H100)."
      placeholder: "NVIDIA A100"

  - type: input
    id: cost-per-hour
    validations:
      required: true
    attributes:
      label: "💸 Cost per Hour"
      description: "Enter the cost per hour in USD to run the benchmark."
      placeholder: "1.50"

  - type: input
    id: backend
    validations:
      required: true
    attributes:
      label: "🧠 Backend"
      description: "Enter the backend used for the benchmark (e.g., vllm, other LLM engines)."
      placeholder: "vllm"

  - type: input
    id: model-id
    validations:
      required: true
    attributes:
      label: "🆔 Model ID"
      description: "Enter the model ID used for the benchmark (e.g., meta-llama/Meta-Llama-3.1-8B-Instruct)."
      placeholder: "meta-llama/Meta-Llama-3.1-8B-Instruct"

  - type: input
    id: input-throughput
    validations:
      required: true
    attributes:
      label: "⬆️ Input Throughput"
      description: "Enter the input throughput value from the benchmark."
      placeholder: "1000"

  - type: input
    id: output-throughput
    validations:
      required: true
    attributes:
      label: "⬇️ Output Throughput"
      description: "Enter the output throughput value from the benchmark."
      placeholder: "1000"

  - type: checkboxes
    id: terms
    attributes:
      label: "🧑‍⚖️ Code of Conduct"
      description: "By submitting this benchmark result, you agree to follow our [Code of Conduct](https://github.com/arc53/DocsGPT/blob/main/CODE_OF_CONDUCT.md)"
      options:
        - label: "I agree to follow this project's Code of Conduct"
          required: true