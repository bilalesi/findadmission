
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
    ├── hermes // Email sending
    ├── stars-es // Worker server for (reputation)
    ├── shared // Shared JavaScript code
    ├── docs // Documentation for the entire Backend

```

