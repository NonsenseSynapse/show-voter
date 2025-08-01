# show-voter

## High Level Requirements

### Frontend

* "home" page that shows latest data for a show (live poll, past results, or blank page)
  * does this automatically update as the state of the show progresses?
  * or do we navigate to different pages as the show progresses?
* QR code landing page with a poll
* Projector UI page that shows a live readout of results
  * live polling or websocket to get latest results
* admin tool to quickly populate options during a show
  * create a show
  * view all of the decisions and their options for a give show
  * add a decision to a show
  * add an option to a decision
  * start/stop voting for a decision


### Backend

* API endpoints
  * GET - QR code or Decision/Poll ID --> poll options (view options to vote on)
  * GET - show ID or Decision/Poll ID --> results + QR code (use to display results)
  * POST - Decision/Poll ID and Option ID --> store vote in DB (let users vote)
  * POST - Create a Decision/Poll for a show
  * POST - Edit an existing Decision/Poll for a show
  * POST - Delete a Decision/Poll for a show
* Auth
  * Block some endpoints if not authenticated
  * Admin login for person running a show
* General
  * QR code generation
  * prevent users from voting multiple times in quick succession (track IP addresses?)
 
## Implementation Ideas

* Backend Options
  *  Django app - admin panel simplifies ability to populate options during a show
  *  FastAPI - more lightweight than Django, but lacks admin panel
* Frontend - React app
  * voting page should be very lightweight AND DESIGNED FOR MOBILE-FIRST
  * results page possibly using a nice visualization JS library? D3?
* Database
  * Postgres
* Infrastructure
  * locally hosted Docker container
  * connect users to local network on router

## DB Design

### Users
```
username
password (encrypted)
```

### SHOW
```
title
current decision (persist how we are progressing in the sequence)
```

### DECISION
```
show id
order (how decisions are sequenced in a show)
description
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
