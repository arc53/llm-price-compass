import json
import csv

# Load data from JSON file
with open('gpu-benchmarks.json') as json_file:
    data = json.load(json_file)

# Calculate prices using the formula
for item in data:
    provider = item['provider']
    gpu = item['gpu']
    cost_per_hour = item['cost_per_hour']
    model_id = item['model_id']
    input_throughput = item['input_throughput']
    output_throughput = item['output_throughput']
    
    ingest_price = ((cost_per_hour / 3600) / input_throughput) * 1000000
    output_price = ((cost_per_hour / 3600) / output_throughput) * 1000000
    
    # Format prices with 2 decimal places and add "$" in front
    ingest_price_formatted = f"${ingest_price:.2f}"
    output_price_formatted = f"${output_price:.2f}"
    
    # Append data to CSV file
    with open('LLM-Provider-comparison.csv', 'a', newline='') as csv_file:
        writer = csv.writer(csv_file)
        
        # Check if the provider already exists in the CSV file
        with open('LLM-Provider-comparison.csv', 'r') as check_file:
            reader = csv.reader(check_file)
        
        # Update the prices for the specific model
        if 'llama' in model_id.lower() and '8b' in model_id.lower():
            writer.writerow([gpu, ingest_price_formatted, output_price_formatted, '', ''])
        elif 'llama' in model_id.lower() and '70b' in model_id.lower():
            writer.writerow([gpu, '', '', ingest_price_formatted, output_price_formatted])