import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const data = [
    {
      "id":1,
      "Inference providers": "Groq",
      "LLama 3.1 8b instruct ingest price": 0.05,
      "LLama 3.1 8b instruct output price": 0.08,
      "LLama 3.1 70b instruct ingest price": 0.59,
      "LLama 3.1 70b instruct output price": 0.79
    },
    {
        "id":2,
      "Inference providers": "Deepinfra",
      "LLama 3.1 8b instruct ingest price": 0.06,
      "LLama 3.1 8b instruct output price": 0.06,
      "LLama 3.1 70b instruct ingest price": 0.52,
      "LLama 3.1 70b instruct output price": 0.75
    },
    {
        "id":3,
      "Inference providers": "OctoAI",
      "LLama 3.1 8b instruct ingest price": 0.15,
      "LLama 3.1 8b instruct output price": 0.15,
      "LLama 3.1 70b instruct ingest price": 0.90,
      "LLama 3.1 70b instruct output price": 0.90
    },
    {
        "id":4,
      "Inference providers": "Lepton AI",
      "LLama 3.1 8b instruct ingest price": 0.70,
      "LLama 3.1 8b instruct output price": 0.70,
      "LLama 3.1 70b instruct ingest price": 0.80,
      "LLama 3.1 70b instruct output price": 0.80
    },
    {
        "id":5,
      "Inference providers": "Fireworks AI",
      "LLama 3.1 8b instruct ingest price": 0.20,
      "LLama 3.1 8b instruct output price": 0.20,
      "LLama 3.1 70b instruct ingest price": 0.90,
      "LLama 3.1 70b instruct output price": 0.90
    },
    {
        "id":6,
      "Inference providers": "Perplexity",
      "LLama 3.1 8b instruct ingest price": 0.20,
      "LLama 3.1 8b instruct output price": 0.20,
      "LLama 3.1 70b instruct ingest price": 1.00,
      "LLama 3.1 70b instruct output price": 1.00
    },
    {
        "id":7,
      "Inference providers": "Together.ai",
      "LLama 3.1 8b instruct ingest price": 0.18,
      "LLama 3.1 8b instruct output price": 0.18,
      "LLama 3.1 70b instruct ingest price": 0.88,
      "LLama 3.1 70b instruct output price": 0.88
    },
    {
        "id":8,
      "Inference providers": "Databricks",
      "LLama 3.1 8b instruct ingest price": null,
      "LLama 3.1 8b instruct output price": null,
      "LLama 3.1 70b instruct ingest price": 1.00,
      "LLama 3.1 70b instruct output price": 1.00
    }
  ]
const currencyFormat =(value:number | null)=> {
    if (value === null || value === undefined) {
      return ''; // Placeholder for missing data
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
const columns: GridColDef<(typeof data)[number]>[] = [
  {
    field: 'Inference providers',
    headerName: 'Inference providers',
    type:'string',
    width:200
  },
  {
    field: 'LLama 3.1 8b instruct ingest price',
    headerName: 'LLama 3.1 8b instruct ingest price',
    type:'string',
    width:300,
    valueFormatter: currencyFormat
  },
  {
    field: 'LLama 3.1 8b instruct output price',
    headerName: 'LLama 3.1 8b instruct output price',
    type: 'string',
    width:250,
    valueFormatter: currencyFormat
  },
  {
    field: 'LLama 3.1 70b instruct ingest price',
    headerName: 'LLama 3.1 70b instruct ingest price',
    type:'string',
    width:250,
    valueFormatter: currencyFormat
  },
  {
    field:'LLama 3.1 70b instruct output price',
    headerName:"LLama 3.1 70b instruct output price",
    type:'string',
    width:250,
    valueFormatter: currencyFormat
  }
];

export default function DataGridDemo() {

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
      />
    </Box>
  );
}
