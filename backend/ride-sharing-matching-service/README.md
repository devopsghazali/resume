# Real-time Ride-Sharing Matching Service

Node.js backend for stateful matching, live availability, and request coordination.

## Project

This scale project focuses on concurrency, transient state, and matching logic under pressure.

## Stack

- Node.js
- WebSocket
- Redis
- PostgreSQL
- Rate limiting

## Questions

1. How do you keep live state consistent?
2. How do you match riders and drivers fairly?
3. How do you handle retries without duplicate matches?
4. How do you separate transient and durable data?
5. How do you protect the service from bursts?
6. How do you design a safe cancellation flow?
7. How do you observe matching latency?
8. How do you split controller and service responsibilities?
9. How do you explain real-time state in interviews?
10. How do you keep the backend resilient under load?
