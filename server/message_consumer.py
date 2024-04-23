import zmq
from database import push_metrics

SERVER_URL = "tcp://13.56.210.223:5555"
DATABASE_DUMP_THRESHOLD = 5000

context = zmq.Context()
socket = context.socket(zmq.SUB)
socket.connect(SERVER_URL)
socket.setsockopt(zmq.SUBSCRIBE, b"")

def consume_messages(lock, metrics, counter):
    while True:
        message = socket.recv()
        params = message.decode().split(";")
        name, lat, lng, heading, measure, vfx = params
        try:
            nameInst = metrics[name]
            nameInst["count"] += 1
            nameInst["min"] = min(float(measure), nameInst["min"])
            nameInst["max"] = max(float(measure), nameInst["max"])
            nameInst["lat"] = float(lat)
            nameInst["lng"] = float(lng)
            nameInst["heading"] = float(heading)
            nameInst["avg"] = round(nameInst["avg"] + ((float(measure) - nameInst["avg"]) / nameInst["count"]), 1)
            metrics[name] = nameInst
            with lock:
                counter.value += 1
                if counter.value >= DATABASE_DUMP_THRESHOLD:
                    push_metrics(metrics)
                    counter.value = 0
        except Exception as e:
            print(e)
            metrics[name] = {
                "count": 1,
                "min": float(measure),
                "max": float(measure),
                "lat": float(lat),
                "lng": float(lng),
                "heading": float(heading),
                "avg": round(float(measure), 1)
            }