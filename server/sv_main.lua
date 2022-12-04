local QBCore = exports['qb-core']:GetCoreObject()

local function GetJobs(citizenid)
    local p = promise.new()
    MySQL.Async.fetchAll("SELECT jobdata FROM multijobs WHERE citizenid = @citizenid",{
        ["@citizenid"] = citizenid
    }, function(jobs)
        if jobs[1] and jobs ~= "[]" then
            jobs = json.decode(jobs[1].jobdata)
        end
        p:resolve(jobs)
    end)
    return Citizen.Await(p)
end
    
local jobdata = {}

RegisterNetEvent("QBCore:Server:OnPlayerLoaded", function()
    local Player = QBCore.Functions.GetPlayer(source)
    jobdata[Player.PlayerData.citizenid] = GetJobs(Player.PlayerData.citizenid)
    print(jobdata[Player.PlayerData.citizenid])
    for k,v in pairs(jobdata) do print(k,v) end
end)

local function AddJob(citizenid, job, grade)
    if jobdata[citizenid] == nil then
        jobdata[citizenid] = {}
    end
    jobdata[citizenid][job] = grade
    MySQL.insert('INSERT INTO multijobs (citizenid, jobdata) VALUES (:citizenid, :jobdata) ON DUPLICATE KEY UPDATE jobdata = :jobdata', {
        citizenid = citizenid,
        jobdata = json.encode(jobdata[citizenid]),
    })
end

local function RemoveJob(citizenid, rjob, rgrade)
    local jobs = GetJobs(citizenid)
    for job, grade in pairs(jobs) do
        if job == rjob and grade == rgrade then
            jobs[job] = nil
            break
        end
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
    local job = {}
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
        jobs = {
            name = job,
            grade = grade,
            description = Config.Descriptions[job],
            label = QBCore.Shared.Jobs[job].label,
            grade_label = QBCore.Shared.Jobs[job].grades[tostring(grade)].name,
            salary = QBCore.Shared.Jobs[job].grades[tostring(grade)].payment,
            active = online,
            duty = Player.PlayerData.job.onduty, -- hopefully sends duty to ui
        }
        if Config.WhitelistJobs[job] then
            whitelistedjobs[#whitelistedjobs+1] = jobs
        else
            civjobs[#civjobs+1] = jobs
        end
        multijobs = {
            whitelist = whitelistedjobs,
            civilian = civjobs,
        }
    end
    cb(multijobs)
end)

RegisterNetEvent("ps-multijob:changeJob",function(job, grade)
    local source = source
    local Player = QBCore.Functions.GetPlayer(source)
    local jobs = GetJobs(Player.PlayerData.citizenid)
    for k, v in pairs(jobs) do
        if job == v.job and grade == v.grade then
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

RegisterNetEvent("qb-bossmenu:server:FireEmployee", function(target)
    local source = source
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player.PlayerData.job.isboss then return end
    local Employee = QBCore.Functions.GetPlayerByCitizenId(target)
    if target ~= Player.PlayerData.citizenid then
        RemoveJob(target, Employee.PlayerData.job.name, Employee.PlayerData.job.grade.level)
    end
end)

RegisterNetEvent('QBCore:Server:OnJobUpdate', function(source, newJob)
    local source = source
    local Player = QBCore.Functions.GetPlayer(source)
    MySQL.Async.fetchAll("SELECT * FROM multijobs WHERE citizenid = @citizenid",{
        ["@citizenid"] = Player.PlayerData.citizenid
    },function(jobs)
        local add = true
        local amount = 0
        local job = newJob
        for _, v in pairs(jobs) do
            if job.name == v.job then
                add = false
            end
            amount = amount + 1
        end
        if add and amount < Config.MaxJobs and Config.IgnoredJobs[job] then
            AddJob(Player.PlayerData.citizenid, job.name, job.grade.level)
        end
    end)
end)