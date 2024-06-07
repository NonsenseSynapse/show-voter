# show-voter

## High Level Requirements

### Frontend

* "home" page that shows latest data for a show (live poll, past results, or blank page)
* QR code landing page with a poll
* Projector UI page that shows a live readout of results
* admin tool to quickly populate options during a show

### Backend

* API endpoints
  * GET - QR code or ID --> poll options
  * GET - show ID or poll ID --> results + QR code
  * POST - poll ID and vote --> store vote in DB
* General
  * QR code generation
 
## Implementation Ideas

* Backend - Django app ECS that can be spun up/stopped as needed
  * admin panel simplifies ability to populate options during a show
* Frontend - React app ECS
  * voting page should be very lightweight
  * results page possibly using a nice visualization JS library? D3?
 
## DB Design

### SHOW
```
title
```

### DECISION
```
show id
title
qr code
```

### DECISION OPTION
```
decision id
description
```

### VOTE
```
decision id
decision option id
```
