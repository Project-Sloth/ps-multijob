# ps-multijob

![image](https://user-images.githubusercontent.com/82112471/205506429-6e86cadc-985c-488a-9dce-78a6b5aec1bb.png)

A script designed with a sleek and modern design for being able to display your current jobs as well as switching between them.

## Features

* Configurable ignore certain jobs.
* Configurable keybind to open the job menu - J by default.
* Configurable max jobs per citizen ID. Unlimited jobs for players with the 'admin' permission.
* Configurable white list jobs.
* Configurable descriptions per job.
* Configurable side (left or right) of the screen you want the ui to show on. Right side by default. (see Config)
* Configurable job icon via font awesome icons. Change these icons in the config
* Remove someone's job by doing /removejob - Admin only.
* Coming later: Admin Tab for job handling.

## Preview

![image](https://user-images.githubusercontent.com/82112471/206809426-155ad6fd-50d0-4ff9-add0-d72ae00f2304.png)

## Installation

* Rename to ps-multijob. Do not change the name or it will not work.
* Import [SQL](https://github.com/Project-Sloth/ps-multijob/blob/main/database.sql) into your database
* Ensure to server.cfg

### Linking to qb-management | Auto Firing

1. Find the following event

    ```txt
    qb-bossmenu:server:FireEmployee
    ```

2. Insert the TriggerEvent right under the notification for 'Employee Fired!'. The TriggerEvent should be added twice, once near line 174 and once near line 199.

    ```lua
    TriggerClientEvent('QBCore:Notify', src, "Employee fired!", "success")
    TriggerEvent('ps-multijob:server:removeJob', target)
    ```

## Usage

### Serversided Exports

* GetJobs(citizenid)

    Example usage:

    ```lua
    local jobs = exports["ps-multijob"]:GetJobs("citizenid here")
    ```

* AddJob(citizenid, job, grade)

    Example usage:

    ```lua
    exports["ps-multijob"]:AddJob("citizenid here", "police", 0)
    ```

* UpdateJobRank(citizenid, job, grade)
    Example usage:

    ```lua
    exports["ps-multijob"]:UpdateJobRank("citizenid here", "police", 3)
    ```

* RemoveJob(citizenid, job)

    Example usage:

    ```lua
    exports["ps-multijob"]:RemoveJob("citizenid here", "police")
    ```

## Credits

* [xFutte](https://github.com/xFutte)
* [Silent](https://github.com/S1lentcodes)
* [Jay](https://github.com/jay-fivem)
* [Snipe](https://github.com/pushkart2)
