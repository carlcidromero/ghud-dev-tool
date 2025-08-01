# ghud-dev-tool

A visualization tool for developers juggling multiple projects that follows a simple flavor of the Four To Floor approach to throughput optimization.

## References:

- https://ghud.org/releases/ghud-dev-tool
- https://ghud.org/blog/four-to-floor
- The Phoenix Project
- The Goal
- D3

## Functional requirements:

- Manage a list of projects to track.
- Select four projects to be “in scope”.
- View visualization of commit volume for projects in scope.

## Non-functional requirements:

- Availability >> Consistency (CAP theorem)

## Core entities:

- Project
- Scope
- Visualization

## API:

- GET /projects => { 2xx, data }
- GET /projects/:id => { 2xx, data }
- POST /projects { commitHistoryUrl, name, metadata } => { 2xx, id }
- PUT /projects/:id { commitHistoryUrl, name, metadata } => { 2xx }
- GET /scope => { 2xx, data }
- PUT /scope { a, b, c, d } => { 2xx, data }
- DELETE /projects/:id => { 2xx }

## High-level design:

- Client → Service → Browser Storage
