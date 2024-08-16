import { Button } from "@/components/ui/button"
import { BarGraph } from '@/components/BarGraph'
import Papa from 'papaparse'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router"

type Pricing = {
    inference: string;
    ingestPrice: number | null;
    outputPrice: number | null;
}

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
const preprocessCurrency = (value: string) => {
    if (value == "") return null;
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
}

const csvPath = "https://raw.githubusercontent.com/arc53/llm-price-compass/main/LLM-Provider-comparison.csv"

const chartConfig = {
    ingestPrice: {
        label: "Ingest price"
    },
    outputPrice: {
        label: "Output price"
    }
}
const LLMPriceCompass = () => {
    const [billion8, setBillion8] = useState<Pricing[]>([]);
    const [billion70, setBillion70] = useState<Pricing[]>([])
    const initialized = useRef(false)
    const navigate = useNavigate();
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
                            results.data?.map((row: any) => {
                                if (typeCheckRow(row)) {
                                    setBillion8(prev => [...prev, {
                                        inference: row["Inference providers"],
                                        ingestPrice: preprocessCurrency(row["LLama 3.1 8b instruct ingest price"]),
                                        outputPrice: preprocessCurrency(row["LLama 3.1 8b instruct output price"])
                                    }])

                                    setBillion70(prev => [...prev, {
                                        inference: row["Inference providers"],
                                        ingestPrice: preprocessCurrency(row["LLama 3.1 70b instruct ingest price"]),
                                        outputPrice: preprocessCurrency(row["LLama 3.1 70b instruct output price"])
                                    }])

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
        <div className="py-10">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
                LLM Price Compass
            </h1>
            <h2 className="leading-7 mt-2 text-xl text-[#1E1E1E] dark:text-[#FDFDFD]">
                Compare LLM inference on managed providers and GPU’s on Clouds
            </h2>
            <div className="flex justify-start gap-2 py-4">
                <Button onClick={()=>{
                    navigate('/datagrid')
                }}>
                    Explore Datagrid
                </Button>
                <Button variant="ghost" onClick={()=>{
                    window.location.href = 'https://github.com/arc53/llm-price-compass/issues/new?assignees=&labels=type%3A+benchmark&projects=&template=benchmark_submission.yml&title=%F0%9F%93%8A+Benchmark+Results%3A+'
                }}>
                    Submit Benchmark
                </Button>
            </div>
            <BarGraph
                title="Llama 3.1 instruct 8b comparison"
                chartData={billion8}
                chartConfig={chartConfig}
                info={"Showing price in $ per 1m tokens"}
            />
            <BarGraph
                title="Llama 3.1 instruct 70b comparison"
                chartData={billion70}
                chartConfig={chartConfig}
                info={"Showing price in $ per 1m tokens"}
            />
        </div>
    )
}

export default LLMPriceCompass