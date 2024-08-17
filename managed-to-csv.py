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

# Write the data to a CSV file
with open('LLM-Provider-comparison.csv', 'w', newline='') as csvfile:
    fieldnames = ['Inference providers', 'LLama 3.1 8b instruct ingest price', 'LLama 3.1 8b instruct output price',
                  'LLama 3.1 70b instruct ingest price', 'LLama 3.1 70b instruct output price']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    
    writer.writeheader()
    for provider, data in csv_data.items():
        row = {'Inference providers': provider, **data}
        writer.writerow(row)