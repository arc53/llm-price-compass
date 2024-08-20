import csv
import json

# Load and parse JSON data from managed-providers.json in one step
with open('managed-providers.json', 'r') as file:
    data = json.load(file)

# Create a dictionary to store the data in the desired format
csv_data = {}

for item in data:
    provider = item['provider']
    model = item['model']
    ingest = item['ingest']
    output = item['output']
    
    if provider not in csv_data:
        csv_data[provider] = {'LLama 3.1 8b instruct ingest price': '',
                              'LLama 3.1 8b instruct output price': '',
                              'LLama 3.1 70b instruct ingest price': '',
                              'LLama 3.1 70b instruct output price': ''}
    
    if model == 'LLama 3.1 8b instruct':
        csv_data[provider]['LLama 3.1 8b instruct ingest price'] = ingest
        csv_data[provider]['LLama 3.1 8b instruct output price'] = output
    elif model == 'LLama 3.1 70b instruct':
        csv_data[provider]['LLama 3.1 70b instruct ingest price'] = ingest
        csv_data[provider]['LLama 3.1 70b instruct output price'] = output


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

    if gpu not in csv_data:
        csv_data[gpu] = {'LLama 3.1 8b instruct ingest price': '',
                         'LLama 3.1 8b instruct output price': '',
                         'LLama 3.1 70b instruct ingest price': '',
                         'LLama 3.1 70b instruct output price': ''}

    if '8b' in model_id.lower():
        csv_data[gpu]['LLama 3.1 8b instruct ingest price'] = ingest_price_formatted
        csv_data[gpu]['LLama 3.1 8b instruct output price'] = output_price_formatted
    elif '70b' in model_id.lower():
        csv_data[gpu]['LLama 3.1 70b instruct ingest price'] = ingest_price_formatted
        csv_data[gpu]['LLama 3.1 70b instruct output price'] = output_price_formatted

# Sort csv data by LLama 3.1 8b instruct ingest price (from lowest to highest)
sorted_csv_data = dict(sorted(
    ((key, value) for key, value in csv_data.items() if value['LLama 3.1 8b instruct ingest price']),
    key=lambda x: float(x[1]['LLama 3.1 8b instruct ingest price'].replace('$', ''))
))

# Write the sorted data to the CSV file
with open('LLM-Provider-comparison.csv', 'w', newline='') as csvfile:
    fieldnames = ['Inference providers', 'LLama 3.1 8b instruct ingest price', 'LLama 3.1 8b instruct output price',
                  'LLama 3.1 70b instruct ingest price', 'LLama 3.1 70b instruct output price']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    
    writer.writeheader()
    for provider, data in sorted_csv_data.items():
        row = {'Inference providers': provider, **data}
        writer.writerow(row)