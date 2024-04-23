import os
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS

token = os.environ.get("INFLUXDB_TOKEN")
org = "ORG_NAME"
url = "http://localhost:8086"
bucket="METRICS"

write_client = InfluxDBClient(url=url, token=token, org=org)
write_api = write_client.write_api(write_options=SYNCHRONOUS)

def convert_data(json_data):
    record_data = []
    for key in json_data.keys():
        metrics_dict = json_data[key]
        record_data.append(
            Point(key)
                .field("avg", metrics_dict["avg"])
                .field("min", metrics_dict["min"])
                .field("max", metrics_dict["max"])
                .field("lat", metrics_dict["lat"])
                .field("lng", metrics_dict["lng"])
                .field("heading", metrics_dict["heading"])
                .field("count", metrics_dict["count"])
            )
    return record_data
    
def push_metrics(json_data):
    print("[db dump]")
    write_api.write(bucket=bucket, org=org, record=convert_data(json_data))
