import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState, useRef, useMemo } from 'react';
import Papa from 'papaparse'
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from '@/ThemeContext';

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
  "LLama 3.1 8b instruct ingest price": number | null;
  "LLama 3.1 8b instruct output price": number | null;
  "LLama 3.1 70b instruct ingest price": number | null;
  "LLama 3.1 70b instruct output price": number | null;
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
  const [csv, setCsv] = useState<string>('');
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();
  const theme = useMemo(
    () => {
      console.log('came here');
      
      return createTheme({
        palette: {
          mode: isDarkTheme ? 'dark' : 'light',
        },
      })
    },
    [isDarkTheme],
  );
  const fetchCSVData = () => {
    fetch(csvPath)
      .then(res => res.text())
      .then(data => {
        setCsv(data)
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: function (results: any) {
            console.log(results);

            Array.isArray(results.data) &&
              results.data?.map((row: any, key: number) => {

                if (typeCheckRow(row)) {
                  let refinedRow: LLMPrice = {
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
  const downloadCSV = () => {
    const csvData = new Blob([csv], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `llm_providers_comparison.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(()=>console.log(isDarkTheme),[isDarkTheme])
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      fetchCSVData();
    }
  }, [])
  return (
    <div className='mt-20'>
      <div className='flex justify-between py-5'>
        <Button onClick={() => navigate('/')}>
          Back to main
        </Button>
        <Button onClick={downloadCSV}>
          Download CSV
        </Button>
      </div>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}
