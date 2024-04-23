from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sse_starlette.sse import EventSourceResponse
import json
from asyncio import sleep
import resource

SORTING_COL = "max"
SLEEP_SECONDS = 1

resource.setrlimit(resource.RLIMIT_NOFILE, (65536, 65536))

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def start_server(metrics):
    def format_output(metrics_data):
        output_data = [{
            'name': name, 
            **metrics
        } for name, metrics in metrics_data.items()]
        return sorted(output_data, key=lambda x: x[SORTING_COL], reverse=True)

    async def update_metrics():
        print("[update_metrics]")
        while True:
            yield dict(data=json.dumps(format_output(metrics)))
            await sleep(SLEEP_SECONDS)
    
    @app.get("/metrics")
    async def root():
        return EventSourceResponse(update_metrics())

    uvicorn.run(app, host="127.0.0.1", port=8000)