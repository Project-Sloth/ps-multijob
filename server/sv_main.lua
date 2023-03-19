local QBCore = exports['qb-core']:GetCoreObject()

local function GetJobs(citizenid)
    local p = promise.new()
    MySQL.Async.fetchAll("SELECT jobdata FROM multijobs WHERE citizenid = @citizenid",{
        ["@citizenid"] = citizenid
    }, function(jobs)
        if jobs[1] and jobs ~= "[]" then
            jobs = json.decode(jobs[1].jobdata)
        else
            local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
            local temp = {}
            if not Config.IgnoredJobs[Player.PlayerData.job.name] then
                temp[Player.PlayerData.job.name] = Player.PlayerData.job.grade.level
                MySQL.insert('INSERT INTO multijobs (citizenid, jobdata) VALUES (:citizenid, :jobdata) ON DUPLICATE KEY UPDATE jobdata = :jobdata', {
                    citizenid = citizenid,
                    jobdata = json.encode(temp),
                })
            end
            jobs = temp
        end
        p:resolve(jobs)
    end)
    return Citizen.Await(p)
end
    
local function AddJob(citizenid, job, grade)
    local jobs = GetJobs(citizenid)
    for ignored in pairs(Config.IgnoredJobs) do
        if jobs[ignored] then
            jobs[ignored] = nil
        end
    end

    jobs[job] = grade
    MySQL.insert('INSERT INTO multijobs (citizenid, jobdata) VALUES (:citizenid, :jobdata) ON DUPLICATE KEY UPDATE jobdata = :jobdata', {
        citizenid = citizenid,
        jobdata = json.encode(jobs),
    })
end

local function RemoveJob(citizenid, job, rgrade)
    local jobs = GetJobs(citizenid)
    jobs[job] = nil
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    
    -- Since we removed a job, put player in a new job
    local foundNewJob = false
    if Player.PlayerData.job.name == job then
        for k,v in pairs(jobs) do
            Player.Functions.SetJob(k,v)
            foundNewJob = true
            break
        end
    end

    if not foundNewJob then
        Player.Functions.SetJob("unemployed", 0)
    end

    MySQL.insert('INSERT INTO multijobs (citizenid, jobdata) VALUES (:citizenid, :jobdata) ON DUPLICATE KEY UPDATE jobdata = :jobdata', {
        citizenid = citizenid,
        jobdata = json.encode(jobs),
    })
end

QBCore.Commands.Add('removejob', 'Remove Multi Job (Admin Only)', { { name = 'id', help = 'ID of player' }, { name = 'job', help = 'Job Name' }, { name = 'grade', help = 'Job Grade' } }, false, function(source, args)
    local source = source
    if source ~= 0 then
        if args[1] then
            local Player = QBCore.Functions.GetPlayer(tonumber(args[1]))
            if Player then
                if args[2]and args[3] then
                    RemoveJob(Player.PlayerData.citizenid, args[2], args[3])
                else
                    TriggerClientEvent("QBCore:Notify", source, "Wrong usage!")
                end
            else
                TriggerClientEvent("QBCore:Notify", source, "Wrong usage!")
            end
        else
            TriggerClientEvent("QBCore:Notify", source, "Wrong usage!")
        end
    else
        TriggerClientEvent("QBCore:Notify", source, "Wrong usage!")
    end
end, 'admin')

QBCore.Commands.Add('addjob', 'Add Multi Job (Admin Only)', { { name = 'id', help = 'ID of player' }, { name = 'job', help = 'Job Name' }, { name = 'grade', help = 'Job Grade' } }, false, function(source, args)
    local source = source
    if source ~= 0 then
        if args[1] then
            local Player = QBCore.Functions.GetPlayer(tonumber(args[1]))
            if Player then
                if args[2]and args[3] then
                    AddJob(Player.PlayerData.citizenid, args[2], args[3])
                else
                    TriggerClientEvent("QBCore:Notify", source, "Wrong usage!")
                end
            else
                TriggerClientEvent("QBCore:Notify", source, "Wrong usage!")
            end
        else
            TriggerClientEvent("QBCore:Notify", source, "Wrong usage!")
        end
    else
        TriggerClientEvent("QBCore:Notify", source, "Wrong usage!")
    end
end, 'admin')

QBCore.Functions.CreateCallback("ps-multijob:getJobs",function(source, cb)
    local Player = QBCore.Functions.GetPlayer(source)
    local jobs = GetJobs(Player.PlayerData.citizenid)
    local multijobs = {}
    local whitelistedjobs = {}
    local civjobs = {}
    local active = {}
    local getjobs = {}
    local Players = QBCore.Functions.GetPlayers()
    for i = 1, #Players, 1 do
        local xPlayer = QBCore.Functions.GetPlayer(Players[i])
        active[xPlayer.PlayerData.job.name] = 0
        if active[xPlayer.PlayerData.job.name] and xPlayer.PlayerData.job.onduty then
            active[xPlayer.PlayerData.job.name] = active[xPlayer.PlayerData.job.name] + 1
        end
    end
    for job, grade in pairs(jobs) do
        local online = active[job]
        if online == nil then
            online = 0
        end
        getjobs = {
            name = job,
            grade = grade,
            description = Config.Descriptions[job],
            icon = Config.FontAwesomeIcons[job],
            label = QBCore.Shared.Jobs[job].label,
            gradeLabel = QBCore.Shared.Jobs[job].grades[tostring(grade)].name,
            salary = QBCore.Shared.Jobs[job].grades[tostring(grade)].payment,
            active = online,
        }
        if Config.WhitelistJobs[job] then
            whitelistedjobs[#whitelistedjobs+1] = getjobs
        else
            civjobs[#civjobs+1] = getjobs
        end
    end

    multijobs = {
        whitelist = whitelistedjobs,
        civilian = civjobs,
    }
    cb(multijobs)
end)

RegisterNetEvent("ps-multijob:changeJob",function(cjob, cgrade)
    local source = source
    local Player = QBCore.Functions.GetPlayer(source)

    if cjob == "unemployed" and cgrade == 0 then
        Player.Functions.SetJob(cjob, cgrade)
        return
    end

    local jobs = GetJobs(Player.PlayerData.citizenid)
    for job, grade in pairs(jobs) do
        if cjob == job and cgrade == grade then
            Player.Functions.SetJob(job, grade)
        end
    end
end)

RegisterNetEvent("ps-multijob:removeJob",function(job, grade)
    local source = source
    local Player = QBCore.Functions.GetPlayer(source)
    RemoveJob(Player.PlayerData.citizenid, job, grade)
end)

-- QBCORE EVENTS

RegisterNetEvent('ps-multijob:server:removeJob', function(targetCitizenId)
    MySQL.Async.execute('DELETE FROM multijobs WHERE citizenid = ?', { targetCitizenId }, function(affectedRows)
        if affectedRows > 0 then
            print('Removed job: ' .. targetCitizenId)
        else
            print('Cannot remove job: ' .. targetCitizenId)
        end
    end)
end)

RegisterNetEvent('QBCore:Server:OnJobUpdate', function(source, newJob)
    local source = source
    local Player = QBCore.Functions.GetPlayer(source)
    local jobs = GetJobs(Player.PlayerData.citizenid)
    local amount = 0
    local setjob = newJob
    for k,v in pairs(jobs) do
        amount = amount + 1
    end

    local maxJobs = Config.MaxJobs
    if QBCore.Functions.HasPermission(source, "admin") then
        maxJobs = math.huge
    end

    if amount < maxJobs and not Config.IgnoredJobs[setjob.name] then
        local foundOldJob = jobs[setjob.name]
        if not foundOldJob or foundOldJob ~= setjob.grade.level then
            AddJob(Player.PlayerData.citizenid, setjob.name, setjob.grade.level)
        end
    end
end)
