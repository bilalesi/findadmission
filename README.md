

# Find admission project

## What is Find admission?
## Vision
## Status
In Sep 12th, 2O21, a new decision has been made to start rebuilding from scratch the new multi-platform
web application that contains mainly four (04) inter-connected web applications depending on a master core backend.
## Docs
In this documentation, we will define :\

1- The overall architecture of different domains.\
2- The REST API design and req/resp formats.\
3- The building blocks of each application.

### Codebase
#### Technologies

With the ground rules out of the way, let's talk about the coarse architecture of this mono repo:

* **Full-stack JavaScript:**\
    We use Node.js to power our servers, and React & Nextjs to power our frontend apps. Almost all of the code you'll touch in this codebase will be JavaScript.
* **Background Jobs:** \
    We leverage background jobs (powered by bull and Redis) a lot. These jobs are handled by a handful of small worker servers, each with its own purpose.


* Here is a list of all the big technologies we use:

    **Mongodb** : Data storage.\
    **Redis** : Background jobs and caching.\
    **REST** : API, powered by the entire express server.\
    **PassportJS Or JWT** : Authentication.\
    **React& Nextjs** : Frontend React app.

* **Folder structure**
```
    findadmission/
    ├── API // API server
    ├── bigbang // Worker server for notification and general processing
    ├── chronos // Worker server for crons jobs
    ├── email-templates
    ├── hudhud // Email sending
    ├── digger // Worker server for (reputation)
    ├── shared // Shared JavaScript code
    ├── docs // Documentation for the entire Backend

```


### Details implementation
#### API Folder
Depending on the system structure, we distinguish four (04) interconnected main domains, \
each system will be an independent application for seperation of conerns and for system scalability\

the structure of each folder will be the same:

```
    domain-name/
    ├── subdomains/
        ├── subdomain-one
        ├── subdomain-two
    ├── interface // contains api routes
    ├── model  // contains the db schemas
    ├── repositoy // responsible to query/mutate the database
        ├── mutation
        ├── queries
    ├── adapters // responsible to prepare the data to the client and vise-virsa
```

Each folder for the next part are independent systems, with their own application skeleton and backbone

### Bigbang Folder
This is a system responsible for sending notification from each part of the four previous system for this purpose, we use a memory-cache base database (Redis), and with a librery like bull, we can add to queue and then we process them in the perfect time.
### Chronos Folder:
when it comes to background jobs, it's preferable to make it as independent system, so do not overload the core system with something time/processing consuming.
### Hudhud Folder
it's a job-base system, so everything related to email the users, will be processed here,
### Digger Folder
here we can make company future thoughts, by rating every action by the users,
### Shared Folder
this is where all main functionality resides, where we define services methods,