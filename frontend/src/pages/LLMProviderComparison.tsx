import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState,useRef } from 'react';
import Papa from 'papaparse'
const csvPath = "https://raw.githubusercontent.com/arc53/llm-price-compass/main/LLM-Provider-comparison.csv"
const typeCheckRow = (row: any) => {
  if ("Inference providers" in row
    && "LLama 3.1 8b instruct ingest price" in row
    && "LLama 3.1 8b instruct output price" in row
    && "LLama 3.1 70b instruct ingest price" in row
    && "LLama 3.1 70b instruct output price" in row
  ) {
    return true;
  }
  return false;
}
type LLMPrice = {
  "id": number;
  "Inference providers": string;
  "LLama 3.1 8b instruct ingest price": number|null;
  "LLama 3.1 8b instruct output price": number|null;
  "LLama 3.1 70b instruct ingest price": number|null;
  "LLama 3.1 70b instruct output price": number|null;
}
const currencyFormat = (value: number | null) => {
  if (value === null || value === undefined) {
    return '';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
const preprocessCurrency = (value: string) => {
  if (value == "") return null;
  return parseFloat(value.replace(/[^0-9.-]+/g, ""));
}
const columns: GridColDef<LLMPrice>[] = [
  {
    field: 'Inference providers',
    headerName: 'Inference providers',
    type: 'string',
    width: 200
  },
  {
    field: 'LLama 3.1 8b instruct ingest price',
    headerName: 'LLama 3.1 8b instruct ingest price',
    type: 'string',
    width: 230,
    valueFormatter: currencyFormat
  },
  {
    field: 'LLama 3.1 8b instruct output price',
    headerName: 'LLama 3.1 8b instruct output price',
    type: 'string',
    width: 230,
    valueFormatter: currencyFormat
  },
  {
    field: 'LLama 3.1 70b instruct ingest price',
    headerName: 'LLama 3.1 70b instruct ingest price',
    type: 'string',
    width: 230,
    valueFormatter: currencyFormat
  },
  {
    field: 'LLama 3.1 70b instruct output price',
    headerName: "LLama 3.1 70b instruct output price",
    type: 'string',
    width: 230,
    valueFormatter: currencyFormat
  }
];

export default function LLMProviderComparison() {
  const initialized = useRef(false)
  const [data, setData] = useState<LLMPrice[]>([])
  const fetchCSVData = () => {
    fetch(csvPath)
      .then(res => res.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: function (results: any) {
            console.log(results);

            Array.isArray(results.data) &&
              results.data?.map((row: any, key: number) => {

                if (typeCheckRow(row)) {
                  let refinedRow:LLMPrice = {
                    id: key,
                    "Inference providers": row["Inference providers"],
                    "LLama 3.1 8b instruct ingest price": preprocessCurrency(row["LLama 3.1 8b instruct ingest price"]),
                    "LLama 3.1 8b instruct output price": preprocessCurrency(row["LLama 3.1 8b instruct output price"]),
                    "LLama 3.1 70b instruct ingest price": preprocessCurrency(row["LLama 3.1 70b instruct ingest price"]),
                    "LLama 3.1 70b instruct output price": preprocessCurrency(row["LLama 3.1 70b instruct output price"])
                  }
                  setData(prev => [...prev, refinedRow])
                }
              })
          }
        });

      })
  }
  useEffect(() => {
    if (!initialized.current) {
        initialized.current = true
        fetchCSVData();
    }
}, [])
  return (
    <div className='mt-20'>
      <Box>
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
    </div>
  );
}
