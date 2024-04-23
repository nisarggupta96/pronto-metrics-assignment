from multiprocessing import Process, Manager
from message_consumer import consume_messages
from sse_server import start_server

NUM_CONSUMERS = 4

if __name__ == "__main__":
    manager = Manager()
    lock = manager.Lock()
    metrics = manager.dict()
    counter = manager.Value('i', 0)
    consumers = []
    for _ in range(NUM_CONSUMERS):
        consumers.append(Process(target=consume_messages, args=(lock, metrics, counter, )))
    p5 = Process(target=start_server, args=(metrics,))
    
    for p in consumers:
        p.start()
    p5.start()
    
    for p in consumers:
        p.join()
    p5.join()
