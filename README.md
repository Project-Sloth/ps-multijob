# ps-multijob
![image](https://user-images.githubusercontent.com/82112471/205506429-6e86cadc-985c-488a-9dce-78a6b5aec1bb.png)

A script designed with a sleek and modern design for being able to display your current jobs as well as switching between them.

# Features
* Configurable ignore certain jobs.
* Configurable keybind to open the job menu - J by default.
* Configurable max jobs per citizen ID. Unlimited jobs for players with the 'admin' permission.
* Configurable white list jobs.
* Configurable descriptions per job.
* Configurable side (left or right) of the screen you want the ui to show on. Right side by default. (see Config)
* Configurable job icon via font awesome icons. Change these icons in the config
* Remove someone's job by doing /removejob - Admin only.
* Coming later: Admin Tab for job handling.

# Preview
![image](https://user-images.githubusercontent.com/82112471/206809426-155ad6fd-50d0-4ff9-add0-d72ae00f2304.png)

# Installation
* Rename to ps-multijob. Do not change the name or it will not work.
* Import [SQL](https://github.com/Project-Sloth/ps-multijob/blob/main/database.sql) into your database
* Ensure to server.cfg

# Linking to qb-management | Auto Firing
1. Find the following part in qb-management/client/cl_boss.lua
```
EmployeeMenu[#EmployeeMenu + 1] = {
    header = Lang:t("body.fireemp"),
    icon = "fa-solid fa-user-large-slash",
    params = {
        isServer = true,
        event = "qb-bossmenu:server:FireEmployee",
        args = data.player.empSource
    }
}
```
and replace with :
```
EmployeeMenu[#EmployeeMenu + 1] = {
    header = Lang:t("body.fireemp"),
    icon = "fa-solid fa-user-large-slash",
    params = {
        isServer = true,
        event = "qb-bossmenu:server:FireEmployee",
        args = {
            cid = data.player.empSource,
            jobname = data.work.name,
            jobgrade = data.work.grade.level
        }
    }
}
```
2. Find the following event in qb-management/server/sv_boss.lua
```
qb-bossmenu:server:FireEmployee
```
and replace with :
```
RegisterNetEvent('qb-bossmenu:server:FireEmployee', function(data)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local Employee = QBCore.Functions.GetPlayerByCitizenId(data.cid)

    if not Player.PlayerData.job.isboss then ExploitBan(src, 'FireEmployee Exploiting') return end

    if Employee then
        if data.cid ~= Player.PlayerData.citizenid then
            if Employee.PlayerData.job.grade.level > Player.PlayerData.job.grade.level then TriggerClientEvent('QBCore:Notify', src, "You cannot fire this citizen!", "error") return end
            if Employee.Functions.SetJob("unemployed", '0') then
                TriggerEvent("qb-log:server:CreateLog", "bossmenu", "Job Fire", "red", Player.PlayerData.charinfo.firstname .. " " .. Player.PlayerData.charinfo.lastname .. ' successfully fired ' .. Employee.PlayerData.charinfo.firstname .. " " .. Employee.PlayerData.charinfo.lastname .. " (" .. Player.PlayerData.job.name .. ")", false)
                TriggerClientEvent('QBCore:Notify', src, "Employee fired!", "success")
                exports['ps-multijob']:RemoveJob(data.cid, data.jobname, data.jobgrade)
                TriggerClientEvent('QBCore:Notify', Employee.PlayerData.source , "You have been fired! Good luck.", "error")
            else
                TriggerClientEvent('QBCore:Notify', src, "Error..", "error")
            end
        else
            TriggerClientEvent('QBCore:Notify', src, "You can\'t fire yourself", "error")
        end
    else
        local player = MySQL.query.await('SELECT * FROM players WHERE citizenid = ? LIMIT 1', { data.cid })
        if player[1] ~= nil then
            Employee = player[1]
            Employee.job = json.decode(Employee.job)
            if Employee.job.grade.level > Player.PlayerData.job.grade.level then TriggerClientEvent('QBCore:Notify', src, "You cannot fire this citizen!", "error") return end
            local job = {}
            job.name = "unemployed"
            job.label = "Unemployed"
            job.payment = QBCore.Shared.Jobs[job.name].grades['0'].payment or 500
            job.onduty = true
            job.isboss = false
            job.grade = {}
            job.grade.name = nil
            job.grade.level = 0
            MySQL.update('UPDATE players SET job = ? WHERE citizenid = ?', { json.encode(job), data.cid })
            TriggerClientEvent('QBCore:Notify', src, "Employee fired!", "success")
            exports['ps-multijob']:RemoveJob(data.cid, data.jobname, data.jobgrade)
            TriggerEvent("qb-log:server:CreateLog", "bossmenu", "Job Fire", "red", Player.PlayerData.charinfo.firstname .. " " .. Player.PlayerData.charinfo.lastname .. ' successfully fired ' .. Employee.PlayerData.charinfo.firstname .. " " .. Employee.PlayerData.charinfo.lastname .. " (" .. Player.PlayerData.job.name .. ")", false)
        else
            TriggerClientEvent('QBCore:Notify', src, "Civilian not in city.", "error")
        end
    end
    TriggerClientEvent('qb-bossmenu:client:OpenMenu', src)
end)
```

# Credits:
* [xFutte](https://github.com/xFutte)
* [Silent](https://github.com/S1lentcodes)
* [Jay](https://github.com/jay-fivem)
* [Snipe](https://github.com/pushkart2)